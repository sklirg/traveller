import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui'
// Side effect fun
import 'firebaseui/dist/firebaseui.css';

import { fetchBeen } from "./been";

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      document.getElementById('auth--firebase').hidden = true

      console.log("auth result", authResult)

      window.firebaseToken = authResult.credential.accessToken;

      const user = authResult.user;
      window.displayName = user.displayName;
      window.uid = user.uid;

      document.getElementById('auth').innerHTML = user.displayName;

      // Do map been fetch
      fetchBeen();

      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle. (true redirects, false does not)
      return false;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  // signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
    //   firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  // tosUrl: '<your-tos-url>',
  // Privacy policy url.
  // privacyPolicyUrl: '<your-privacy-policy-url>'
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#auth--firebase', uiConfig);
