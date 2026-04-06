"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ReactNode } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface ConfirmModalProps {
  /** The element that opens the modal (button, icon, etc.) */
  trigger: ReactNode

  /** Modal window title */
  title?: string

  /** Modal window subtitle / description */
  description?: string

  /** Scrollable body content rendered inside the modal */
  children?: ReactNode

  /** Footer summary content (e.g. totals row) rendered above the action buttons */
  summary?: ReactNode

  /** Label for the confirm/action button */
  actionLabel?: string

  /** Label for the cancel button */
  cancelLabel?: string

  /** Callback fired when the user clicks the confirm/action button */
  onConfirm: () => void

  /** Disabled state for the confirm button */
  confirmDisabled?: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ConfirmModal({
  trigger,
  title = "Are you sure?",
  description = "Please review the details before proceeding.",
  children,
  summary,
  actionLabel = "Continue",
  cancelLabel = "Cancel",
  onConfirm,
  confirmDisabled = false,
}: ConfirmModalProps) {
  return (
    <AlertDialog>

      {/* ── Trigger ── */}
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>

      {/* ── Modal ── */}
      <AlertDialogContent className="max-w-lg">

        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {/* ── Scrollable body (whatever you pass) ── */}
        {children && (
          <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
            {children}
          </div>
        )}

        {/* ── Optional summary row (totals, warnings, etc.) ── */}
        {summary && (
          <div className="border-t pt-4 mt-2">
            {summary}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={confirmDisabled}>
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  )
}