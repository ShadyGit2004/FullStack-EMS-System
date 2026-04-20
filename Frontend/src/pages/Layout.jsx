import { Navigate, Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { useAuth } from "../context/authContext"
import Loading from "../components/Loading"
 

const Layout = () => {

  const {user, loading} = useAuth();
  
  if(loading) return <Loading />
  if(!user) return <Navigate to={"/login"}/>
  

  return (
    <div className="flex h-screen bg-green-300">      
      <Sidebar/>
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 pt-16 sm:pt-6 lg:p-8 max-w-400 mx-auto">
          <Outlet/>
        </div>
      </main>
    </div>
  )
}

export default Layout
