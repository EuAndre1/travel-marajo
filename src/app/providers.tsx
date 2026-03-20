'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { ContentOverridesProvider } from '@/components/content/ContentOverridesProvider'
import type { ContentStudioState } from '@/lib/content-studio/resolvers'

interface ProvidersProps {
  children: ReactNode
  initialContentState: ContentStudioState
}

export function Providers({ children, initialContentState }: ProvidersProps) {
  return (
    <SessionProvider>
      <ContentOverridesProvider initialState={initialContentState}>{children}</ContentOverridesProvider>
    </SessionProvider>
  )
}
