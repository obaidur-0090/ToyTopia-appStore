/* eslint react-refresh/only-export-components: off */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, firebaseConfigured } from '../firebase.inti'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(firebaseConfigured)

  useEffect(() => {
    if (!firebaseConfigured) return undefined
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    }, (error) => {
      console.error('Unable to restore Firebase authentication state.', error)
      setLoading(false)
    })
  }, [])

  const value = useMemo(() => ({
    user,
    loading,
    refreshUser: async () => {
      await auth.currentUser?.reload()
      setUser(auth.currentUser)
    },
  }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider.')
  return context
}
