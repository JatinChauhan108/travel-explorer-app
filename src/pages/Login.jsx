import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, googleProvider } from "../firebase/firebase";
import {
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setUser, clearUser } from "../store/authSlice";
import { Mail, Lock } from "lucide-react";

const Login = () => {
   
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);

    useEffect(() => {
        setEmail("");
        setPassword("");
    }, []);

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      dispatch(setUser(result.user));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Email/Password login or signup
  const handleEmailAuth = async () => {
    try {
      let result;
      if (isSignUp) {
        result = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        result = await signInWithEmailAndPassword(auth, email, password);
      }
      dispatch(setUser(result.user));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-10 w-full max-w-md text-center text-white">
        <h1 className="text-3xl font-extrabold mb-2">Travel Explorer 🌍</h1>
        <p className="text-gray-300 mb-6">
          {isSignUp ? "Create your account" : "Sign in to continue your journey"}
        </p>

        {user ? (
          <>
            <p className="mb-4">Logged in as: {user.email || user.displayName}</p>
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Email Input */}
            <div className="mb-3 relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-blue-400 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="mb-6 relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-blue-400 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Email Auth Button */}
            <button
              onClick={handleEmailAuth}
              className="w-full py-3 rounded-lg font-semibold bg-blue-500 hover:bg-blue-600 transition mb-4"
            >
              {isSignUp ? "Sign Up with Email" : "Login with Email"}
            </button>

            {/* Toggle Login/Signup */}
            <p
              onClick={() => setIsSignUp((prev) => !prev)}
              className="mb-4 text-sm text-gray-300 hover:text-blue-400 cursor-pointer"
            >
              {isSignUp
                ? "Already have an account? Login"
                : "New here? Create an account"}
            </p>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-600" />
              <span className="px-2 text-gray-400 text-sm">OR</span>
              <hr className="flex-1 border-gray-600" />
            </div>

            {/* Google Auth Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 flex items-center justify-center gap-2 rounded-lg font-semibold bg-white text-gray-800 hover:bg-gray-200 transition"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google
            </button>

            {/* Error Message */}
            {error && (
              <p className="text-red-400 mt-3 text-sm font-medium">{error}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

