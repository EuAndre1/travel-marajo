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
    <div className={`flex max-w-[42rem] flex-col gap-3 sm:gap-4 ${alignment}`}>
      {eyebrow ? (
        <div className={`flex items-center gap-2.5 ${align === "center" ? "justify-center" : ""}`}>
          <span className={`h-px w-10 sm:w-12 ${dividerColor}`} />
          <span className={`text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-[11px] sm:tracking-[0.34em] ${eyebrowColor}`}>
            {eyebrow}
          </span>
        </div>
      ) : null}

      <h2 className={`text-[1.95rem] font-display leading-[1.08] sm:text-[2.35rem] lg:text-[2.8rem] ${titleColor}`}>
        {title}
      </h2>

      {subtitle ? (
        <p className={`max-w-2xl text-[15px] leading-7 sm:text-[1.02rem] sm:leading-8 ${subtitleColor}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
