export const runtime = "nodejs"

export async function GET() {
  return Response.json(
    {
      error: "Flight search is temporarily unavailable.",
      details: "Duffel integration is not enabled for this environment.",
    },
    { status: 503 }
  )
}
