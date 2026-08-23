import { useState } from 'react'
import type { View } from './types'
import EmberBackground from './components/EmberBackground'
import LoginView from './components/LoginView'
import DashboardView from './components/DashboardView'

export default function App() {
  const [view, setView] = useState<View>('auth')
  const [mailbox, setMailbox] = useState('')

  return (
    <>
      <EmberBackground />
      {view === 'auth' ? (
        <LoginView
          onAuthed={(m) => {
            setMailbox(m)
            setView('dash')
          }}
        />
      ) : (
        <DashboardView mailbox={mailbox} onSignOut={() => setView('auth')} />
      )}
    </>
  )
}
