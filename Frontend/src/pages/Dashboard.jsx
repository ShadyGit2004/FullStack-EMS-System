import { useEffect, useState } from "react"
import { dummyAdminDashboardData, dummyEmployeeDashboardData } from "../assets/assets"
import Loading from "../components/Loading"
import AdminDashboard from "../components/AdminDashboard"
import EmpDashboard from "../components/EmpDashboard"
import api from "../api/axios.js"
import {toast} from "react-hot-toast"

const Dashboard = () => {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{

    api.get("/dashboard").then((res)=> setData(res.data))
    .catch((e)=> toast.error(e.response?.data?.error || e?.message || "Failed to Load"))
    .finally(()=>setLoading(false));

    // setData(dummyEmployeeDashboardData)
    // setTimeout(() => {
    //   setLoading(false)
    // }, 1000);
  }, []);

  if(loading) return <Loading/>
  if(!data) return <p className="text-center text-slate-500 py-12">Failed to load dashboard</p>
 
  if(data.role=="ADMIN"){
      return <AdminDashboard data={data}/>
  }else return <EmpDashboard data={data}/>
}

export default Dashboard

