import React, { useState } from 'react'
import LoginLeftSide from './LoginLeftSide'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react'
import {useAuth} from '../context/authContext';
import {toast} from 'react-hot-toast';

const LoginForm = ({role, title, subtitle}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password, role);
      navigate("/dashboard");
    } catch (e) {
      toast.error(e.response?.data?.error || e.message || "Login failed");
    } finally {
      setLoading(false);
    };
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <LoginLeftSide />
      <div className='flex-1 flex items-center justify-center p-6 sm:p-12 bg-white'>  
        <div className='w-full max-w-md animate-fade-in'>
        <Link to={'/login'} className='inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm mb-10 transition-colors'>
        <ArrowLeftIcon size={16}/> Back to portals
        </Link>

        <div className='mb-8'>
          <h1 className='text-2xl sm:text-3xl font-medium text-zinc-800'>{title}</h1>
          <p className='text-slate-500 text-sm sm:text-base mt-2'>{subtitle}</p>
        </div>
      
      {error && (
        <div className='mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start gap-3'>  
          <div className='w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0'></div>
          {error}
        </div>
      )}

      <form className='space-y-5' onSubmit={handleSubmit}>
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>Email address</label>
          <input type="email" value={email} placeholder='abc@gamil.com' 
          onChange={(e)=>setEmail(e.target.value)}
          required/>
        </div>
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>Password</label>
          <div className='relative'>
            <input type={showPassword ? 'text' : 'password'} 
            placeholder='*********' 
            onChange={(e)=>setPassword(e.target.value)}
            required
            className='pr-11'/>
            <button type="button" className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors' onClick={()=>setShowPassword(!showPassword)}>
              {showPassword ? <EyeOffIcon size={18}/> : <EyeIcon size={18}/>}
            </button>
          </div>
        </div>

        <button type="submit" 
        disabled={loading}
        className='w-full py-3 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-md text-sm font-semibold flex items-center justify-center hover:from-indigo-700 hover:to-indigo-600 disabled:opacity-50 transition-all duration-200 shadow-lg cursor-pointer'>

          {loading && <Loader2Icon className='animate-spin h-4 w-4 mr-2'/>} Sign in
        </button>
      </form>
      
      </div>    
      </div>
      
    </div>
  )
}

export default LoginForm
