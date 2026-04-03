"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { UserPlus, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ActionDialog } from "@/components/ui/action-dialog"
import { MemberSearch, UserResult } from "@/components/member-search"
import { MemberList } from "@/components/groups/member-list"
import { useAuthStore } from "@/stores/auth.store"

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

export default function GroupDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { token, user } = useAuthStore()

  const [group, setGroup] = React.useState<Group | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [addDialogOpen, setAddDialogOpen] = React.useState(false)
  const [selectedMembers, setSelectedMembers] = React.useState<UserResult[]>([])
  const [isAdding, setIsAdding] = React.useState(false)

  const fetchGroup = React.useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/groups/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Failed to load group")
      const data = await res.json()
      setGroup(data)
    } catch {
      toast.error("Failed to load group")
    } finally {
      setIsLoading(false)
    }
  }, [id, token])

  React.useEffect(() => {
    fetchGroup()
  }, [fetchGroup])

  const handleAddMembers = async () => {
    if (!user || selectedMembers.length === 0) return

    setIsAdding(true)
    try {
      await Promise.all(
        selectedMembers.map((member) =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/groups/${id}/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ creator_id: user.id, member_id: member.id }),
          })
        )
      )
      toast.success(`${selectedMembers.length} member(s) added`)
      setSelectedMembers([])
      setAddDialogOpen(false)
      fetchGroup()
    } catch {
      toast.error("Failed to add members")
    } finally {
      setIsAdding(false)
    }
  }

  const handleRemoveMember = async (memberId: number) => {
    if (!user) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/groups/${id}/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ creator_id: user.id, member_id: memberId }),
      })

      if (!res.ok) throw new Error()
      toast.success("Member removed")
      fetchGroup()
    } catch {
      toast.error("Failed to remove member")
    }
  }

  const isOwner = group?.owner?.id === user?.id

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    )
  }

  if (!group) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20">
        <p className="text-muted-foreground text-sm">Group not found</p>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{group.name}</h1>
            <p className="text-muted-foreground text-xs">
              Owner: {group.owner.name || group.owner.email}
            </p>
          </div>
        </div>

        {isOwner && (
          <ActionDialog
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
            trigger={
              <Button size="sm">
                <UserPlus className="h-4 w-4" />
                Add Member
              </Button>
            }
            title="Add Members"
            confirmLabel={isAdding ? "Adding..." : `Add ${selectedMembers.length || ""} Member${selectedMembers.length !== 1 ? "s" : ""}`}
            confirmDisabled={selectedMembers.length === 0 || isAdding}
            onConfirm={handleAddMembers}
            onCancel={() => setSelectedMembers([])}
          >
            <MemberSearch
              selected={selectedMembers}
              onAdd={(u) => setSelectedMembers((prev) => [...prev, u])}
              onRemove={(uid) =>
                setSelectedMembers((prev) => prev.filter((m) => m.id !== uid))
              }
            />
          </ActionDialog>
        )}
      </div>

      {/* Members List */}
      <MemberList
        members={group.members}
        ownerId={group.owner.id}
        currentUserId={user?.id}
        onRemove={handleRemoveMember}
      />
    </div>
  )
}
