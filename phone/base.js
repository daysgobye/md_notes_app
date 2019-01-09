import Rebase from "re-base"
import firebase from 'firebase'
console.log(firebase);


const config = {
    apiKey: "AIzaSyCOGqbjz-RvVklmM3LlY7WpNuWu1IP6JYs",
    authDomain: "md-notes-eb533.firebaseapp.com",
    databaseURL: "https://md-notes-eb533.firebaseio.com",
    projectId: "md-notes-eb533",
    storageBucket: "md-notes-eb533.appspot.com",
    messagingSenderId: "310717051496"
}

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database())
console.log("app", app);

export default base
    // projectId: "md-notes-eb533",
    // storageBucket: "md-notes-eb533.appspot.com",
    // messagingSenderId: "310717051496"