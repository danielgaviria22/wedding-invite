import Image from "next/image";
import React from "react";

export const DressCode = () => (
  <section className="flex flex-col justify-center items-center pt-10 pb-16 px-4 text-red-main">
    <h2 className="text-2xl font-medium mb-4">Código de vestimenta</h2>
    <p className="mb-6">Traje completo o Vestido tipo cóctel</p>
    <Image
      className="mb-6"
      src="./images/dressCode.svg"
      alt="colores reservados"
      width={361}
      height={59}
    />
    <p className="mb-6 font-semibold">Azul, Rojo, Vinotinto y Blanco</p>
  </section>
);
