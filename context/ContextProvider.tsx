'use client'

import { UIStateProvider } from './UIStateContext'
import { UserProvider } from './UserContext'

export const ContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <UserProvider>
      <UIStateProvider>{children}</UIStateProvider>
    </UserProvider>
  )
}
