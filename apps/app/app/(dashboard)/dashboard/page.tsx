import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export default function DashboardPage() {
  return (
    <div>
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
    </div>
  )
}
