import ClientReviews from "@/components/home/client-reviews";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <div>
        <Hero />
        <Features />
        <ClientReviews />
      </div>
    </div>
  );
}
