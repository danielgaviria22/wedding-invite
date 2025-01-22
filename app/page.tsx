import { LocationMap } from "@/components/LocationMap";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <LocationMap
        link={process.env.NEXT_PUBLIC_LOCATION_URL || ""}
        className="w-full h-96"
      />
    </div>
  );
}
