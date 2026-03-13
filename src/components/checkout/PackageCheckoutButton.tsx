"use client"

import { useState } from "react"

interface PackageCheckoutButtonProps {
  slug: string
  label: string
  className?: string
}

export default function PackageCheckoutButton({
  slug,
  label,
  className,
}: PackageCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/stripe/package-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })

      const data = await response.json()
      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data?.error || "Falha ao iniciar o checkout")
      }

      window.location.href = data.checkoutUrl
    } catch (error) {
      console.error(error)
      setIsLoading(false)
      alert("Não foi possível iniciar o checkout agora. Tente novamente.")
    }
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? "Redirecionando..." : label}
    </button>
  )
}
