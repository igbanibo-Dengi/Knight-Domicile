import React from "react";
import Search from "./Search";

const Hero = () => {
  return (
    <section className="relative h-[90vh] w-full md:h-[70vh]">
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[96%] flex-col items-center justify-center gap-8 rounded-md bg-[url('/images/hero.webp')] bg-cover bg-center bg-no-repeat px-4 text-white">
        <h2 className="z-10 text-center text-4xl font-bold md:text-5xl">
          Building Dreams <br /> One Key at a Time
        </h2>
        <Search />
      </div>
      {/* <div className="absolute h-full w-full top-0 rounded-md bg-black/40" /> */}
    </section>
  );
};

export default Hero;
