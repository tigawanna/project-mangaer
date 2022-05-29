const config={
    user:'denniskinuthiaw@gmail.com',
    refresh_token: "1//042AC6gU0PPxkCgYIARAAGAQSNwF-L9Iry1SBt7dLvcudPjqOPkh2s-ZbMdfX8CpIyVj1YZea6BitZKhqYbGZnMBL5-3S5m8_k0U",
    client_id:"743011635887-fbfr6iq428duterh255u7vsg4idnfhoi.apps.googleusercontent.com",
    client_secret:"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",
    apiKey: "AIzaSyAfscLOXmlCazzFVH9TbJsk4QWKplg9b20",
  }
module.exports=config




    // const OAuth2 = google.auth.OAuth2;
    // const APP_NAME = "Project manager";
    // const clientID = config.client_id;
    // const clientSecret =config.client_secret;
    // const refreshToken = config.refresh_token
    
    // // Checking attribute.`
    // if (!(typeof data.text === "string") || data.text.length === 0) {
    //   // Throwing an HttpsError so that the client gets the error details.
    //   throw new functions.https.HttpsError(
    //     "invalid-argument",
    //     "The function must be called with one arguments containing the message text to add."
    //   );
    // }
    // Checking that the user is authenticated.












    // if (!context.auth) {
    //   // Throwing an HttpsError so that the client gets the error details.
    //   throw new functions.https.HttpsError(
    //     "failed-precondition",
    //     "The function must be called while authenticated."
    //   );
    // }
    // const oauth2Client = new OAuth2(
    //   clientID, //client Id
    //   clientSecret, // Client Secret
    //   "https://developers.google.com/oauthplayground" // Redirect URL
    // );
  
    // oauth2Client.setCredentials({
    //   refresh_token: refreshToken
    // });
    // const tokens = oauth2Client.refreshAccessToken();
    // const accessToken = tokens.credentials.access_token;
  
    // const smtpTransport = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     type: "OAuth2",
    //     user: "denniskinuthiaw@gmail.com",
    //     clientId: clientID,
    //     clientSecret: clientSecret,
    //     refreshToken: refreshToken,
    //     accessToken: accessToken
    //   }
    // });
    // const mailOptions = {
    //   from: `${APP_NAME} <denniskinuthiaw@gmail.com>`,
    //   to: 'kinuthiawdennis@gmail.com', //sending to email IDs in app request, please check README.md
    //   subject: `Hello from ${APP_NAME}!`,
    //   text: `Hi,\n Test email from ${APP_NAME}.`
    // };
  
    // smtpTransport.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log("errpr send ing mail   ==== ",error.message);
    //     smtpTransport.close();
    //   }
    //   return "<<<<<<<<< mail successfully sent >>>>>>>>>>>";
    // });

