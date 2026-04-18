import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Login from './pages/Login'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Employee from './pages/Employee'
import Attendence from './pages/Attendence'
import Leave from './pages/Leave'
import Setting from './pages/Setting'

const App = () => {
  return (
    <>
    <Toaster/>
    <Routes>
      <Route path={'/login'} element={<Login/>} />

      <Route path={'/login/admin'} element={<LoginForm role='admin' title='Admin Portal' subtitle='Sign in to manage the organisation' />} />

      <Route path={'/login/employee'} element={<LoginForm role='employee' title='Employee Portal' subtitle='Sign in to access your account' />} />

      <Route element={<Layout/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/employees' element={<Employee/>}/>
        <Route path='/attendence' element={<Attendence/>}/>
        <Route path='/leave' element={<Leave/>}/>
        {/* <Route path='/payslips' element={<Payslips/>}/> */}
        <Route path='/settings' element={<Setting/>}/>
      </Route> 

      {/* <Route path='/print/payslips/:id' element={<PrintPayslip/>}/> */}

      <Route path={'*'} element={<Navigate to={'/dashboard'} replace/>} />
    </Routes>    
    </>
  )
}

export default App
