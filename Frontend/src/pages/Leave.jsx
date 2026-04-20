import { PalmtreeIcon, PlusIcon, ThermometerIcon, UmbrellaIcon } from "lucide-react";
import { dummyLeaveData } from "../assets/assets";
import Loading from '../components/Loading'
import { useCallback, useEffect, useState } from "react";
import LeaveHistory from "../components/Leave/LeaveHistory";
import ApplyLeaveModal from "../components/Leave/ApplyLeaveModal";
import {useAuth} from "../context/authContext";
import api from '../api/axios.js'
import {toast} from 'react-hot-toast';

const Leave = () => {

  const {user} = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const isAdmin = user?.role === "ADMIN";

  const fetchLeaves = useCallback(async () => {
    // setLeaves(dummyLeaveData);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);

    try {
      const res = await api.get('leave');
      setLeaves(res.data.data || []);
      if(res.data.employee?.isDeleted) setIsDeleted(true);
    } catch (e) {
      toast.error(e?.response?.data?.error || e.message)
    } finally{
      setLoading(false);
    }
  }, [])

  useEffect(()=>{
    fetchLeaves();
  }, [fetchLeaves])

  if(loading) return <Loading/>

  const approvedLeaves = leaves.filter((l)=>l.status === "APPROVED");
  const sickCount = approvedLeaves.filter((l)=> l.type === "SICK").length;
  const casualCount = approvedLeaves.filter((l)=> l.type === "CASUAL").length;
  const annualCount = approvedLeaves.filter((l)=> l.type === "ANNUAL").length;

  const leaveStats = [
    {label: "Sick Leave", value: sickCount , icon: ThermometerIcon},
    {label: "Casual Leave", value: casualCount , icon: UmbrellaIcon},
    {label: "Annual Leave", value: annualCount , icon: PalmtreeIcon},
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="page-title">Leave Management</h1>
        <p className="page-subtitle">{isAdmin ? "Manage leave applications" : "Your leave history and requests"}</p>
      </div>

      {!isAdmin && !isDeleted && (
        <button onClick={()=>setShowModal(true)} className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
          <PlusIcon className="w-4 h-4"/> Apply for Leave
        </button>
      )}
      </div>

      {!isAdmin && (
         <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8'>
         {leaveStats.map((s)=>(
           <div key={s.label} className='card card-hover p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden group'>
               <div className='absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70'/>
               <div className='p-3 bg-slate-100 rounded-lg group-hover:bg-indigo-50 transition-colors duration-200'>
               <s.icon className='w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors duration-200'/>
               </div>
               <div>
                   <p className='text-sm to-slate-500'>{s.label}</p>
                   <p className='text-2xl font-medium to-slate-900 tracking-tight'>{s.value}
                    <span className="text-sm font-normal text-slate-400"> taken</span>
                   </p>
               </div>
           </div>
         ))}
       </div>
      )}
      <LeaveHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves}/>
      <ApplyLeaveModal open={showModal} onClose={()=>setShowModal(false)} onSuccess={fetchLeaves} />
    </div>
  )
}

export default Leave
