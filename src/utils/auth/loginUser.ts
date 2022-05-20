import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth} from "../../firebase/firebaseConfig";

const provider = new GoogleAuthProvider();
provider.addScope('https://mail.google.com/');
export const loginUser= () => {
signInWithRedirect(auth, provider)
.then((result:any) => {
console.log("sign in successful result  === ",result)
// The signed-in user info.
    const user = result.user;
  }).catch((error) => {
// Handle Errors here.
console.log("sign in error  === ",error)

 });



}

