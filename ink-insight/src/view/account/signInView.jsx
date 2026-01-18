import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdLogin,
} from "react-icons/md";
import { FcGoogle } from "react-icons/fc"; // Import Google Icon

function SignInView(props) {
  const handleSignInCB = (e) => {
    e.preventDefault();
    props.signIn({ email: props.email, password: props.password });
  };

  // Handler for Google Sign In
  const handleGoogleSignInCB = () => {
    if (props.signInWithGoogle) {
      props.signInWithGoogle();
    } else {
      console.warn("signInWithGoogle prop is missing");
    }
  };

  return (
    <div className="min-h-screen flex max-h-screen -mt-16 items-center justify-center bg-canvas px-4 py-12">
      {/* Main Card Container */}
      <div className="w-full max-w-md bg-surface border border-surface-highlight rounded-2xl shadow-2xl overflow-hidden p-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
            Welcome Back
          </h1>
          <p className="text-text-muted text-sm">
            Enter your credentials to access your library.
          </p>
        </div>

        {/* Error Alert Box */}
        {props.error && !props.isLoggedIn && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
            {props.error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignInCB} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-text-secondary ml-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                <MdEmail size={20} />
              </div>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 bg-canvas border border-surface-highlight rounded-xl text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-text-secondary ml-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                <MdLock size={20} />
              </div>
              <input
                type={props.isPasswordVisibleSignIn ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-canvas border border-surface-highlight rounded-xl text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                value={props.password}
                onChange={(e) => props.setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-brand-light transition-colors cursor-pointer"
                onClick={() =>
                  props.setIsPasswordVisibleSignIn(
                    !props.isPasswordVisibleSignIn,
                  )
                }
              >
                {props.isPasswordVisibleSignIn ? (
                  <MdVisibilityOff size={20} />
                ) : (
                  <MdVisibility size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-brand-primary hover:bg-brand-hover text-white font-bold py-3 rounded-xl shadow-lg shadow-brand-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <MdLogin size={20} /> Log In
            </button>
          </div>
        </form>

        {/* --- GOOGLE SIGN IN SECTION --- */}
        <div className="mt-6">
          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-highlight"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface text-text-muted">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignInCB}
            className="mt-6 w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-bold py-3 rounded-xl shadow-md hover:bg-gray-100 transition-all active:scale-95"
          >
            <FcGoogle size={24} />
            <span>Sign in with Google</span>
          </button>
        </div>

        {/* Switch to Sign Up */}
        <div className="mt-8 pt-6 border-t border-surface-highlight text-center">
          <p className="text-text-muted text-sm">
            Don't have an account?{" "}
            <button
              onClick={props.goToSignUp}
              className="text-brand-light font-bold hover:text-brand-hover hover:underline transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Conditional Log Out (Moved to bottom to not clutter main flow) */}
        {props.isLoggedIn && (
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-sm text-red-400 hover:text-red-300 underline transition-colors"
              onClick={() => props.signOut()}
            >
              Log Out of current session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignInView;
