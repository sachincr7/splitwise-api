"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/stores/auth.store"

type SplitType = "EQUAL" | "PERCENTAGE"

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

function displayName(member: Member) {
  return member.name || member.email
}

export default function CreateExpensePage() {
  const { id: groupId } = useParams<{ id: string }>()
  const router = useRouter()
  const { token, user } = useAuthStore()

  const [group, setGroup] = React.useState<Group | null>(null)
  const [isLoadingGroup, setIsLoadingGroup] = React.useState(true)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const [description, setDescription] = React.useState("")
  const [amount, setAmount] = React.useState("")
  const [paidByUserId, setPaidByUserId] = React.useState<number | null>(null)
  const [splitType, setSplitType] = React.useState<SplitType>("EQUAL")
  const [percentages, setPercentages] = React.useState<Record<number, string>>({})

  React.useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/groups/${groupId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (!res.ok) throw new Error()
        const data: Group = await res.json()
        setGroup(data)
        setPaidByUserId(user?.id ?? data.members[0]?.id ?? null)
        initPercentages(data.members)
      } catch {
        toast.error("Failed to load group")
      } finally {
        setIsLoadingGroup(false)
      }
    }
    fetchGroup()
  }, [groupId, token, user?.id])

  const initPercentages = (members: Member[]) => {
    if (members.length === 0) return
    const equal = parseFloat((100 / members.length).toFixed(2))
    const last = parseFloat((100 - equal * (members.length - 1)).toFixed(2))
    const init: Record<number, string> = {}
    members.forEach((m, i) => {
      init[m.id] = String(i === members.length - 1 ? last : equal)
    })
    setPercentages(init)
  }

  const totalAmount = parseFloat(amount) || 0

  const percentageTotal = React.useMemo(
    () =>
      Object.values(percentages).reduce(
        (sum, p) => sum + (parseFloat(p) || 0),
        0
      ),
    [percentages]
  )

  const percentageValid = Math.abs(percentageTotal - 100) < 0.01

  const perPersonAmount =
    group && totalAmount > 0 ? totalAmount / group.members.length : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!group || !user || paidByUserId === null) return

    if (!description.trim()) return toast.error("Description is required")
    if (totalAmount <= 0) return toast.error("Amount must be greater than 0")
    if (splitType === "PERCENTAGE" && !percentageValid)
      return toast.error("Percentages must sum to 100%")

    const amounts =
      splitType === "PERCENTAGE"
        ? group.members.map((m) => ({
            user_id: m.id,
            amount: parseFloat(
              ((parseFloat(percentages[m.id] || "0") / 100) * totalAmount).toFixed(2)
            ),
          }))
        : undefined

    setIsSubmitting(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: description.trim(),
          split_type: splitType,
          expense: totalAmount,
          group_id: group.id,
          created_by: user.id,
          paid_by: [{ user_id: paidByUserId, amount: totalAmount }],
          ...(amounts && { amounts }),
        }),
      })

      if (!res.ok) throw new Error()
      toast.success("Expense added!")
      router.push(`/dashboard/groups/${groupId}`)
    } catch {
      toast.error("Failed to add expense")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingGroup) {
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
        <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Add Expense</h1>
          <p className="text-muted-foreground text-xs">{group.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="e.g. Dinner at Pizza Place"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Amount + Paid By */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="paid-by">Paid by</Label>
            <select
              id="paid-by"
              value={paidByUserId ?? ""}
              onChange={(e) => setPaidByUserId(Number(e.target.value))}
              className="border-input bg-background text-foreground focus-visible:ring-ring flex h-9 w-full rounded-lg border px-3 py-1 text-sm shadow-xs focus-visible:ring-3 focus-visible:outline-none"
            >
              {group.members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.id === user?.id ? "You" : displayName(m)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Split Type Toggle */}
        <div className="space-y-1.5">
          <Label>Split</Label>
          <div className="flex gap-2">
            {(["EQUAL", "PERCENTAGE"] as SplitType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSplitType(type)}
                className={`rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors ${
                  splitType === type
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground hover:bg-accent"
                }`}
              >
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Split Breakdown */}
        <div className="rounded-lg border">
          <div className="flex items-center justify-between border-b px-4 py-2.5">
            <span className="text-sm font-medium">Split between</span>
            {splitType === "PERCENTAGE" && (
              <span
                className={`text-xs font-medium ${
                  percentageValid ? "text-green-600" : "text-destructive"
                }`}
              >
                {percentageTotal.toFixed(1)}% / 100%
              </span>
            )}
          </div>
          <ul className="divide-y">
            {group.members.map((member) => {
              const pct = parseFloat(percentages[member.id] || "0")
              const memberAmount =
                splitType === "EQUAL"
                  ? perPersonAmount
                  : (pct / 100) * totalAmount

              return (
                <li
                  key={member.id}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="text-sm">
                    {member.id === user?.id ? "You" : displayName(member)}
                  </span>
                  <div className="flex items-center gap-3">
                    {splitType === "PERCENTAGE" ? (
                      <div className="flex items-center gap-1.5">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          value={percentages[member.id] ?? ""}
                          onChange={(e) =>
                            setPercentages((prev) => ({
                              ...prev,
                              [member.id]: e.target.value,
                            }))
                          }
                          className="h-7 w-20 text-right text-sm"
                        />
                        <span className="text-muted-foreground text-sm">%</span>
                      </div>
                    ) : null}
                    <span
                      className={`text-sm font-medium tabular-nums ${
                        totalAmount === 0 ? "text-muted-foreground" : ""
                      }`}
                    >
                      ₹{memberAmount.toFixed(2)}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              (splitType === "PERCENTAGE" && !percentageValid)
            }
          >
            {isSubmitting ? "Adding..." : "Add Expense"}
          </Button>
        </div>
      </form>
    </div>
  )
}
