const functions = require('firebase-functions');
const { google } = require('googleapis');
const admin = require('firebase-admin');



admin.initializeApp();



exports.googleLogin = functions.https.onRequest((request, response) => {
  const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
   "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/spreadsheets"
  ];

  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
    login_hint: request.query.email_address || '',
  });
  response.set('Cache-Control', 'private, max-age=0, s-maxage=0');
 response.redirect(authUrl);
});



exports.oAuthCallback = functions.https.onRequest(async (request, response) => {
  const { query: { error, code } = {} } = request;

  // User may deny access to the application.
  if (error) {
    console.log("callback endpoint error  ==== ",error)
    response.status(500).send(error);
    return;
  }

  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  // Exchange the authorization code for an access token.
  const { tokens } = await oAuth2Client.getToken(code);

  oAuth2Client.setCredentials(tokens);
  const oauth2 = google.oauth2({
    auth: oAuth2Client,
    version: 'v2',
  });

  // Get the user's email address and Google user ID
  const userInfo = await oauth2.userinfo.get();

  console.log("returned user info on call back ===== ",userInfo)
  const { id, email } = userInfo.data;
  const { refresh_token } = tokens;

  // Store the refresh token in the Firestore database.
  // Set merge: true to not overwrite any other data in the same document
  const firestore = admin.firestore();
  const usersCollection = firestore.collection('users');
  await usersCollection.doc(id).set({ id, email, refresh_token }, { merge: true });

  response.set('Cache-Control', 'private, max-age=0, s-maxage=0');
  response.send(`User ${email} is authorized! ${id}`);
});



