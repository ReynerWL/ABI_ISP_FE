import { config } from '#/config/app'
import { useEffect, useRef, useState } from 'react'

export interface WaStatus {
  connected: boolean
  qrAvailable: boolean
  isLoggedOut: boolean
}

/**
 * Custom hook that connects to the WA SSE status stream.
 * Provides real-time WhatsApp connection status without polling.
 */
export function useWaStatus() {
  const [status, setStatus] = useState<WaStatus>({
    connected: false,
    qrAvailable: false,
    isLoggedOut: true
  })
  const [sseConnected, setSseConnected] = useState(false)
  const esRef = useRef<EventSource | null>(null)
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let cancelled = false

    function connect() {
      if (cancelled) return

      // Close existing connection
      if (esRef.current) {
        esRef.current.close()
        esRef.current = null
      }

      const es = new EventSource(`${config.baseUrl}/wa/status/stream`)
      esRef.current = es

      es.onopen = () => {
        if (!cancelled) {
          setSseConnected(true)
        }
      }

      es.onmessage = (event) => {
        if (cancelled) return
        try {
          const data: WaStatus = JSON.parse(event.data)
          setStatus(data)
        } catch {
          // ignore parse errors
        }
      }

      es.onerror = () => {
        if (cancelled) return
        setSseConnected(false)
        es.close()
        esRef.current = null

        // Retry after 3 seconds
        retryTimeoutRef.current = setTimeout(() => {
          if (!cancelled) connect()
        }, 3000)
      }
    }

    connect()

    return () => {
      cancelled = true
      if (esRef.current) {
        esRef.current.close()
        esRef.current = null
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
        retryTimeoutRef.current = null
      }
    }
  }, [])

  return {
    connected: status.connected,
    qrAvailable: status.qrAvailable,
    isLoggedOut: status.isLoggedOut,
    sseConnected
  }
}
