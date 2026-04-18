import { PencilIcon, Trash2Icon } from 'lucide-react'
import React from 'react'

const EmpCard = ({emp, onDelete, onEdit}) => {

    const handleDelete = async ()=>{
        if(!confirm("Are you sure you want to delete this employee?"))
        return;
    }

  return (
    <div className='group relative card card-hover overflow-hidden'>
      <div className='relative aspect-4/3 w-full overflow-hidden bg-linear-to-br from-slate-100 to-slate-50'>
         <div className='w-full h-full flex items-center justify-center'>
            {/* circle icon */}
            <div className='w-20 h-20 rounded-full bg-linear-to-br from-indigo-100 to-slate-100 flex items-center justify-center'>
                <span className='text-2xl font-medium text-indigo-400'>
                    {emp.firstName[0]} {emp.lastName[0]}
                </span>
            </div>
         </div>
      </div>

      <div className='absolute top-3 left-3 flex gap-2'>
        <span className='bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-slate-600 rounded-lg shadow-sm'>
        {emp.department || "Remote"}</span>
        {emp.isDeleted && <span className='bg-red-500/60 font-medium text-white px-2.5 py-1 text-xs rounded'>Deleted</span>}
      </div>

      {!emp.isDeleted && (
        <div className='absolute inset-0 bg-linear-to-t from-indigo-700/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-3'>
            <button onClick={()=>onEdit(emp)} className='p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-indigo-600 rounded-xl shadow-lg transition-all hover:scale-105'>
                <PencilIcon className='w-4 h-4'/>
            </button>
            <button onClick={handleDelete} className='p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-indigo-600 rounded-xl shadow-lg transition-all hover:scale-105 disabled:opacity-50'>
                <Trash2Icon className='w-4 h-4'/>
            </button>
        </div>
      )}


      <div className='p-5'>
        <h3 className='text-slate-900'>{emp.firstName} {emp.lastName}</h3>
        <p className='text-xs text-slate-500'>{emp.position}</p>
      </div>
    </div>
  )
}

export default EmpCard
