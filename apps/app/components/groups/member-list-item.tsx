import * as React from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ActionDialog } from "@/components/ui/action-dialog"

interface Member {
  id: number
  name: string
  email: string
}

interface MemberListItemProps {
  member: Member
  isOwner: boolean
  canRemove: boolean
  onRemove: (memberId: number) => void
}

export function MemberListItem({
  member,
  isOwner,
  canRemove,
  onRemove,
}: MemberListItemProps) {
  const [confirmOpen, setConfirmOpen] = React.useState(false)

  return (
    <li className="flex items-center justify-between px-4 py-3">
      <div>
        <p className="text-sm font-medium">{member.name || "No name"}</p>
        <p className="text-muted-foreground text-xs">{member.email}</p>
      </div>
      <div className="flex items-center gap-2">
        {isOwner && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            Owner
          </span>
        )}
        {canRemove && (
          <ActionDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            trigger={
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            }
            title="Remove Member"
            confirmLabel="Remove"
            onConfirm={() => onRemove(member.id)}
          >
            <p className="text-sm text-muted-foreground">
              Are you sure you want to remove{" "}
              <span className="font-medium text-foreground">
                {member.name || member.email}
              </span>{" "}
              from the group?
            </p>
          </ActionDialog>
        )}
      </div>
    </li>
  )
}
