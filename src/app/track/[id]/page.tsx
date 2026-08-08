// Page 5 — Track Status (/track/[id])
// Vertical status timeline: submitted -> under review -> in progress -> resolved
import StatusTimeline from "@/components/track/StatusTimeline";

export default function TrackPage({ params }: { params: { id: string } }) {
  return <StatusTimeline reportId={params.id} />;
}
