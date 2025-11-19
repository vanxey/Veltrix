'use client'

import { useState, useEffect } from 'react'
import { FETCH_URL } from '@/lib/constants'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('veltrix_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse user data", e)
      }
    }
  }, [])

  const login = async (form) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`${FETCH_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()
      //console.log(data.user)
      if (!res.ok) throw new Error(data.error || 'Login failed')

      localStorage.setItem('veltrix_user', JSON.stringify(data.user))
      setUser(data.user)
      router.push('/journaling') 
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (form) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`${FETCH_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')
      
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('veltrix_user')
    setUser(null)
    router.push('/login')
  }

  const updateProfile = async (user_id, formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${FETCH_URL}/user/${user_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Update failed')

      const updatedUser = { ...user, ...data.user }
      localStorage.setItem('veltrix_user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  };

  const deleteAccount = async (user_id, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`${FETCH_URL}/user/${user_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Delete failed')


      logout()
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  };

  return { user, login, register, logout, updateProfile, deleteAccount, isLoading, error }
}