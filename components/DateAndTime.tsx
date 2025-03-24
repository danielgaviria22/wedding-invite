import Image from "next/image";
import React from "react";

type TDateAndTimeProps = {
  invitationName: string;
};

export const DateAndTime: React.FC<TDateAndTimeProps> = ({
  invitationName,
}) => (
  <section className="w-full flex flex-col justify-center items-center relative bg-red-darkBg text-red-lightText pt-14 pb-20">
    <h2 className="text-xl font-medium text-center">{invitationName}</h2>
    <p>¡Nos place invitarlos a nuestra boda!</p>
    <div className="flex flex-col justify-center items-center my-5">
      <p className="text-2xl font-medium">Octubre</p>
      <p className="text-7xl font-medium">25</p>
      <div className="w-24 h-[2px] bg-red-lightText mb-[3px]"></div>
      <div className="w-24 h-px bg-red-lightText mb-[3px]"></div>
      <p className="text-2xl font-medium">Sábado</p>
    </div>
    <p className="text-xl font-semibold mb-5">Lluvia de Sobres</p>
    <p className="w-11/12 text-center">
      Los esperamos en este día <span className="font-bold">3:30 pm</span> para
      celebrar con nosotros
    </p>
    <Image
      className="absolute bottom-0"
      src="./images/bigRose.svg"
      alt="big rose"
      width={285}
      height={98}
    />
  </section>
);
