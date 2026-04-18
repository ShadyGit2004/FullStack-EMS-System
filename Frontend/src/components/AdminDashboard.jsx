import { Building2Icon, CalendarIcon, FileTextIcon, UserIcon } from 'lucide-react';
import React from 'react'

const AdminDashboard = ({data}) => {
 
 const stats = [
    {
        icon : UserIcon,
        value : data.totalEmployees,
        label : "Total Employees",
        desc : "Active workforce",
    },
    {
        icon : Building2Icon,
        value : data.totalDepartments,
        label : "Departments",
        desc : "Organisation units",
    },
    {
        icon : CalendarIcon,
        value : data.todayAttendance,
        label : "Today's Attendance",
        desc : "Checked in today",
    },
    {
        icon : FileTextIcon,
        value : data.pendingLeaves,
        label : "Pending Leaves",
        desc : "Awaiting approval",
    },    
 ];
 
 
    return (
        <div className='animate-fade-in'>
        <div className='page-header'>
          <h1 className='page-title'>Dashboard</h1>
          <p className='page-subtitle'> Welcome back, Admin - here's your overview </p>
        </div>
  
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-col-4 gap-4 sm:gap-5 mb-8'>
          {stats.map((s)=>
              <div key={s.label} className='card card-hover p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between'>
                  <div>
                      <div className='absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70'/>
                      <p className='text-sm font-medium text-slate-700'>{s.label}</p>
                      <p className='text-2xl font-bold text-slate-900'>{s.value}</p>
                  </div>
                  <s.icon className='size-10 p-2.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors'/>
              </div>
          )}
      </div>  
      </div>
  )
}

export default AdminDashboard
