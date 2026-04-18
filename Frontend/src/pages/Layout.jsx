import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

 

const Layout = () => {
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
