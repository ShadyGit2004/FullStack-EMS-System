import { useEffect, useState } from "react"
import { dummyProfileData } from "../assets/assets";
import Loading from '../components/Loading' 
import { Lock } from "lucide-react";
import ProfileForm from "../components/ProfileForm";
import ChangePasswordModal from "../components/ChangePasswordModal"; 

const Setting = () => {

  const [profile, SetProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const fetchProfile = async () => {
    SetProfile(dummyProfileData)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  useEffect(()=>{
    fetchProfile();
  }, [fetchProfile]);

  if(loading) return <Loading/>

  return (
    <div className="animate-fade-in">
     <div className="page-header">
      <h1 className="page-title">Settings</h1>
      <p className="page-subtitle">Manage your account and preferences</p>
     </div>

     {profile && <ProfileForm initalData={profile} onSuccess={fetchProfile}/>}

     {/* change password */}
     <div className="card max-w-md p-6 flex items-center justify-between">
       <div className="flex items-center gap-3">
        <div className="p-2.5 bg-slate-100 rounded-lg">
            <Lock className="w-5 h-5 text-slate-600"/>
        </div>
        <div>
          <p className="font-medium text-slate-900">Password</p>
          <p className="text-sm text-slate-500">Update your account password</p>
        </div>
       </div>
    <button className="btn-secondary text-sm" onClick={()=>setShowPasswordModal(true)}>Change</button>
     </div>
     <ChangePasswordModal open={showPasswordModal} onClose={()=>setShowPasswordModal(false)}/>
    </div>
  )
}

export default Setting
