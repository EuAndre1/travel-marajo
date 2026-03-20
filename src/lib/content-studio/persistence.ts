import { db } from "@/database/client"
import {
  contentStudioSurfaces,
  mergeContentStudioState,
  type ContentStudioState,
  type ContentStudioSurface,
} from "@/lib/content-studio/resolvers"

type AdminContentOverrideRow = {
  surface: string
  entity_key: string
  payload: unknown
}

const ADMIN_CONTENT_OVERRIDE_TABLE = "AdminContentOverride"
const DEFAULT_ENTITY_KEY = "global"

function isTableMissingError(error: unknown) {
  if (!(error instanceof Error)) {
    return false
  }

  return error.message.includes(`relation "${ADMIN_CONTENT_OVERRIDE_TABLE}" does not exist`)
}

function serializePayload(payload: unknown) {
  return JSON.stringify(payload)
}

async function ensureAdminContentOverrideTable() {
  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "${ADMIN_CONTENT_OVERRIDE_TABLE}" (
      id BIGSERIAL PRIMARY KEY,
      surface TEXT NOT NULL,
      entity_key TEXT NOT NULL,
      payload JSONB NOT NULL,
      updated_by_email TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(surface, entity_key)
    );
  `)

  await db.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "idx_admin_content_override_surface"
    ON "${ADMIN_CONTENT_OVERRIDE_TABLE}" (surface);
  `)
}

export async function loadPersistedContentStudioState(): Promise<ContentStudioState> {
  try {
    const rows = await db.$queryRaw<AdminContentOverrideRow[]>`
      SELECT surface, entity_key, payload
      FROM "AdminContentOverride"
      WHERE entity_key = ${DEFAULT_ENTITY_KEY}
    `

    const overrideMap = rows.reduce<Partial<Record<ContentStudioSurface, unknown>>>(
      (accumulator, row) => {
        if (!contentStudioSurfaces.includes(row.surface as ContentStudioSurface)) {
          return accumulator
        }

        accumulator[row.surface as ContentStudioSurface] = row.payload
        return accumulator
      },
      {},
    )

    return mergeContentStudioState(overrideMap)
  } catch (error) {
    if (!isTableMissingError(error)) {
      console.error("[content-studio] failed to load persisted content state", error)
    }

    return mergeContentStudioState({})
  }
}

export async function savePersistedContentStudioSurface(
  surface: ContentStudioSurface,
  payload: unknown,
  updatedByEmail: string | null,
) {
  await ensureAdminContentOverrideTable()

  const serializedPayload = serializePayload(payload)

  await db.$executeRaw`
    INSERT INTO "AdminContentOverride" ("surface", "entity_key", "payload", "updated_by_email")
    VALUES (${surface}, ${DEFAULT_ENTITY_KEY}, CAST(${serializedPayload} AS jsonb), ${updatedByEmail})
    ON CONFLICT ("surface", "entity_key")
    DO UPDATE SET
      "payload" = EXCLUDED."payload",
      "updated_by_email" = EXCLUDED."updated_by_email",
      "updated_at" = NOW()
  `
}
