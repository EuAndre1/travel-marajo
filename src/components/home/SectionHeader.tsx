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
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left"
  const titleColor = tone === "light" ? "text-white" : "text-[#0B1C2C]"
  const subtitleColor = tone === "light" ? "text-white/72" : "text-slate-600"
  const eyebrowColor = tone === "light" ? "text-accent-light" : "text-primary/80"
  const dividerColor = tone === "light" ? "bg-white/30" : "bg-primary/20"

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          <span className={`h-px w-12 ${dividerColor}`} />
          <span className={`text-[11px] font-semibold uppercase tracking-[0.34em] ${eyebrowColor}`}>
            {eyebrow}
          </span>
        </div>
      ) : null}

      <h2 className={`text-3xl font-display leading-tight sm:text-4xl lg:text-[2.8rem] ${titleColor}`}>
        {title}
      </h2>

      {subtitle ? (
        <p className={`text-base leading-7 sm:text-lg ${subtitleColor}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
