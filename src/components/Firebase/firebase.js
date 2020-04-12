import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
    this.db = app.firestore();
    this.db.enablePersistence();
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


  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            let dbUser = snapshot.data();

            // default empty roles
            if (!dbUser) {
              dbUser = {};
            }

            if (!dbUser.admin) {
              dbUser.admin = false;
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });


  // *** Users API ***

  user = uid => this.db.doc(`users/${uid}`);
  users = () => this.db.collection('users');


  // *** Groups API ***

  group = uid => this.db.doc(`groups/${uid}`);
  groups = uid => this.db.collection('groups')
    .where('members', 'array-contains', 'PEf6agPSvcSBmJuJWTcx61Hzle13');
  messages = uid => this.group(uid).collection('messages');


  // *** Stories API ***

  story = uid => this.db.doc(`stories/${uid}`);
  stories = () => this.db.collection('stories');
  publicStories = () => this.stories()
    .where('public', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(20);

}

export default Firebase;
