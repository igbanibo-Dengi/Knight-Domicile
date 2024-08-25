import ExploreHomes from "@/components/Explore";
import Hero from "@/components/Hero";
import NewlyListedHomes from "@/components/NewlyListed";
import Image from "next/image";

export default function Home() {
  return <main>
    <Hero />
    <ExploreHomes />
    <NewlyListedHomes />
  </main>;
}
