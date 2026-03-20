"use client"

interface AssistantLauncherProps {
  label: string
  text: string
  onClick: () => void
  unreadCount?: number
}

export default function AssistantLauncher({ label, text, onClick, unreadCount = 0 }: AssistantLauncherProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full bg-[#0B1C2C] px-3.5 py-2.5 text-[13px] font-semibold text-white shadow-lg transition hover:bg-[#11263C] sm:px-4 sm:py-3 sm:text-sm"
    >
      <span className="h-2 w-2 rounded-full bg-accent" />
      {text}
      {unreadCount > 0 ? (
        <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white">
          {unreadCount}
        </span>
      ) : null}
    </button>
  )
}
