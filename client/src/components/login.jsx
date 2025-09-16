import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/Appcontext";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setshowlogin } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Prevent scrolling when login modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handles both login and signup
  const handleEmailAuth = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      // Try signing in first
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in:", userCredential.user);
      alert("Login successful!");
      setshowlogin(false);
      navigate("/result", { replace: true });
    } catch (error) {
      console.error("Auth error:", error.code, error.message);

      // If user doesn't exist, create account
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-credential"
      ) {
        try {
          const newUser = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log("New user created:", newUser.user);
          alert("Welcome! Your account has been created.");
          setshowlogin(false);
          navigate("/result", { replace: true });
        } catch (createError) {
          console.error("Error creating user:", createError.message);
          alert("Account creation failed: " + createError.message);
        }
      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password. Please try again.");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters.");
      } else {
        alert("An error occurred: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign-in:", result.user);
      alert("Signed in with Google!");
      setshowlogin(false);
      navigate("/result", { replace: true });
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        console.error("Google sign-in error:", error.message);
        alert("Google sign-in failed: " + error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center overflow-hidden"> {/* Added fixed and overflow-hidden */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEmailAuth();
        }}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-md shadow-xl mx-4" // Added mx-4 for mobile padding
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Login or Sign Up
        </h1>
        <p className="text-sm text-center">Enter your details to continue</p>

        {/* Email Input */}
        <div className="border px-4 py-2 flex items-center gap-3 rounded-full mt-4">
          <img
            src={assets.emailIcon}
            className="w-8 h-8 object-contain"
            alt="Email"
          />
          <input
            type="email"
            placeholder="Email ID"
            className="outline-none text-sm h-8 w-full bg-transparent"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="border px-4 py-2 flex items-center gap-3 rounded-full mt-4">
          <img
            src={assets.lockIcon}
            className="w-8 h-8 object-contain"
            alt="Password"
          />
          <input
            type="password"
            placeholder="Password"
            className="outline-none text-sm h-8 w-full bg-transparent"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="bg-orange-400 w-full text-white py-2 rounded-full mt-4 hover:bg-amber-400 transition-colors"
        >
          Continue with Google
        </button>

        {/* Email/Password Login/Signup */}
        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-full mt-3 hover:bg-blue-500 transition-colors"
          disabled={loading}
        >
          {loading ? "Continuing..." : "Continue with Email"}
        </button>

        {/* Close button */}
        <img
          onClick={() => setshowlogin(false)}
          src={assets.crossIcon}
          alt="Close"
          className="absolute top-5 right-5 cursor-pointer w-6 h-6"
        />
      </form>
    </div>
  );
};

export default Login;