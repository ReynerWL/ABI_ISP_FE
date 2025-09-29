'use client'

import { useEffect } from 'react'

const usePageTitle = (title: string, useTemplate = true) => {
  useEffect(() => {
    if (title) {
      document.title = title + (useTemplate ? ' - Martanet' : '')
    }
  }, [title])
}

export default usePageTitle
