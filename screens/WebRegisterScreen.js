import * as WebBrowser from 'expo-web-browser';
import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import config from '../config'
import RegisterScreen from './RegisterScreen';
import { AuthContext } from "../navigation/authTest";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await config
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
         history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/Notification" />;
  }

  return (
    // <div>
    //   <h1>Sign up</h1>
    //   <form onSubmit={handleSignUp}>
    //     <label>
    //       Email
    //       <input name="email" type="email" placeholder="Email" />
    //     </label>
    //     <label>
    //       Password
    //       <input name="password" type="password" placeholder="Password" />
    //     </label>
    //     <button type="submit">Sign Up</button>
    //   </form>
    // </div>
    <RegisterScreen/>
  );
};

export default withRouter(SignUp);