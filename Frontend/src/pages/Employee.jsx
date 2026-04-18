import { useCallback, useEffect, useState } from "react"
import { DEPARTMENTS, dummyEmployeeData } from "../assets/assets";
import { Plus, Search, X } from "lucide-react";
import EmpForm from "../components/EmpForm";
import EmpCard from "../components/EmpCard";

const Employee = () => {


  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");
  const [editEmp, setEditEmp] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchEmployee = useCallback(async () => {
    setLoading(true);
    setEmployee(dummyEmployeeData.filter((emp)=>(dept ? emp.department === dept : emp)))
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [dept]);

  useEffect(()=>{
    fetchEmployee();
  }, [fetchEmployee])

  const filtered = employee.filter((emp)=>`${emp.firstName} ${emp.lastName} ${emp.position}`.includes(search.toLowerCase()));

  return (
    <div className="animate-fade-in">

       {/* header  */}
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team members</p>
        </div>
        <button onClick={()=>setShowCreateModal(true)} className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
          <Plus size={16}/> Add Employee
        </button>

       </div>


       {/* search bar  */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4"/>
            <input placeholder="Search employees..." className="w-full pl-10" onChange={(e)=>setSearch(e.target.value)} value={search}/>
          </div>
          <select value={dept} onChange={(e)=>setDept(e.target.value)} className="max-w-40">
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d)=>(
            <option key={d} value={d}>{d}</option>
          ))}
          </select>
        </div>

       {/* employee cards  */}

        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filtered.length === 0 ? (
              <p className="col-span-full text-center py-16 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">No employees found</p>
            ) : (filtered.map((emp)=> <EmpCard key={emp.id} emp={emp} onDelete={fetchEmployee} onEdit={(e)=>setEditEmp(e)}/>)) }
          </div>
        )}

        {/* create emp modal */}
        {showCreateModal && (
          <div className="fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={()=>{setShowCreateModal(false)}}>
             <div className="fixed inset-0"/>
             <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in"
             onClick={(e)=>e.stopPropagation()}>
              <div className="flex items-start justify-center p-6 pb-0">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Add new employee</h2>
                  <p className="text-smtext-slate-500 mt-0">Create a user account and employee profile</p>
                </div>
                <button onClick={()=>setShowCreateModal(false)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5"/>
                </button>
              </div>
              <div className="p-6">
              <EmpForm 
                onSuccess={()=>{
                  setShowCreateModal(false);
                  fetchEmployee();
                }} 
                onCancel={()=>setShowCreateModal(false)}/>
              </div>
             </div>
          </div>
        )}

        {/* edit emp modal */}

        {editEmp && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm" onClick={()=>setEditEmp(null)}>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in" onClick={(e)=>e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 pb-0">
              <div>
                  <h2 className="text-lg font-semibold text-slate-900">Edit employee</h2>
                  <p className="text-smtext-slate-500 mt-0">Update employee details</p>
                </div>
                <button onClick={()=>setEditEmp(null)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5"/>
                </button>
              </div>
              <div className="p-6">
                <EmpForm initialData={editEmp}
                onSuccess={()=>{
                  setEditEmp(null);
                  fetchEmployee();
                }} onCancel={()=>setEditEmp(null)}/>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Employee
