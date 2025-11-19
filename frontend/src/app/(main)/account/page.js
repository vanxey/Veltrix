'use client'

import Header from "@/components/header"
import Button from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function Account (){
    const {user, updateProfile, deleteAccount, isLoading, error } = useAuth()
    const router = useRouter()
    
    const [form, setForm] = useState({ username: '', email: '' })
    const [deletePassword, setDeletePassword] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if (user) {
            setForm({ username: user.username, email: user.email })
        } else {
            //router.push('/login') 
        }
    }, [user])

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await updateProfile(user.user_id, form)
            alert('Profile updated!')
            setIsEditing(false)
        } catch (err) {
            alert(err.message)
        }
    }

    const handleDelete = async () => {
        if (!confirm("Are you sure? This cannot be undone.")) return;
        
        try {
            await deleteAccount(user.user_id, deletePassword)
            alert('Account deleted.')
        } catch (err) {
            alert(err.message)
        }
    }

    if (!user) return null 

    return (
        <div className="grid grid-rows-[auto_1fr] w-screen h-screen">
            <Header />
            <div className="flex flex-col items-center p-10 gap-10">
                
                <div className="bg-white p-8 border-gray-100 rounded-xl shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Account Settings</h2>
                    
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-bold text-gray-500">Name</label>
                            <input 
                                type="text" 
                                value={form.username} 
                                disabled={!isEditing}
                                onChange={(e) => setForm({...form, username: e.target.value})}
                                className="w-full border border-gray-200 p-2 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-500">Email</label>
                            <input 
                                type="email" 
                                value={form.email} 
                                disabled={!isEditing}
                                onChange={(e) => setForm({...form, email: e.target.value})}
                                className="w-full border border-gray-200 p-2 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex gap-2 mt-2">
                            {!isEditing ? (
                                <Button onClick={() => setIsEditing(true)} variant="secondary" className="w-full">
                                    Edit Profile
                                </Button>
                            ) : (
                                <>
                                    <Button onClick={handleUpdate} disabled={isLoading} className="w-1/2">
                                        Save
                                    </Button>
                                    <Button onClick={() => setIsEditing(false)} variant="secondary" className="w-1/2 bg-gray-200 border-gray-200 text-gray-600 hover:bg-gray-300">
                                        Cancel
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h3 className="text-xl font-bold text-red-700 mb-2">Danger Zone</h3>
                    <p className="text-sm text-black mb-4">
                        Deleting your account will remove all your journal entries and analytics data.
                    </p>
                    
                    <div className="flex flex-col gap-3">
                        <input 
                            type="password" 
                            placeholder="Enter password to confirm"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            className="w-full border border-gray-200 p-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
                        />
                        <Button onClick={handleDelete}
                            disabled={!deletePassword || isLoading}
                            className="bg-red-500 border-none text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:hover:scale-100 disabled:hover:cursor-default transition-colors" >{isLoading ? 'Deleting...' : 'Delete My Account'}</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}