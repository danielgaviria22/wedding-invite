import { notFound } from "next/navigation";
import { LocationMap } from "@/components/LocationMap";
import Form from "@/components/RSVP/Form";
import { TGuestInfo, TInviteData } from "@/types/invite.types";
import { Title } from "@/components/Title";
import { Separator } from "@/components/Separator";
import { DateAndTime } from "@/components/DateAndTime";
import { Place } from "@/components/Place";

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
  const apiRes2 = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/invite-validation?id=${inviteId}`
  );

  if (!apiRes2.ok) {
    return notFound();
  }
  const reponse = await apiRes2.json();

  const confirmedGuests = reponse.data?.confirmedGuests.map(
    (guest: Array<string>) => ({
      name: guest[0],
      phone: guest[1],
      email: guest[2],
      transport: guest[3],
      food: guest[4],
      drink: guest[5],
    })
  ) as Array<TGuestInfo>;

  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-beige">
      <Title />
      <Separator />
      <DateAndTime invitationName={inviteData.invitationRecipient} />
      <Separator rotated />
      <Place />
      <h1>Invitación para {inviteData.invitationRecipient}</h1>
      <h2>Número de invitados: {inviteData.numberOfGuests}</h2>
      <LocationMap
        link={process.env.NEXT_PUBLIC_LOCATION_URL || ""}
        className="w-full h-96"
      />
      <Form
        numberOfGuests={inviteData.numberOfGuests}
        inviteId={inviteData.id}
        initialGuests={confirmedGuests}
      />
    </div>
  );
}
