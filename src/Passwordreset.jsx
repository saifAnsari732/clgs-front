
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BACK } from './Util';
import axios from 'axios';
export const Passwordreset = () => {

    const [email, setEmail] = useState('');
const [message, setMessage] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
        setEmail('');   
        setMessage(true);
    try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post(
            `${BACK}/user/sendpasswordlink`, 
            { email },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        setMessage(false);
        // Successful response (200-299 range)
        toast.success("Password reset link sent successfully");
        setMessage("Password reset link sent successfully");
        
    } catch (error) {
        // Handle axios errors
        const errorMsg = error.response?.data?.msg 
            || error.message 
            || "Failed to send reset link";
            
        toast.error(errorMsg);
        setMessage(errorMsg);
    }




    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reset Your Password</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {message ? <p className='text-green-500 font-semibold text-center'>Password reset link sent successfully</p> : ""}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="you@example.com"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );

}

