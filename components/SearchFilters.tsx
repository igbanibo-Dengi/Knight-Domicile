"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import * as Slider from "@radix-ui/react-slider";
import { states } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Filter, SlidersHorizontalIcon } from "lucide-react";

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 50000000,
  ]);
  const [selectedState, setSelectedState] = useState(
    searchParams.get("state") || "all",
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (searchTerm) params.set("search", searchTerm);
    else params.delete("search");

    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());

    if (selectedState && selectedState !== "all")
      params.set("state", selectedState);
    else params.delete("state");

    router.replace(`/properties?${params.toString()}`);
  }, [searchTerm, priceRange, selectedState, router, searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) params.set("search", searchTerm);
    else params.delete("search");
    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());
    if (selectedState && selectedState !== "all")
      params.set("state", selectedState);
    else params.delete("state");
    router.replace(`/properties?${params.toString()}`);
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  return (
    <div className="mb-8 rounded-lg">
      <div className="flex grid-cols-2 items-center gap-4 lg:grid lg:grid-cols-4 lg:gap-6">
        <Drawer>
          <DrawerTrigger className="lg:hidden" asChild>
            <Button variant={"outline"} size={"icon"} className="p-2">
              <SlidersHorizontalIcon className="size-10" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="">
            <div className="space-y-2 p-8">
              <Label>Price Range</Label>
              <Slider.Root
                className="relative flex h-5 w-full touch-none select-none items-center"
                value={priceRange}
                onValueChange={handlePriceChange}
                min={0}
                max={50000000}
                step={10000}
                minStepsBetweenThumbs={1}
              >
                <Slider.Track className="relative h-[3px] grow rounded-full bg-slate-200">
                  <Slider.Range className="absolute h-full rounded-full bg-red-400" />
                </Slider.Track>
                <Slider.Thumb
                  className="h-5bg-primary block w-5 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Min price"
                />
                <Slider.Thumb
                  className="h-5bg-primary block w-5 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Max price"
                />
              </Slider.Root>
              <div className="mt-2 flex justify-between text-sm">
                <span>Min: ₦{priceRange[0].toLocaleString()}</span>
                <span>Max: ₦{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
            <div className="px-8">
              <Input
                id="search"
                placeholder="Search by location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="mt-8 space-y-2 px-8">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4 flex items-center justify-between p-8">
              <DrawerClose>
                <Button className="md:w-full" onClick={handleSearch}>
                  Search
                </Button>
              </DrawerClose>

              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
        <div className="w-full space-y-2">
          <Input
            id="search"
            placeholder="Search by location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="hidden space-y-2 lg:block">
          <Slider.Root
            className="relative flex h-5 w-full touch-none select-none items-center"
            value={priceRange}
            onValueChange={handlePriceChange}
            min={0}
            max={50000000}
            step={10000}
            minStepsBetweenThumbs={1}
          >
            <Slider.Track className="relative h-[3px] grow rounded-full bg-slate-200">
              <Slider.Range className="absolute h-full rounded-full bg-primary" />
            </Slider.Track>
            <Slider.Thumb
              className="block h-5 w-5 rounded-full bg-white shadow-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Min price"
            />
            <Slider.Thumb
              className="block h-5 w-5 rounded-full bg-white shadow-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Max price"
            />
          </Slider.Root>
          <div className="mt-2 flex justify-between text-sm">
            <span>Min: ₦{priceRange[0].toLocaleString()}</span>
            <span>Max: ₦{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
        <div className="hidden space-y-2 lg:block">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger id="state">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="md:w-full" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
}
