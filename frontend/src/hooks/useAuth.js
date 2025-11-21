'use client'

import { useState, useEffect } from 'react'
import { FETCH_URL } from '@/lib/constants'
import { useRouter } from 'next/navigation'

/**
 * Custom React Hook for managing user authentication state and actions.
 * It handles local storage persistence, login, registration, and profile management.
 * * @returns {object} AuthContext - The authentication context object.
 * @returns {object|null} AuthContext.user - The currently authenticated user object or null.
 * @returns {boolean} AuthContext.isLoading - True if an auth operation is in progress.
 * @returns {string|null} AuthContext.error - Any error message from the last operation.
 * @returns {function} AuthContext.login - Function to handle user login.
 * @returns {function} AuthContext.register - Function to handle user registration.
 * @returns {function} AuthContext.logout - Function to log out the user and clear state.
 * @returns {function} AuthContext.updateProfile - Function to update user profile information.
 * @returns {function} AuthContext.deleteAccount - Function to delete the user account.
 */
export function useAuth() {
  const [isLoading, setIsLoading] = useState(true) 
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const checkLocalUser = () => {
      const storedUser = localStorage.getItem('veltrix_user')
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (e) {
          console.error("Failed to parse user data", e)
          localStorage.removeItem('veltrix_user') 
        }
      }
      setIsLoading(false)
    }

    checkLocalUser()
  }, [])

  /**
   * Sends a login request to the backend API.
   * On success, stores user data in local storage and redirects to /journaling.
   * * @async
   * @param {object} form - Login credentials.
   * @param {string} form.email - User email.
   * @param {string} form.password - User password.
   * @returns {Promise<object>} The server response data containing user info.
   * @throws {Error} If login fails (e.g., invalid credentials, unverified email).
   */
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

  /**
   * Sends a registration request to the backend API.
   * On success, does not log the user in but alerts them to check their email.
   * * @async
   * @param {object} form - Registration credentials.
   * @param {string} form.username - Desired username.
   * @param {string} form.email - User email.
   * @param {string} form.password - User password.
   * @returns {Promise<object>} The server response data.
   * @throws {Error} If registration fails (e.g., user already exists).
   */
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

  /**
   * Clears the user data from local storage and redirects to the login page.
   */
  const logout = () => {
    localStorage.removeItem('veltrix_user')
    setUser(null)
    router.push('/login')
  }

  /**
   * Updates the user's profile details (username or email) via the PUT API endpoint.
   * Updates local storage and the hook state upon success.
   * * @async
   * @param {string} user_id - The ID of the user to update.
   * @param {object} formData - The fields to update (e.g., {username: 'newname'}).
   * @returns {Promise<object>} The server response data.
   * @throws {Error} If the update fails (e.g., email already in use).
   */
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

  /**
   * Deletes the user's account and all associated data after password confirmation.
   * Logs out the user upon successful deletion.
   * * @async
   * @param {string} user_id - The ID of the user to delete.
   * @param {string} password - The user's current password for confirmation.
   * @returns {Promise<object>} The server response data.
   * @throws {Error} If deletion fails (e.g., incorrect password).
   */
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