"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useDebounceCallback } from "@/hooks/use-debounce-callback"
import { useAuthStore } from "@/stores/auth.store"
import { cn } from "@/lib/utils"

export interface UserResult {
  id: number
  name: string
  email: string
}

interface MemberSearchProps {
  selected: UserResult[]
  onAdd: (user: UserResult) => void
  onRemove: (userId: number) => void
}

export function MemberSearch({ selected, onAdd, onRemove }: MemberSearchProps) {
  const { token } = useAuthStore()
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<UserResult[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const searchUsers = React.useCallback(
    async (q: string) => {
      if (q.trim().length < 2) {
        setResults([])
        setIsOpen(false)
        return
      }

      setIsLoading(true)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/users/search?q=${encodeURIComponent(q)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const data: UserResult[] = await res.json()
        // Filter out already selected users
        const filtered = data.filter((u) => !selected.some((s) => s.id === u.id))
        setResults(filtered)
        setIsOpen(filtered.length > 0)
      } catch {
        setResults([])
      } finally {
        setIsLoading(false)
      }
    },
    [token, selected]
  )

  const debouncedSearch = useDebounceCallback(searchUsers, 400)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    debouncedSearch(value)
  }

  const handleSelect = (user: UserResult) => {
    onAdd(user)
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="space-y-2">
      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((user) => (
            <span
              key={user.id}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
            >
              {user.name || user.email}
              <button
                type="button"
                onClick={() => onRemove(user.id)}
                className="ml-0.5 rounded-full hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search input */}
      <div ref={containerRef} className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-8"
          placeholder="Search by name or email..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => results.length > 0 && setIsOpen(true)}
        />

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
            {isLoading ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">Searching...</div>
            ) : (
              results.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleSelect(user)}
                  className={cn(
                    "flex w-full flex-col px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground",
                    "first:rounded-t-md last:rounded-b-md"
                  )}
                >
                  <span className="font-medium">{user.name || "No name"}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
