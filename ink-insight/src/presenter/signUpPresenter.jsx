import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyCredentialsCriteria } from "../utilities/regex";
import { signUpAsync, getIsLoggedIn } from "../store/userAccountSlice";

import SignUpView from "../view/account/signUpView";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.currentUserAccount.error);
  const isLoggedIn = useSelector(getIsLoggedIn);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisibleSignUp, setIsPasswordVisibleSignUp] = useState(false);
  const [isPasswordVisibleSignUpConfirm, setIsPasswordVisibleSignUpConfirm] =
    useState(false);

  const handleGoToSearch = () => {
    navigate("/");
  };

  const handleGoToSignIn = () => {
    navigate("/signIn");
  };

  const clearFields = () => {
    setPassword("");
    setEmail("");
    setConfirmPassword("");
    setUsername("");
  };

  const handleSignUpACB = (credentials) => {
    if (isLoggedIn === false) {
      dispatch(signUpAsync(credentials))
        .unwrap()
        .then(() => navigate("/"))
        .catch((error) => {
          if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            alert("Email already in use! Try another one!");
          }
          // console.log(error)
        });
    } else {
      alert("You are already signed in!");
    }
  };

  const handleCredentialsCriteria = () => {
    return verifyCredentialsCriteria({
      username: username,
      email: email,
      password: password,
    });
  };

  return (
    <div>
      <SignUpView
        error={error}
        email={email}
        password={password}
        username={username}
        isLoggedIn={isLoggedIn}
        confirmPassword={confirmPassword}
        isPasswordVisibleSignUp={isPasswordVisibleSignUp}
        isPasswordVisibleSignUpConfirm={isPasswordVisibleSignUpConfirm}
        setEmail={setEmail}
        setUsername={setUsername}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        clear={clearFields}
        setIsPasswordVisibleSignUp={setIsPasswordVisibleSignUp}
        setIsPasswordVisibleSignUpConfirm={setIsPasswordVisibleSignUpConfirm}
        verifyCredentialsCriteria={handleCredentialsCriteria}
        goToSignIn={handleGoToSignIn}
        goToSearch={handleGoToSearch}
        signUp={handleSignUpACB}
      />
    </div>
  );
}

export { SignUp };
