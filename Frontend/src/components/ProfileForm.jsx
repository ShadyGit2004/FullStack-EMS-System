import { Loader2, Save, User } from 'lucide-react';
import React, { useState } from 'react'

import api from '../api/axios.js'
import {toast} from 'react-hot-toast';

const ProfileForm = ({initalData, onSuccess}) => {

    const [loading, setLoading] = useState(false);
    const [error, SetError] = useState("");
    const [message, SetMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        SetError("");
        SetMessage("");
        const formData = new FormData(e.currentTarget);
        try {
            await api.post("/profile", formData);
            SetMessage("Profile updated successfully");
            onSuccess?.(); 
        } catch (e) {
            toast.error(e?.response?.data?.error || e.message)
        } finally {
            setLoading(false);
        }   
    };

  return (
    <form className='card p-5 sm:p-6 mb-6' onSubmit={handleSubmit}>
        <h2 className='text-base  font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100 flex items-center gap-2'>
            <User className='w-5 h-5 text-slate-400'/>
            Public Profile
        </h2>

        {error && (
            <div className='bg-rose-50 text-rose-700 p-4 rounded-xl text-sm border border-rose-200 mb-6 flex items-start gap-3'>
                <div className='w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0'>
                    {error}
                </div>
            </div>
        )}

        {message && (
            <div className='bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm border border-emerald-200 mb-6 flex items-start gap-3'>
                <div className='w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0'/>
                    {message}
            </div>
        )}
        <div className='space-y-5'>
            <div className=' grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>Name</label>
                     <input disabled value={`${initalData.firstName} ${initalData.lastName}`} className='bg-slate-50 text-slate-400 cursor-not-allowed'/>
                </div>
                <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>Email</label>
                     <input disabled value={`${initalData.email}`} className='bg-slate-50 text-slate-400 cursor-not-allowed'/>
                </div>
                <div className='sm:col-span-2'>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>Position</label>
                     <input disabled value={`${initalData.position}`} className='bg-slate-50 text-slate-400 cursor-not-allowed'/>
                </div>                
            </div>
            <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Bio</label>
            <textarea disabled={initalData.isDeleted} name='bio' defaultValue={initalData.bio || ""} placeholder='Write a brief bio...' className={`resize-none ${initalData.isDeleted ? "bg-slate-50 text-slate-400 cursor-not-allowed" : ""}`} />
            <p className='text-xs text-slate-400 mt-1.5'>This will be displayed on your profile</p>
            </div>

            {initalData.isDeleted ? (
                <div className='pt-2'>
                    <div className='p-4 bg-rose-50 border border-rose-200 rounded-xl text-center'>
                        <p className='text-rose-600 font-medium tracking-tight'>Account Deactivated</p>
                        <p className='text-sm text-rose-500 mt-0.5'>You can no longer update your profile.</p>                        
                    </div>
                </div>
            ) : (
                <div className='flex justify-end pt-2'>
                    <button type='submit' disabled={loading} className='btn-primary flex items-center gap-2 justify-center w-full sm:w-auto' >
                        {loading ? <Loader2 className='w-4 h-4 animate-spin'/> : <Save className='w-4 h-4'/>} Save Changes
                    </button>
                </div>
            )}
        </div>
    </form>
  )
}

export default ProfileForm
