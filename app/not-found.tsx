import Image from "next/image";

function NotFoundPage() {
  return (
    <section className="w-full h-lvh flex justify-center items-center bg-blue-darkest">
      <div className="flex flex-col gap-12 items-center">
        <Image
          src="./images/blueNames.svg"
          alt="Daniel Gaviria y Sebastian Casas"
          width={256}
          height={96}
        />
        <div className="relative flex flex-col items-center w-80">
          <div className="absolute w-full h-[2px] bottom-5 bg-blue-light"></div>
          <div className="absolute w-full h-px bottom-6 bg-blue-light"></div>
          <Image
            className="z-10"
            src="./images/bigRedRose.svg"
            alt="rose"
            width={113}
            height={93}
          />
        </div>
        <div className="text-center text-blue-light">
          <h2 className="font-medium text-2xl">¡Invitación no valida!</h2>
          <p>Contáctanos para solucionar el problema.</p>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
