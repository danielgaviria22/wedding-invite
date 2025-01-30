import { notFound } from "next/navigation";
import { LocationMap } from "@/components/LocationMap";
import Form from "@/components/RSVP/Form";
import { TInviteData } from "@/types/invite.types";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id: inviteId } = await searchParams;
  if (!inviteId) {
    return notFound();
  }
  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/invite-list?id=${inviteId}`
  );

  if (!apiRes.ok) {
    return notFound();
  }

  const inviteData = (await apiRes.json()).data as TInviteData;

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <h1>Invitación para {inviteData.invitationRecipient}</h1>
      <h2>Número de invitados: {inviteData.numberOfGuests}</h2>
      <LocationMap
        link={process.env.NEXT_PUBLIC_LOCATION_URL || ""}
        className="w-full h-96"
      />
      <Form />
    </div>
  );
}
