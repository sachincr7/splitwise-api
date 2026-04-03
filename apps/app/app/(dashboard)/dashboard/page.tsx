"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PlusIcon, UsersIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/auth.store"
import { toast } from "sonner"

interface Member {
  id: number
  name: string
  email: string
}

interface Group {
  id: number
  name: string
  owner: Member
  members: Member[]
}

export default function DashboardPage() {
  const router = useRouter()
  const { token, user } = useAuthStore()
  const [groups, setGroups] = React.useState<Group[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    if (!user?.id || !token) return

    const fetchGroups = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/groups/user/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (!res.ok) throw new Error()
        const data = await res.json()
        setGroups(data)
      } catch {
        toast.error("Failed to load groups")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGroups()
  }, [user?.id, token])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Groups</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage your expense groups</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/groups/create">
            <PlusIcon className="h-4 w-4" />
            Create Group
          </Link>
        </Button>
      </div>

      {/* Groups List */}
      <div className="mt-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-muted-foreground text-sm">Loading groups...</p>
          </div>
        ) : groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
            <UsersIcon className="text-muted-foreground mb-3 h-10 w-10" />
            <p className="font-medium">No groups yet</p>
            <p className="text-muted-foreground mt-1 text-sm">Create a group to start splitting expenses</p>
            <Button className="mt-4" asChild>
              <Link href="/dashboard/groups/create">
                <PlusIcon className="h-4 w-4" />
                Create Group
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => router.push(`/dashboard/groups/${group.id}`)}
                className="rounded-lg border bg-card p-4 text-left transition-colors hover:bg-accent"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{group.name}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {group.owner.id === user?.id ? "You" : group.owner.name || group.owner.email} · Owner
                    </p>
                  </div>
                  <span className="text-muted-foreground flex items-center gap-1 text-xs">
                    <UsersIcon className="h-3.5 w-3.5" />
                    {group.members.length}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
