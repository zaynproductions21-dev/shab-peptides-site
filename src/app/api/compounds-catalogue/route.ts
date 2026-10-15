import { NextResponse } from "next/server";
import { getCompounds } from "@/data/compounds";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Thin JSON proxy over getCompounds() so the research-pathway quiz can fetch
 * the live catalogue (prices, stock, slugs) client-side when the result step
 * renders. Keeps the ISR cache in getCompounds() doing the heavy lifting.
 */
export async function GET() {
  try {
    const compounds = await getCompounds();
    return NextResponse.json({ compounds }, {
      headers: { "Cache-Control": "s-maxage=120, stale-while-revalidate=600" },
    });
  } catch (err) {
    return NextResponse.json(
      { compounds: [], error: err instanceof Error ? err.message : "Failed to load catalogue" },
      { status: 502 },
    );
  }
}
