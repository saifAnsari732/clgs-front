import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { BACK } from './Util';
import { useNavigate, useParams } from 'react-router-dom';

export const Forgatpassword = () => {
  
    // const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
    const [message,setMessage]=useState("")
const navigate=useNavigate()

const { id, token } = useParams();
// console.log(id, token);

const uservalid=async()=>{
  const res=await fetch(`${BACK}/user/forgatpassword/${id}/${token}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    })
   const data=await res.json()
   console.log(data);
   if(data.status==201){
    console.log("valid user");
     setMessage("")
   }else{
  
     toast.error('Invalid password reset link')
     setMessage("")
   }
  }
   useEffect(()=>{
uservalid()
   },[])

const setval=(e)=>{
   setPassword(e.target.value)
}
const handleSubmit= async(e)=>{
  e.preventDefault();
 
  const res=await fetch(`${BACK}/user/${id}/${token}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
      }),
    })
    // console.log(res);
  const data=await res.json()
   if(data){
    setPassword("")
     setMessage(true)
      toast.success('Password Update Succssfully')
     navigate(`/login`)
    }else{
  
     toast.error('Invalid password reset link')
     setMessage("")
   }
}
 return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Enter Your New Password</h2>

                <form  className="space-y-4">
                   {message? <p className='text-green-500 font-semibold text-center'>Password Update Succssfully</p>:""}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Enter New Password
                        </label>
                        <input
                            id="email"
                            type="password"
                            required
                            value={password}
                            onChange={setval}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="12345678"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
                    >
                        Send 
                    </button>
                </form>
            </div>
        </div>
    );
}
