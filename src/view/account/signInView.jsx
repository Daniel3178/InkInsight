import "./signInStyle.css";

function SignInView(props) {
  const handleSignInCB = (e) => {
    e.preventDefault();
    props.signIn({ email: props.email, password: props.password });
  };

  return (
    <div className="page-container">
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
      <div className="sign-in-container">
        <form onSubmit={handleSignInCB}>
          <h1>Log in</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={props.email}
            onChange={(e) => {
              props.setEmail(e.target.value);
            }}
          ></input>
          <div style={{ position: "relative" }}>
            <input
              type={props.isPasswordVisibleSignIn ? "text" : "password"}
              placeholder="Enter your password"
              value={props.password}
              onChange={(e) => {
                props.setPassword(e.target.value);
              }}
            ></input>
            <span
              className="eye-icon"
              onClick={() =>
                props.setIsPasswordVisibleSignIn(!props.isPasswordVisibleSignIn)
              }
            >
              {!props.isPasswordVisibleSignIn ? "👁️" : "🔒"}
            </span>
          </div>
          <button type="submit">Log In</button>
          <button
            className="log-out"
            type="button"
            onClick={() => props.signOut()}
          >
            Log Out
          </button>
        </form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "50vh",
          }}
        >
          <button onClick={props.goToSignUp}>Switch to Sign Up</button>
        </div>
      </div>
      <div className="search-button-container">
      </div>
    </div>
  );
}

export default SignInView;
