const firebaseConfig = {
  apiKey: "AIzaSyCMIjNCoh9hSEHXxH0l4faaOkOg7R7i-bI",
  authDomain: "instaproje.firebaseapp.com",
  projectId: "instaproje",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signup() {
  auth.createUserWithEmailAndPassword(
    email.value,
    password.value
  ).then(() => location.href = "app.html")
}

function login() {
  auth.signInWithEmailAndPassword(
    email.value,
    password.value
  ).then(() => location.href = "app.html")
}
