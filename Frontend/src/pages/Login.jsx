import { Link, Navigate } from "react-router-dom"
import LoginLeftSide from "../components/LoginLeftSide"
import  {UserIcon, ShieldIcon, ArrowRightIcon} from 'lucide-react'
import { useAuth } from "../context/authContext"
import Loading from "../components/Loading"
const Login = () => {

  const portalOptions = [
    {
      to:"/login/admin",
      title:"Admin portal",
      desc:"Manage employees, departments, and system configurations",
      icon: ShieldIcon
    },
    {
      to:"/login/employee",
      title:"Employee portal",
      desc:"View your profile, track attendence, request time off.",
      icon: UserIcon
    },
  ]

  const {user, loading} = useAuth();
  
  if(loading) return <Loading />
  if(user) return <Navigate to={"/"}/>
    

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftSide/> 


      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen">
      
      <div className="w-full max-w-md animate-fade-in relative z-10"> 

          {/* headr */}
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-medium text-slate-900 tracking-tight mb-3">Welcome back</h2>
            <p className="text-slate-500">Select your portal to securely access the system.</p>
          </div>

          {/* portal list */}
          <div className="space-y-4">
            {portalOptions.map((portal)=>(
              <Link key={portal.to} to={portal.to}
              className="group block bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50">
              <div className="relative z-10 flex items-center justify-between gap-4 sm:gap-5">
                <h3 className="text-lg to-slate-800 group-hover:text-indigo-600 mb-1 transition-colors">{portal.title}</h3>
                <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:text-indigo-600"/>
              </div>
              </Link>
            ))}
          </div>

          {/* footer */}
          <div className="mt-12 text-center md:text-left text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} RJT. All rights reserved.</p>
          </div>
      </div>
      
       </div>
    </div> 
  )
}

export default Login
