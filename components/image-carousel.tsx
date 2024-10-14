"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
  onImageClick: (index: number) => void;
}

export function ImageCarousel({ images, onImageClick }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0,
    );
  };

  return (
    <div className="relative h-[400px] w-full">
      <Image
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        fill
        style={{ objectFit: "cover" }}
        className="cursor-pointer rounded-lg"
        onClick={() => onImageClick(currentIndex)}
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 transform bg-black bg-opacity-50 text-white"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous image</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 transform bg-black bg-opacity-50 text-white"
        onClick={goToNext}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next image</span>
      </Button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 transform rounded bg-black bg-opacity-50 px-2 py-1 text-white">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
