"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/stores/auth.store"

export function UserInitializer() {
  const { token, setAuth } = useAuthStore()

  useEffect(() => {
    // Only fetch if we have a token but no user data (or to refresh)
    if (!token) return

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!response.ok) {
          throw new Error("Failed to fetch user")
        }

        const userData = await response.json()
        
        // Update auth store with fresh user data
        setAuth(token, {
          id: userData.id,
          email: userData.email,
          name: userData.name,
        })
      } catch (error) {
        console.error("Failed to fetch user:", error)
      }
    }

    fetchUser()
  }, [token, setAuth])

  return null
}
