import React, { useState } from 'react'
import axios from "axios"
import {toast} from 'react-toastify'

const Login = ({setToken}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const backend = import.meta.env.VITE_BACKEND_URL

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        try{
            const response = await axios.post(backend + '/api/user/admin/login',{email,password})
        if(response.data.success){
            const token = response.data.token
            setToken(token)
            // toast.success("Sahi hai")
        }
        else{
            toast.error(response.data.message)
        }
        }
        catch(error){
            toast.error(error.response?.data?.message || error.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 w-96">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Admin Login</h2>

                <div className="flex flex-col gap-4">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />

                    <div className="relative">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
                        />
                        <button
                            type="button"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login
