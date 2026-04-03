"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ActionDialogProps {
  /** Element that opens the dialog */
  trigger: React.ReactNode
  /** Dialog heading */
  title: string
  /** Dialog body */
  children: React.ReactNode
  /** Positive CTA label */
  confirmLabel: string
  /** Negative CTA label — defaults to "Cancel" */
  cancelLabel?: string
  /** Whether the confirm button should be disabled */
  confirmDisabled?: boolean
  /** Called when the positive CTA is clicked */
  onConfirm: () => void
  /** Called when the negative CTA is clicked (parent handles extra teardown) */
  onCancel?: () => void
  /** Controlled open state */
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ActionDialog({
  trigger,
  title,
  children,
  confirmLabel,
  cancelLabel = "Cancel",
  confirmDisabled = false,
  onConfirm,
  onCancel,
  open,
  onOpenChange,
}: ActionDialogProps) {
  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {children}

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm} disabled={confirmDisabled}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
