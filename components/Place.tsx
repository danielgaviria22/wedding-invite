import React from "react";
import { LocationMap } from "./LocationMap";

export const Place = () => (
  <section className="flex flex-col justify-center items-center py-8 px-8 mb-4 text-red-main">
    <h2 className="text-2xl font-medium mb-6">Lugar</h2>
    <LocationMap
      link={process.env.NEXT_PUBLIC_LOCATION_URL || ""}
      className="w-full h-80"
    />
    <h3 className="font-semibold mt-6">Casa Duque</h3>
    <p>Kilometro 16 Autopista Medellín</p>
    <p className="text-sm">El Rosal, Cundinamarca</p>
  </section>
);
