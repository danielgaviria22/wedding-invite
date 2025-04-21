import Image from "next/image";
import React from "react";
import { FadeInSection } from "./FadeInSection";

export const DressCode = () => (
  <section className="flex flex-col lg:w-1/2 lg:h-[548] justify-center items-center lg:justify-between pt-10 pb-16 px-4 text-red-main">
    <FadeInSection>
      <h2 className="text-2xl font-medium mb-4">Código de vestimenta</h2>
    </FadeInSection>
    <FadeInSection>
      <p className="mb-6">Traje completo o Vestido tipo cóctel</p>
    </FadeInSection>
    <FadeInSection>
      <p className="mb-6 font-semibold text-center">
        Usar colores diferentes a: Rojo, Vinotinto, Azul y Blanco
      </p>
    </FadeInSection>
    <FadeInSection>
      <Image
        className="mb-6"
        src="./images/dressCode.svg"
        alt="colores reservados"
        width={361}
        height={59}
      />
    </FadeInSection>
  </section>
);
