import React from "react";
import { LocationMap } from "./LocationMap";
import { FadeInSection } from "./FadeInSection";

export const Place = () => (
  <section className="flex flex-col justify-center lg:w-1/2 items-center py-8 px-8 mb-4 text-red-main">
    <FadeInSection>
      <h2 className="text-2xl font-medium mb-6">Lugar</h2>
    </FadeInSection>
    <LocationMap
      link={process.env.NEXT_PUBLIC_LOCATION_URL || ""}
      className="w-full max-w-80 h-80"
    />
    <FadeInSection className="flex flex-col justify-center items-center">
      <h3 className="font-semibold mt-6">Casa Duque</h3>
      <p>Kilometro 16 Autopista Medellín</p>
      <p className="text-sm">El Rosal, Cundinamarca</p>
    </FadeInSection>
  </section>
);
