'use client'

import { useAuth } from '@/context/auth-context'
import PasswordScreen from './password-screen'
import { ReactNode } from 'react'

export default function ProtectedContent({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <PasswordScreen />
  }

  return <>{children}</>
}
