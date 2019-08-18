import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAjBDSw0CSx8Qz7Hrf3bblCi6hrd3DxIEk",
  authDomain: "story-share-app.firebaseapp.com",
  databaseURL: "https://story-share-app.firebaseio.com",
  projectId: "story-share-app",
  storageBucket: "story-share-app.appspot.com",
  messagingSenderId: "61070125541",
  appId: "1:61070125541:web:ceea4b7bb9d8222c"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

}

export default Firebase;
