import { redirect } from "next/navigation";

export default async function TrackIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const targetId = resolvedSearchParams?.id || "JSV-2026-8942-X9K";

  redirect(`/track/${encodeURIComponent(targetId)}`);
}
