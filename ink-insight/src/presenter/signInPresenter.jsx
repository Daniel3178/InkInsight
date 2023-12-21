import React, { useState } from "react";
import { auth } from "../config/firebaseConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsLoggedIn } from "../store/userAccountSlice";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import SignInView from "../view/account/signInView";

function SignIn() {


  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisibleSignIn, setIsPasswordVisibleSignIn] = useState(false);

  const isLoggedIn = useSelector(getIsLoggedIn);
  const error = useSelector((state) => state.currentUserAccount.error);
  
  const clearBuffer = () => {
    setPassword("");
    setEmail("");
  };

  const handleSignInACB = async (credentials) => {
    if (isLoggedIn === false) {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
        alert(
          `You logged in as : ${user.user.displayName}\nWith email : ${user.user.email}`
        );
        clearBuffer();
        navigate("/");
      } catch (error) {
        // console.log(error);
        alert("Incorrect username or password");
      }
    } else {
      alert("You are already signed in!");
    }
  };

  const handleSignOutACB = () => {
    if(isLoggedIn ===true){

      signOut(auth)
      .then(() => {
        alert(`You've successfully signed out!`);
        navigate("/");
      })
      .catch((err) => {
        // console.log(err);
      });
    }
    else{
      alert("You are already signed out!");
    }
  };

  const handleGoToSearch = () => {
    navigate("/");
  };

  const handleGoToSignUp = () => {
    navigate("/signUp");
  };

  return (
    <div>
      <SignInView
        error={error}
        email={email}
        password={password}
        isLoggedIn={isLoggedIn}
        isPasswordVisibleSignIn={isPasswordVisibleSignIn}
        setIsPasswordVisibleSignIn={setIsPasswordVisibleSignIn}
        setEmail={setEmail}
        setPassword={setPassword}
        goToSignUp={handleGoToSignUp}
        goToSearch={handleGoToSearch}
        signIn={handleSignInACB}
        signOut={handleSignOutACB}
      />
    </div>
  );
}

export { SignIn };
