"use client"

import Editable from "@/components/admin/Editable"
import {
  useResolvedHomeAuthorityContent,
  useResolvedHomeContent,
} from "@/components/content/ContentOverridesProvider"

export interface HomeTrustStripInlineEditing {
  enabled: boolean
  canEdit: boolean
  onTrustStripLabelChange: (value: string) => void
  onTrustItemChange: (index: number, value: string) => void
}

export default function HomeTrustStrip({
  inlineEditing,
}: {
  inlineEditing?: HomeTrustStripInlineEditing
}) {
  const { hero } = useResolvedHomeContent()
  const authority = useResolvedHomeAuthorityContent()
  const canInlineEdit = Boolean(inlineEditing?.enabled && inlineEditing.canEdit)

  return (
    <section className="border-b border-slate-200/70 bg-white">
      <div className="tm-shell py-4 sm:py-5">
        <div className="grid gap-3 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center">
          <div>
            <Editable
              value={authority.trustStripLabel}
              onChange={inlineEditing?.onTrustStripLabelChange}
              disabled={!canInlineEdit}
              label="Linha curta de confianca abaixo do hero"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/80 sm:text-[11px] sm:tracking-[0.32em]">
                {authority.trustStripLabel}
              </p>
            </Editable>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
            {hero.trustItems.map((item, index) => (
              <div
                key={`${index}-${item}`}
                className="flex items-start gap-2.5 rounded-[1rem] bg-slate-50/80 px-3.5 py-3 text-sm leading-6 text-slate-600"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <Editable
                  type="textarea"
                  value={item}
                  onChange={(value) => inlineEditing?.onTrustItemChange(index, value)}
                  disabled={!canInlineEdit}
                  label={`Ponto de confianca ${index + 1}`}
                  className="w-full"
                >
                  <span>{item}</span>
                </Editable>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
