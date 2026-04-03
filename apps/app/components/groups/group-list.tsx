import { useRouter } from "next/navigation"
import { GroupCard } from "@/components/groups/group-card"

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

interface GroupListProps {
  groups: Group[]
  currentUserId?: number
}

export function GroupList({ groups, currentUserId }: GroupListProps) {
  const router = useRouter()

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          id={group.id}
          name={group.name}
          owner={group.owner}
          memberCount={group.members.length}
          currentUserId={currentUserId}
          onClick={(id) => router.push(`/dashboard/groups/${id}`)}
        />
      ))}
    </div>
  )
}
