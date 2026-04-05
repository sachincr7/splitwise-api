import { Receipt } from "lucide-react"

interface Split {
  user: { id: number; name: string; email: string }
  paid: number
  owed: number
}

interface ExpenseItemProps {
  description: string
  amount: number
  splitType: "EQUAL" | "PERCENTAGE" | "EXACT"
  createdBy: { id: number; name: string; email: string }
  splits: Split[]
  createdAt: string
  currentUserId?: number
}

function displayName(user: { name: string; email: string }) {
  return user.name || user.email
}

export function ExpenseItem({
  description,
  amount,
  splitType,
  createdBy,
  splits,
  createdAt,
  currentUserId,
}: ExpenseItemProps) {
  const payer = splits.find((s) => s.paid > 0)
  const payerName =
    payer?.user.id === currentUserId ? "You" : displayName(payer?.user ?? createdBy)

  const mySplit = splits.find((s) => s.user.id === currentUserId)

  const date = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  })

  return (
    <li className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
          <Receipt className="text-muted-foreground h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium">{description}</p>
          <p className="text-muted-foreground text-xs">
            {payerName} paid · {date}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-xs font-medium uppercase">
          {splitType.toLowerCase()}
        </span>
        <div className="text-right">
          <p className="text-sm font-semibold">₹{amount.toFixed(2)}</p>
          {mySplit && (
            <p className="text-muted-foreground text-xs">
              you owe ₹{mySplit.owed.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </li>
  )
}
