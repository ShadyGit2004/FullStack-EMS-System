import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DEPARTMENTS } from '../assets/assets';
import { Loader2Icon } from 'lucide-react';
import api from '../api/axios.js'
import {toast} from 'react-hot-toast';

const EmpForm = ({initialData, onSuccess, onCancel}) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const isEditMode = !!initialData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        if(isEditMode){
            const pswd = formData.get("password");
            if (!pswd) formData.delete("password");
        };

        try {
            const url = isEditMode ? `/employees/${initialData.id}` : "/employees";
            const method = isEditMode ? "put" : "post";
            await api[method](url, formData);
            onSuccess ? onSuccess() : navigate("/employees");
        } catch (e) {
            toast.error(e.response?.data?.error || e.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <form onSubmit={handleSubmit} className='space-y-6 max-w-3xl animate-fade-in'>

        {/* personal info */}
        <div className='card p-5 sm:p-6'>
            <h3 className='font-medium mb-6 pb-4 border-b border-slate-100'>Personal Information</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
                <div>
                    <label className='block mb-2'>First Name</label>
                    <input name='firstName' placeholder='firstName' required defaultValue={initialData?.firstName}/>
                </div>
                <div>
                    <label className='block mb-2'>Last Name</label>
                    <input name='lastName' placeholder='lastName' required defaultValue={initialData?.lastName}/>
                </div> 
                <div>
                    <label className='block mb-2'>Phone Number</label>
                    <input name='phone' placeholder='phone no.' required defaultValue={initialData?.phone}/>
                </div> 
                <div>
                    <label className='block mb-2'>Join Date</label>
                    <input name='joinDate' required defaultValue={initialData?.joinDate ? new Date(initialData.joinDate).toISOString().split("T")[0] : ""}/>
                </div> 
                <div className='sm:col-span-2'>
                    <label className='block mb-2'>Bio (optional)</label>
                    <textarea name="bio" defaultValue={initialData?.bio} rows={3} className='resize-none' placeholder='Breif desc...'></textarea>
                </div> 
            </div>
        </div>

        {/* emp details */}
        <div className='card p-5 sm:p-6'>
            <h3 className='text-base font-medium mb-6 pb-4 border-b border-slate-100'>Employment Details</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
                <div>
                    <label className='block mb-2'>Department</label>
                    <select name="department" defaultValue={initialData?.department || ""}>
                        <option value="">Select Department</option>
                        {DEPARTMENTS.map((d)=>(
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>                    
                    </div>    
                    <div>
                    <label className='block mb-2'>Position</label>
                    <input placeholder='position' name='position' required defaultValue={initialData?.position}/>
                 </div>   
                 <div>
                    <label className='block mb-2'>Basic Salary</label>
                    <input name='basicSalary' min="0"
                    step="0.01" required defaultValue={initialData?.basicSalary || 0}/>
                 </div>  
                 <div>
                    <label className='block mb-2'>Allowances</label>
                    <input name='allowances' min="0"
                    step="0.01" required defaultValue={initialData?.allowances || 0}/>
                 </div>    
                 <div>
                    <label className='block mb-2'>Deductions</label>
                    <input name='deductions' min="0"
                    step="0.01" required defaultValue={initialData?.deductions || 0}/>
                 </div>     
                 {isEditMode && (
                    <div>
                    <label className='block mb-2'>Status</label>
                    <select name='employmentStatus' defaultValue={initialData?.employmentStatus}>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                    </select>
                 </div> 
                 )} 
                </div>
        </div>

        {/* acc setup */}
        <div className='card p-5 sm:p-6'>
            <h3 className='text-base text-slate-900 font-medium mb-6 pb-4 border-b border-slate-100'>Account setup</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
                <div className='sm:col-span-2'>
                    <label className='block mb-2'>Work Email</label>
                    <input type='email' name='email' placeholder='email' required defaultValue={initialData?.email}/>
                </div>          
                {!isEditMode && (
                    <div>
                        <label className='block mb-2'>Temporary Password</label>
                        <input type="password" name='password' required/>
                    </div>
                )}    
                {isEditMode && (
                    <div>
                        <label className='block mb-2'>Change Password (optional)</label>
                        <input type="password" name='password' placeholder='Leave blank to keep current'/>
                    </div>
                )}     
                <div>
                        <label className='block mb-2'>System Role</label>
                        <select name="role" defaultValue={initialData?.role || "EMPLOYEE"}>
                        <option value="EMPLOYEE">Employee</option>     
                        <option value="ADMIN">Admin</option>                   
                    </select>  
                    </div>
            </div>
        </div>

        {/* btns */}
        <div className='flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2'>
            <button type='button' className='btn-secondary' onClick={()=>(onCancel?onCancel():navigate(-1))}> Cancel</button>
            <button type='submit' disabled={loading} className='btn-primary flex items-center justify-center'>
                {loading && <Loader2Icon className='w-4 h-4 mr-2 animate-spin'/>}
                {isEditMode ? "Update Employee" : "Create Employee"}
            </button>
        </div>

    </form>
  )
}

export default EmpForm
