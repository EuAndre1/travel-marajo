import { db } from "@/database/client"
import type { MediaAssetItem, MediaAssetType } from "@/lib/media-library/shared"

type MediaAssetRow = {
  id: string
  url: string
  type: MediaAssetType
  filename: string
  alt: string | null
  createdAt: Date | string
  uploadedBy: string
}

const MEDIA_ASSET_TABLE = "MediaAsset"

function mapMediaAssetRow(row: MediaAssetRow): MediaAssetItem {
  return {
    id: row.id,
    url: row.url,
    type: row.type,
    filename: row.filename,
    alt: row.alt,
    createdAt:
      row.createdAt instanceof Date
        ? row.createdAt.toISOString()
        : new Date(row.createdAt).toISOString(),
    uploadedBy: row.uploadedBy,
  }
}

export async function ensureMediaAssetTable() {
  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "${MEDIA_ASSET_TABLE}" (
      "id" TEXT PRIMARY KEY,
      "url" TEXT NOT NULL,
      "type" TEXT NOT NULL,
      "filename" TEXT NOT NULL,
      "alt" TEXT,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "uploadedBy" TEXT NOT NULL
    );
  `)

  await db.$executeRawUnsafe(`
    DO $$
    DECLARE
      existing_constraint TEXT;
    BEGIN
      SELECT c.conname
      INTO existing_constraint
      FROM pg_constraint c
      JOIN pg_class t ON t.oid = c.conrelid
      JOIN pg_namespace n ON n.oid = t.relnamespace
      WHERE t.relname = '${MEDIA_ASSET_TABLE}'
        AND c.contype = 'c'
        AND pg_get_constraintdef(c.oid) LIKE '%"type"%'
      LIMIT 1;

      IF existing_constraint IS NOT NULL THEN
        EXECUTE format('ALTER TABLE "%s" DROP CONSTRAINT %I', '${MEDIA_ASSET_TABLE}', existing_constraint);
      END IF;

      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint c
        JOIN pg_class t ON t.oid = c.conrelid
        WHERE t.relname = '${MEDIA_ASSET_TABLE}'
          AND c.conname = '${MEDIA_ASSET_TABLE}_type_check'
      ) THEN
        EXECUTE 'ALTER TABLE "${MEDIA_ASSET_TABLE}" ADD CONSTRAINT "${MEDIA_ASSET_TABLE}_type_check" CHECK ("type" IN (''image'',''video''))';
      END IF;
    END $$;
  `)

  await db.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "idx_media_asset_created_at"
    ON "${MEDIA_ASSET_TABLE}" ("createdAt" DESC);
  `)
}

export async function listMediaAssets() {
  await ensureMediaAssetTable()

  const rows = await db.$queryRaw<MediaAssetRow[]>`
    SELECT "id", "url", "type", "filename", "alt", "createdAt", "uploadedBy"
    FROM "MediaAsset"
    ORDER BY "createdAt" DESC
  `

  return rows.map(mapMediaAssetRow)
}

export async function findMediaAssetById(id: string) {
  await ensureMediaAssetTable()

  const rows = await db.$queryRaw<MediaAssetRow[]>`
    SELECT "id", "url", "type", "filename", "alt", "createdAt", "uploadedBy"
    FROM "MediaAsset"
    WHERE "id" = ${id}
    LIMIT 1
  `

  return rows[0] ? mapMediaAssetRow(rows[0]) : null
}

export async function createMediaAsset(input: Omit<MediaAssetItem, "createdAt">) {
  await ensureMediaAssetTable()

  await db.$executeRaw`
    INSERT INTO "MediaAsset" ("id", "url", "type", "filename", "alt", "uploadedBy")
    VALUES (${input.id}, ${input.url}, ${input.type}, ${input.filename}, ${input.alt}, ${input.uploadedBy})
    ON CONFLICT ("id") DO UPDATE
    SET
      "url" = EXCLUDED."url",
      "type" = EXCLUDED."type",
      "filename" = EXCLUDED."filename",
      "alt" = EXCLUDED."alt",
      "uploadedBy" = EXCLUDED."uploadedBy"
  `

  return findMediaAssetById(input.id)
}

export async function deleteMediaAssetRecord(id: string) {
  await ensureMediaAssetTable()

  await db.$executeRaw`
    DELETE FROM "MediaAsset"
    WHERE "id" = ${id}
  `
}
