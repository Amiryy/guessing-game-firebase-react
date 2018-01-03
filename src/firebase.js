import firebase from 'firebase';
// Initialize Firebase
const config = {
    apiKey: "AIzaSyAm5z972r7vY0EZqEOgKUJ1tVt1MtEkik4",
    authDomain: "guessing-game-amir.firebaseapp.com",
    databaseURL: "https://guessing-game-amir.firebaseio.com",
    projectId: "guessing-game-amir",
    storageBucket: "guessing-game-amir.appspot.com",
    messagingSenderId: "811362282536"
};
firebase.initializeApp(config);

export default firebase;