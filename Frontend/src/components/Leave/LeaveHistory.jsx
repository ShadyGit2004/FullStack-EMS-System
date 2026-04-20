import { Check, Loader2, X } from 'lucide-react';
import React, { useState } from 'react'
import {format} from 'date-fns';
import api from '../../api/axios.js'
import {toast} from 'react-hot-toast';

const LeaveHistory = ({leaves, isAdmin, onUpdate}) => {
  
  const [processing, setProcessing] = useState(null);

  const handleStatusUpdate = async (id, status) =>{
    setProcessing(id);
    try {
        await api.patch(`/leave/${id}`, {status});
        onUpdate();
    } catch (e) {
        toast.error(e?.response?.data?.error || e.message)
    } finally {
        setProcessing(null);
    }
  } 
  
    return (
    <div className='card overflow-hidden'>    
  <div className='overflow-x-auto'>
    <table className='table-modern'>
        <thead>
            <tr>
                {isAdmin && <th>Employee</th>}
                <th>Type</th>
                <th>Dates</th>
                <th>Reason</th>
                <th>Status</th>
                {isAdmin && <th className='text-center'>Actions</th>}   
            </tr>
        </thead>
        <tbody>
            {leaves.length === 0 ? (
                <tr>
                    <td className='py-12 text-center' colSpan={isAdmin ? 6 : 4}>
                        No leave applications found
                    </td>
                </tr>
            ) : (
                leaves.map((l)=>{                   
                    return (
                        <tr key={l._id || l.id}>
                            {isAdmin && (
                               <td className='text-slate-900'>
                                    {l.employee?.firstName} - {l.employee?.lastName}           
                               </td>     
                            )}
                            
                            <td>
                                <span className='badge bg-slate-100 text-slate-600'>
                                    {l.type}
                                </span>
                            </td>

                            <td className='text-xs text-slate-500'>
                                {format((new Date(l.startDate)), "MMM dd")} -
                                {format((new Date(l.endDate)), "MMM dd, yyyy")}
                            </td>

                            <td className='truncate max-w-xs text-slate-500' title={l.reason}>
                                {l.reason}
                            </td>

                            <td>
                            <span className={`badge ${l.status === "APPROVED" ? "badge-success" : l.status === "REJECTED" ? "badge-danger" : "badge-warning"}`}>{l.status}</span>       
                            </td>

                            {isAdmin && (
                                <td>
                                    {l.status === "PENDING" && (
                                        <div className='flex justify-center gap-2'>
                                            <button 
                                           onClick={()=>handleStatusUpdate(l._id || l.id, "APPROVED")} disabled={!!processing}
                                           className='p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors'>
                                                {processing === (l._id || l.id) ? <Loader2 className='w-4 h-4 animate-spin'/> : <Check className='w-4 h-4'/>}
                                            </button>
                                            <button  onClick={()=>handleStatusUpdate(l._id || l.id, "REJECTED")}
                                            disabled={!!processing} className='p-1.5 rounded-md bg-rose-50 text-red-600 hover:bg-red-100 transition-colors'>
                                                {processing === (l._id || l.id) ? <Loader2 className='w-4 h-4 animate-spin'/> : <X className='w-4 h-4'/>}
                                            </button>
                                        </div>
                                    )}                              
                               </td>
                            )}
                             
                        </tr>
                    )
                })
            )}
        </tbody>
    </table>
  </div>
</div>
  )
}

export default LeaveHistory
