interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: "left" | "center"
  tone?: "dark" | "light"
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start"
  const titleColor = tone === "light" ? "text-white" : "text-[#0B1C2C]"
  const subtitleColor = tone === "light" ? "text-white/70" : "text-slate-600"
  const eyebrowColor = tone === "light" ? "text-white/60" : "text-primary/70"

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <span className={`text-xs uppercase tracking-[0.3em] ${eyebrowColor}`}>
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`text-3xl sm:text-4xl font-display leading-tight ${titleColor}`}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`text-base sm:text-lg ${subtitleColor} max-w-2xl`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
