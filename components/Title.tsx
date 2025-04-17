import Image from "next/image";
import React from "react";

export const Title = () => {
  return (
    <section className="flex w-full py-8 justify-center relative bg-beige">
      <Image
        className="animate-fade w-1/2"
        src="./images/names.svg"
        alt="Daniel Gaviria & Sebastian Casas"
        width={209}
        height={89}
      />
      <Image
        className="absolute left-0 -bottom-12 lg:-bottom-24 z-20 animate-fade-in-left w-1/6"
        src="./images/blueRose.svg"
        alt="blue rose"
        width={72}
        height={150}
      />
      <Image
        className="absolute right-0 -bottom-12 lg:-bottom-24 z-20 animate-fade-in-right w-1/6"
        src="./images/pinkRose.svg"
        alt="pink rose"
        width={72}
        height={150}
      />
    </section>
  );
};
