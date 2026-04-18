import React from 'react'
import { getDayTypeDisplay, getWorkingHoursDisplay } from '../../assets/assets'
import {format} from 'date-fns'

const AttendanceHistory = ({history}) => {
  return (
    <div className='card overflow-hidden'>
        <div className='px-6 py-4 border-b border-slate-100'>
            <h3 className='font-semibold text-slate-900'>Recent Activity</h3>
        </div>
      <div className='overflow-x-auto'>
        <table className='table-modern'>
            <thead>
                <tr>
                    <th className='px-6 py-4'>Date</th>
                    <th className='px-6 py-4'>Check In</th>
                    <th className='px-6 py-4'>Check Out</th>
                    <th className='px-6 py-4'>Working Hours</th>
                    <th className='px-6 py-4'>Day Type</th>
                    <th className='px-6 py-4'>Status</th>
                </tr>
            </thead>
            <tbody>
                {history.length === 0 ? (
                    <tr>
                        <td className='py-12 text-center' colSpan={6}>
                            No records found
                        </td>
                    </tr>
                ) : (
                    history.map((r)=>{
                        const dayType = getDayTypeDisplay(r);
                        return (
                            <tr key={r._id || r.id}>
                                <td className='px-6 py-4 font-medium text-slate-900'>{format((new Date(r.date)), "MMM dd, yyyy")}                                   
                                </td>

                                <td className='px-6 py-4 text-slate-600'>
                                    {r.checkIn ? format((new Date(r.checkIn)), "hh:mm a") : "-"}
                                </td>

                                <td className='px-6 py-4 text-slate-600'>
                                    {r.checkOut ? format((new Date(r.checkOut)), "hh:mm a") : "-"}
                                </td>

                                <td className='px-6 py-4 font-medium text-slate-600'>
                                    {getWorkingHoursDisplay(r)}           
                                </td>

                                <td className='px-6 py-4'>
                                 {dayType.label !== "-" ? <span className={`badge ${dayType.className}`}>{dayType.label}</span> : "-"}
                                </td>

                                <td className='px-6 py-4'>
                                 <span className={`badge ${r.status === "PRESENT" ? "badge-success" : r.status === "LATE" ? "badge-warning" : "badge-danger"}`}>{r.status}</span> 
                                </td>
                                
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

export default AttendanceHistory
 