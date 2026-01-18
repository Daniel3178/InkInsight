import {
  MdEmail,
  MdLock,
  MdPerson,
  MdVisibility,
  MdVisibilityOff,
  MdOutlinePersonAdd,
} from "react-icons/md";

function SignUpView(props) {
  const handleSignUpACB = (e) => {
    e.preventDefault();

    if (props.isLoggedIn === true) {
      alert("You are already signed in!");
      return;
    }
    if (props.email.trim() === "" || props.username.trim() === "") {
      alert("Please enter both an email and username.");
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
    <div className="min-h-screen max-h-screen -mt-16 flex items-center justify-center bg-canvas px-4 py-12">
      {/* Main Card */}
      <div className="w-full max-w-md bg-surface border border-surface-highlight rounded-2xl shadow-2xl overflow-hidden p-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
            Create Account
          </h1>
          <p className="text-text-muted text-sm">
            Join our community of storytellers.
          </p>
        </div>

        {/* Error Alert */}
        {props.error && !props.isLoggedIn && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
            {props.error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignUpACB} className="space-y-5">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                <MdEmail size={18} />
              </div>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 bg-canvas border border-surface-highlight rounded-xl text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Username */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                <MdPerson size={18} />
              </div>
              <input
                type="text"
                placeholder="Choose a username"
                className="w-full pl-10 pr-4 py-3 bg-canvas border border-surface-highlight rounded-xl text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                value={props.username}
                onChange={(e) => props.setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                <MdLock size={18} />
              </div>
              <input
                type={props.isPasswordVisibleSignUp ? "text" : "password"}
                placeholder="Create password"
                className="w-full pl-10 pr-10 py-3 bg-canvas border border-surface-highlight rounded-xl text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                value={props.password}
                onChange={(e) => props.setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-brand-light transition-colors"
                onClick={() =>
                  props.setIsPasswordVisibleSignUp(
                    !props.isPasswordVisibleSignUp,
                  )
                }
              >
                {props.isPasswordVisibleSignUp ? (
                  <MdVisibilityOff size={18} />
                ) : (
                  <MdVisibility size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                <MdLock size={18} />
              </div>
              <input
                type={
                  props.isPasswordVisibleSignUpConfirm ? "text" : "password"
                }
                placeholder="Repeat password"
                className="w-full pl-10 pr-10 py-3 bg-canvas border border-surface-highlight rounded-xl text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                value={props.confirmPassword}
                onChange={(e) => props.setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-brand-light transition-colors"
                onClick={() =>
                  props.setIsPasswordVisibleSignUpConfirm(
                    !props.isPasswordVisibleSignUpConfirm,
                  )
                }
              >
                {props.isPasswordVisibleSignUpConfirm ? (
                  <MdVisibilityOff size={18} />
                ) : (
                  <MdVisibility size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-brand-primary hover:bg-brand-hover text-white font-bold py-3 rounded-xl shadow-lg shadow-brand-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <MdOutlinePersonAdd size={22} /> Sign Up
            </button>
          </div>
        </form>

        {/* Switch to Log In */}
        <div className="mt-6 pt-6 border-t border-surface-highlight text-center">
          <p className="text-text-muted text-sm">
            Already have an account?{" "}
            <button
              onClick={props.goToSignIn}
              className="text-brand-light font-bold hover:text-brand-hover hover:underline transition-colors"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpView;
