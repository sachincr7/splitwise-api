import { MemberListItem } from "@/components/groups/member-list-item"

interface Member {
  id: number
  name: string
  email: string
}

interface MemberListProps {
  members: Member[]
  ownerId: number
  currentUserId?: number
  onRemove: (memberId: number) => void
}

export function MemberList({
  members,
  ownerId,
  currentUserId,
  onRemove,
}: MemberListProps) {
  const isOwner = currentUserId === ownerId

  return (
    <div className="rounded-lg border">
      <div className="border-b px-4 py-3">
        <h2 className="text-sm font-medium">Members ({members.length})</h2>
      </div>
      <ul className="divide-y">
        {members.map((member) => (
          <MemberListItem
            key={member.id}
            member={member}
            isOwner={member.id === ownerId}
            canRemove={isOwner && member.id !== currentUserId}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </div>
  )
}
