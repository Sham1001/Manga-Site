import React, { useEffect, useState } from "react";
import SignInButton from "../Component/GoogleLogin.jsx";

const Login = () => {
  const [isSign, setIsSign] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("the email is :", email);
  }, [email]);

  const handleEvent = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-purple-200 px-4">
      <form
        onSubmit={handleEvent}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isSign ? "Welcome Back 👋" : "Create Your Account 🚀"}
        </h2>

        <div className="flex flex-col gap-4">
          {!isSign && (
            <input
              className="border border-gray-300 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
              required
            />
          )}
          <input
            className="border border-gray-300 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            required
          />
          <input
            className="border border-gray-300 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-md transition duration-200"
          >
            {isSign ? "Sign In" : "Sign Up"}
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign-In Button */}
        <div className="flex justify-center">
          <SignInButton />
        </div>

        <div className="flex justify-between items-center mt-6 text-sm">
          <button
            type="button"
            onClick={() => setIsSign(!isSign)}
            className="text-blue-600 hover:underline transition"
          >
            {isSign ? "Create Account?" : "Already have an account?"}
          </button>
          <p className="text-gray-400 hover:text-gray-600 cursor-pointer transition">
            Forgot password?
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
