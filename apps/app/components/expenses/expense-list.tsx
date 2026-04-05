import { ReceiptText } from "lucide-react"
import { ExpenseItem } from "@/components/expenses/expense-item"

interface Split {
  user: { id: number; name: string; email: string }
  paid: number
  owed: number
}

interface Expense {
  id: number
  description: string
  expense: number
  split_type: "EQUAL" | "PERCENTAGE" | "EXACT"
  created_by: { id: number; name: string; email: string }
  splits: Split[]
  created_at: string
}

interface ExpenseListProps {
  expenses: Expense[]
  currentUserId?: number
}

export function ExpenseList({ expenses, currentUserId }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <ReceiptText className="text-muted-foreground mb-2 h-8 w-8" />
        <p className="text-sm font-medium">No expenses yet</p>
        <p className="text-muted-foreground text-xs">
          Add an expense to start tracking splits
        </p>
      </div>
    )
  }

  return (
    <ul className="divide-y">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          description={expense.description}
          amount={expense.expense}
          splitType={expense.split_type}
          createdBy={expense.created_by}
          splits={expense.splits}
          createdAt={expense.created_at}
          currentUserId={currentUserId}
        />
      ))}
    </ul>
  )
}
