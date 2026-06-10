import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useContext } from "react";
import { MangaCon } from "../Context/MangaContex.jsx"
import axios from "axios"
import { toast } from "react-toastify"
import GoogleLoginComponent from '../Component/googleLogin.jsx'

const Login = () => {

  const [isSign, setIsSign] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const { token, setToken, backendUrl, navigate } = useContext(MangaCon)

  useEffect(() => {
    console.log("the email is :", isSign);
  }, [isSign]);

  const handleEvent = async (e) => {
    e.preventDefault();

    try {

      if (!isSign) {

        const response = await axios.post(
          backendUrl + '/api/user/register',
          { name, email, password }
        )

        if (response.data.success) {

          setToken(response?.data?.token)
          localStorage.setItem('token', response?.data?.token)

          toast.success("Register successfully")

          setName('')
          setEmail('')
          setPassword('')

        }
        else {
          toast.error(response.data.message)
        }

      }
      else {

        const response = await axios.post(
          backendUrl + '/api/user/login',
          { email, password }
        )

        if (response.data.success) {

          setToken(response.data.token)
          localStorage.setItem('token', response?.data?.token)

        }
        else {
          toast.error(response.data.message)
        }

      }

    }
    catch (error) {

      console.log(error)
      toast.error(error.response?.data?.message || error.message)

    }

  };

  useEffect(() => {

    if (token) {
      navigate('/')
    }

  }, [token])

  return (

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 overflow-hidden relative">

      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-40"></div>

      <form
        onSubmit={handleEvent}
        className="relative w-full max-w-md bg-white border border-gray-200 p-8 md:p-10 rounded-3xl shadow-2xl"
      >

        <div className="mb-8 text-center">

          <h2 className="text-3xl font-extrabold text-gray-800 tracking-wide">
            {isSign ? "Welcome Back 👋" : "Create Account 🚀"}
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            {isSign
              ? "Login to continue your manga journey"
              : "Join and explore unlimited manga"}
          </p>

        </div>

        <div className="flex flex-col gap-5">

          {!isSign && (

            <input
              className="bg-gray-50 border border-gray-300 text-gray-800 placeholder:text-gray-400 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
              required
            />

          )}

          <input
            className="bg-gray-50 border border-gray-300 text-gray-800 placeholder:text-gray-400 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            required
          />

          <div className="relative w-full">

            <input
              className="bg-gray-50 border border-gray-300 text-gray-800 placeholder:text-gray-400 rounded-2xl py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 w-full"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              required
            />

            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>

          </div>

        </div>

        <div className="mt-8">

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition-all duration-300"
          >
            {isSign ? "Sign In" : "Sign Up"}
          </button>

        </div>

        <div className="flex items-center my-7">

          <div className="flex-grow border-t border-gray-300"></div>

          <span className="px-4 text-gray-500 text-sm font-medium">
            OR CONTINUE WITH
          </span>

          <div className="flex-grow border-t border-gray-300"></div>

        </div>

        <div className="flex justify-center">

          <div className="w-full">
            <GoogleLoginComponent />
          </div>

        </div>

        <div className="flex justify-between items-center mt-8 text-sm">

          <button
            type="button"
            onClick={() => setIsSign(!isSign)}
            className="text-blue-500 hover:text-blue-700 hover:underline transition-all duration-200"
          >
            {isSign ? "Create Account?" : "Already have an account?"}
          </button>

          <p className="text-gray-500 hover:text-gray-700 cursor-pointer transition-all duration-200">
            Forgot password?
          </p>

        </div>

      </form>

    </div>

  );
};

export default Login;