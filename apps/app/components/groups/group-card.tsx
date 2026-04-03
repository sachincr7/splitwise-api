import { UsersIcon } from "lucide-react"

interface GroupCardProps {
  id: number
  name: string
  owner: { id: number; name: string; email: string }
  memberCount: number
  currentUserId?: number
  onClick: (id: number) => void
}

export function GroupCard({
  id,
  name,
  owner,
  memberCount,
  currentUserId,
  onClick,
}: GroupCardProps) {
  const ownerLabel =
    owner.id === currentUserId ? "You" : owner.name || owner.email

  return (
    <button
      onClick={() => onClick(id)}
      className="rounded-lg border bg-card p-4 text-left transition-colors hover:bg-accent w-full"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-muted-foreground mt-0.5 text-xs">
            {ownerLabel} · Owner
          </p>
        </div>
        <span className="text-muted-foreground flex items-center gap-1 text-xs">
          <UsersIcon className="h-3.5 w-3.5" />
          {memberCount}
        </span>
      </div>
    </button>
  )
}
