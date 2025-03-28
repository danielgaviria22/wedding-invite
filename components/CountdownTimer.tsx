"use client";

import React, { useEffect, useState } from "react";
import { calculateTimeLeft } from "@/utils/timer";
import { TTimeLeft } from "@/types/invite.types";
import Image from "next/image";

export const CountdownTimer: React.FC<{ targetDate: Date }> = ({
  targetDate,
}) => {
  const [timeLeft, setTimeLeft] = useState<TTimeLeft>(
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const labels = {
    months: "Meses",
    days: "Días",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
  };

  return (
    <section className="text-center px-4 py-10 flex flex-col items-center">
      <h2 className="text-red-main text-xl mb-6">Solo faltan</h2>
      <hr className="w-full border-red-main mb-2" />
      <div className="flex justify-center text-red-main text-xl">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="mx-2">
            <div className="text-4xl font-medium">
              {String(value).padStart(2, "0")}
            </div>
            <div className="text-sm">{labels[unit as keyof TTimeLeft]}</div>
          </div>
        ))}
      </div>
      <hr className="w-full border-red-main mt-2 mb-6" />
      <p className="italic text-sm text-red-main">Los esperamos</p>
      <Image
        src="./images/shortName.svg"
        alt="Daniel y Sebastian"
        width={189}
        height={27}
      />
    </section>
  );
};
