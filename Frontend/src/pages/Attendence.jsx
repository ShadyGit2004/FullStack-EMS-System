import { useCallback, useEffect, useState } from "react"
import { dummyAttendanceData } from "../assets/assets";
import Loading from "../components/Loading";
import CheckInBtn from "../components/Attendance/CheckInBtn";
import AttendanceStats from "../components/Attendance/AttendanceStats";
import AttendanceHistory from "../components/Attendance/AttendanceHistory";

import api from '../api/axios.js'
import {toast} from 'react-hot-toast';

const Attendence = () => {
  
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = useCallback(async () => {
    // setHistory(dummyAttendanceData);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);

    try {
      const res = await api.get("/attendance");
      const json = res.data;
      setHistory([json.data] || []);
      if(json.employee?.isDeleted) setIsDeleted(true);
    } catch (e) {
      toast.error(e?.response?.data?.error || e.message)
    } finally {
      setLoading(false);
    }

  }, []);

  useEffect(()=>{
    fetchData();
  }, [fetchData])

  if(loading) return <Loading/>
// console.log(history);

  const today = new Date();
  today.setHours(0,0,0,0);
  const todayRecord = history.find((r)=> new Date(r.date).toDateString()===today.toDateString());

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Attendence</h1>
        <p className="page-subtitle">Track your work hours and daily check-ins</p>
      </div>

      {isDeleted ? (
        <div className="mb-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center">
          <p className="text-rose-600">You can no longer check in or out because your employee records have been marked as deleted.</p>
        </div>
      ) : (
        <div className="mb-8">
          <CheckInBtn todayRecord={todayRecord} onAction={fetchData}/>
        </div>
      )}
      <AttendanceStats history={history}/>
      <AttendanceHistory history={history}/>
    </div>
  )
}

export default Attendence
