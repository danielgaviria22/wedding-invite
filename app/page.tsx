import { notFound } from "next/navigation";
import Form from "@/components/RSVP/Form";
import { TGuestInfo, TInviteData } from "@/types/invite.types";
import { Title } from "@/components/Title";
import { Separator } from "@/components/Separator";
import { DateAndTime } from "@/components/DateAndTime";
import { Place } from "@/components/Place";
import { DressCode } from "@/components/DressCode";
import { CountdownTimer } from "@/components/CountdownTimer";
import { FadeInSection } from "@/components/FadeInSection";

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

  const weddingDate = new Date("2025-10-25T20:30:00");

  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-beige">
      <Title />
      <Separator />
      <DateAndTime invitationName={inviteData.invitationRecipient} />
      <Separator rotated />
      <div className="flex flex-col lg:flex-row lg:gap-10 lg:items-start">
        <Place />
        <div className="hidden lg:flex h-[548px] w-px bg-red-main"></div>
        <FadeInSection className="flex flex-col lg:hidden items-center px-4 text-red-main">
          <Separator />
          <p className="mt-8 mb-2 text-center">
            ¡Estamos emocionado de compartir y celebrar este momento tan
            especial con nosotros!
          </p>
          <p className="font-bold mb-8 text-center">
            Recuerda, los niños se quedan en casa
          </p>
          <Separator rotated />
        </FadeInSection>
        <DressCode />
      </div>
      <Separator />
      <Form
        numberOfGuests={inviteData.numberOfGuests}
        inviteId={inviteData.id}
        initialGuests={confirmedGuests}
      />
      <Separator />
      <div className="hidden flex-col lg:flex items-center text-red-main max-w-2xl mx-auto mt-10">
        <Separator />
        <p className="mt-8 mb-2 text-center">
          ¡Estamos emocionado de compartir y celebrar este momento tan especial
          con nosotros!
        </p>
        <p className="font-bold mb-8 text-center">
          Recuerda, los niños se quedan en casa
        </p>
        <Separator rotated />
      </div>
      <CountdownTimer targetDate={weddingDate} />
      <Separator rotated />
    </div>
  );
}
