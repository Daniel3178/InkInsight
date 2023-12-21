import { Link } from "react-router-dom";
import "./signUpStyle.css";
function SignUpView(props) {

  const handleSignUpACB = (e) => {
    e.preventDefault();

    if (props.isLoggedIn === true) {
      alert('You are already signed in!');
      return;
    }
    if (props.email.trim() === "" || props.username.trim() === "") {
      alert('Please enter both an email and username.');
      return;
    }
    if (props.password !== props.confirmPassword) {
      props.setPassword("");
      props.setConfirmPassword("");
      alert("Passwords do not match!");
      return;
    }
    const result = props.verifyCredentialsCriteria();
    if (
      props.password === props.confirmPassword &&
      props.username !== "" &&
      props.password.length >= 6 &&
      result
    ) {
      props.signUp({
        email: props.email,
        password: props.password,
        username: props.username,
      });
      props.clear();
    }

  };
  return (
    <div>
      {props.error && !props.isLoggedIn && (
        <div
          style={{
            color: "red",
            position: "fixed",
            top: "18%",
            left: "50%",
            fontSize: "20px",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          {props.error}
        </div>
      )}

      <div className="sign-up-container">
        <form onSubmit={handleSignUpACB}>
          <h1>Create Account</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={props.email}
            onChange={(e) => {
              props.setEmail(e.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Enter your name"
            value={props.username}
            onChange={(e) => {
              e.preventDefault();
              props.setUsername(e.target.value);
            }}
          ></input>
          <div className="password-input-container">
            <input
              type={props.isPasswordVisibleSignUp ? "text" : "password"}
              placeholder="Enter your password"
              value={props.password}
              onChange={(e) => {
                props.setPassword(e.target.value);
              }}
            ></input>
            <span
              className="eye-icon"
              onClick={() =>
                props.setIsPasswordVisibleSignUp(!props.isPasswordVisibleSignUp)
              }
            >
              {!props.isPasswordVisibleSignUp ? "👁️" : "🔒"}
            </span>
          </div>

          <div className="password-input-container">
            <input
              type={props.isPasswordVisibleSignUpConfirm ? "text" : "password"}
              placeholder="Confirm your password"
              value={props.confirmPassword}
              onChange={(e) => {
                props.setConfirmPassword(e.target.value);
              }}
            ></input>
            <span
              className="eye-icon"
              onClick={() =>
                props.setIsPasswordVisibleSignUpConfirm(
                  !props.isPasswordVisibleSignUpConfirm
                )
              }
            >
              {!props.isPasswordVisibleSignUpConfirm ? "👁️" : "🔒"}
            </span>
          </div>

          <button type="submit">Sign Up</button>
        </form>
        <div className="search-button-container">
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "5vh",
          }}
        >
          <button onClick={props.goToSignIn}>Switch to Log In</button>
        </div>
      </div>
    </div>
  );
}

export default SignUpView;
