// import { Counter } from "@/components/Counter";
import ExploreHomes from "@/components/ExploreHomes";
import Hero from "@/components/Hero";
import NewlyListedHomes from "@/components/NewlyListedHomes";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="flex flex-col gap-4">
        <ExploreHomes />
        <div className="mt-10">
          <NewlyListedHomes />
        </div>
      </div>
      {/* <Counter /> */}
    </main>
  );
}
