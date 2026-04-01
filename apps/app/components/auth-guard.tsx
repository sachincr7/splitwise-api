"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/stores/auth.store"

const PUBLIC_PATHS = ["/", "/auth/callback"]
const PROTECTED_PATHS = ["/dashboard"]

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { token } = useAuthStore()
  const isAuthenticated = !!token

  useEffect(() => {
    // Redirect authenticated users away from public pages (login/register)
    if (isAuthenticated && PUBLIC_PATHS.includes(pathname)) {
      router.replace("/dashboard")
      return
    }

    // Redirect unauthenticated users away from protected pages
    if (!isAuthenticated && PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
      router.replace("/")
      return
    }
  }, [isAuthenticated, pathname, router])

  return <>{children}</>
}
