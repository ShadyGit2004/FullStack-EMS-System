import { ArrowRightIcon, CalendarIcon, DollarSignIcon, FileTextIcon } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const EmpDashboard = ({data}) => {
    const emp = data.employee;
    const cards = [
        {
            icon : CalendarIcon,
            value : data.currentMonthAttendance,
            title : "Days Present",
            subtitle : "This month",
        },
        {
            icon : FileTextIcon,
            value : data.pendingLeaves,
            title : "Pending Leaves",
            subtitle : "Awaiting approval",
        },
        // {
        //     icon : DollarSignIcon,
        //     value : data.latestPayslip ? `$${data.latestPayslip.netSalary}` : "N/A",
        //     title : "Latest Payslip",
        //     subtitle : "Most recent payout",
        // },
    ];

  return (
    <div className='animate-fade-in'>
      <div className='page-header'>
        <h1 className='page-title'>Welcome, {emp?.firstName}!</h1>
        <p className='page-subtitle'> {emp?.position} - {emp?.department || "No Department"} </p>
      </div>

    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8'>
        {cards.map((card, index)=>
            <div key={index} className='card card-hover p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between'>
                <div>
                    <div className='absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70'/>
                    <p className='text-sm font-medium text-slate-700'>{card.title}</p>
                    <p className='text-2xl font-bold text-slate-900'>{card.value}</p>
                </div>
                <card.icon className='size-10 p-2.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors'/>
            </div>
        )}
    </div>

    <div>
        <Link to='/attendence' className='btn-primary text-center inline-flex items-center justify-center gap-2'>
        Mark Attendence <ArrowRightIcon className='w-4 h-4'/>
        </Link> 

        <Link to='/leave' className='btn-secondary text-center'>
        Apply for leave
        </Link> 
    </div> 

    </div>
  )
}

export default EmpDashboard

