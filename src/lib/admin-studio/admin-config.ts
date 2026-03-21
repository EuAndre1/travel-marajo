/**
 * HOW TO ADD NEW ADMIN:
 *
 * 1. Add email to ADMIN_EMAILS array
 * 2. Save file
 * 3. Restart dev server or redeploy
 * 4. User logs in again
 *
 * Admin access is controlled ONLY by email.
 */

export const ADMIN_EMAILS = [
  "travelmarajo@gmail.com",
  "ahc...@gmail.com",
].map((email) => email.trim().toLowerCase())

function getEnvAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
}

export function getAdminEmails(): string[] {
  return Array.from(new Set([...ADMIN_EMAILS, ...getEnvAdminEmails()]))
}

export function isAdminEmail(email?: string | null) {
  if (!email) return false
  return getAdminEmails().includes(email.toLowerCase())
}
