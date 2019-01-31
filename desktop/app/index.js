import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import Home from './components/Home'
// import firebase from "firebase"
// const config = {
//   apiKey: "AIzaSyCOGqbjz-RvVklmM3LlY7WpNuWu1IP6JYs",
//   authDomain: "md-notes-eb533.firebaseapp.com",
//   databaseURL: "https://md-notes-eb533.firebaseio.com",
//   projectId: "md-notes-eb533",
//   storageBucket: "md-notes-eb533.appspot.com",
//   messagingSenderId: "310717051496"
// }
// firebase.initializeApp(config);
const store = configureStore();

render(
  <AppContainer>
    <Home></Home>
    {/* <Root store={store} history={history} /> */}
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
