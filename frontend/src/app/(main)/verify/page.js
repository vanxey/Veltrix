'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { FETCH_URL } from '@/lib/constants'
import Button from '@/components/ui/button'
import Header from '@/components/header'

export default function VerifyPage() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const router = useRouter()
    
    const [status, setStatus] = useState('verifying') 

    useEffect(() => {
        if (!token) {
            setStatus('error')
            return
        }

        const verifyToken = async () => {
            try {
                const res = await fetch(`${FETCH_URL}/verify_email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token })
                })

                if (!res.ok) throw new Error('Verification failed')
                setStatus('success')
            } catch (err) {
                console.error(err)
                setStatus('error')
            }
        }

        verifyToken()
    }, [token])

    return (
        <div className="grid grid-rows-[auto_1fr] w-screen min-h-screen">
            <Header />
            <div className="flex flex-col items-center justify-center p-10 gap-5">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
                    {status === 'verifying' && (
                        <div className="text-xl font-bold text-gray-700">Verifying your email...</div>
                    )}
                    
                    {status === 'success' && (
                        <div className="flex flex-col gap-4">
                            <div className="text-2xl font-bold text-green-600">Email Verified!</div>
                            <p className="text-gray-500">Your account is now active.</p>
                            <Button className="w-full" onClick={() => router.push('/login')}>Go to Login</Button>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="flex flex-col gap-4">
                            <div className="text-2xl font-bold text-red-600">Verification Failed</div>
                            <p className="text-gray-500">The link may be invalid or expired.</p>
                            <Button className="w-full" variant="secondary" onClick={() => router.push('/login')}>Back to Login</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}