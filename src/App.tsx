import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { onAuthChange, logout } from './lib/auth'
import EmberBackground from './components/EmberBackground'
import LoginView from './components/LoginView'
import DashboardView from './components/DashboardView'

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthChange((u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-ember-400 border-t-transparent" />
      </div>
    )
  }

  return (
    <>
      <EmberBackground />
      {user ? (
        <DashboardView
          uid={user.uid}
          mailbox={user.email ?? 'buzón conectado'}
          onSignOut={() => logout()}
        />
      ) : (
        <LoginView />
      )}
    </>
  )
}
