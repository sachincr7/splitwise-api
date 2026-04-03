"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MemberSearch, UserResult } from "@/components/member-search"
import { useAuthStore } from "@/stores/auth.store"

const schema = z.object({
  name: z.string().min(1, "Group name is required"),
})

type FormValues = z.infer<typeof schema>

export default function CreateGroupPage() {
  const router = useRouter()
  const { token, user } = useAuthStore()
  const [members, setMembers] = React.useState<UserResult[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    if (!user) return

    setIsLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: values.name,
          creator_id: user.id,
          member_ids: members.map((m) => m.id),
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to create group")
      }

      const group = await res.json()
      toast.success("Group created!")
      router.push(`/dashboard/groups/${group.id}`)
    } catch (err) {
      toast.error("Failed to create group")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create Group</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Add a name and invite members to split expenses with.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Group Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name">Group Name</Label>
          <Input
            id="name"
            placeholder="e.g. Trip to Goa"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-destructive text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* Member Search */}
        <div className="space-y-1.5">
          <Label>Members</Label>
          <MemberSearch
            selected={members}
            onAdd={(user) => setMembers((prev) => [...prev, user])}
            onRemove={(id) => setMembers((prev) => prev.filter((m) => m.id !== id))}
          />
          <p className="text-muted-foreground text-xs">
            {members.length === 0
              ? "You'll be added as the group creator."
              : `${members.length} member${members.length > 1 ? "s" : ""} added`}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Group"}
          </Button>
        </div>
      </form>
    </div>
  )
}
