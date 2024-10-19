import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const cities = [
  {
    name: "Ikeja, Lagos State",
    url: "/properties?minPrice=0&maxPrice=50000000&state=lagos",
    image: "/images/cities/lagos2.jpg",
  },
  {
    name: "Abuja, FCT",
    url: "/properties?minPrice=0&maxPrice=50000000&state=fedral+capital+territory",
    image: "/images/cities/abuja.jpg",
  },
  {
    name: "Port Harcourt, Rivers State",
    url: "/properties?minPrice=0&maxPrice=50000000&state=rivers",
    image: "/images/cities/port-harcourt.png",
  },
  {
    name: "Ibadan, Oyo State",
    url: "/properties?minPrice=0&maxPrice=50000000&state=oyo",
    image: "/images/cities/ibadan.avif",
  },
  {
    name: "Enugu, Enugu State",
    url: "/properties?minPrice=0&maxPrice=50000000&state=enugu",
    image: "/images/cities/enugu.jpg",
  },
  // { name: 'Kano, Kano State', url: "/properties?minPrice=0&maxPrice=1000000&state=rivers", image: '/images/cities/kano.jpg' },
  // { name: 'Abeokuta, Ogun State', url: "/properties?minPrice=0&maxPrice=1000000&state=rivers", image: '/images/cities/ogun.jpg' },
  // { name: 'Benin City, Edo State', url: "/properties?minPrice=0&maxPrice=1000000&state=rivers", image: '/images/cities/benin.png' },
  // { name: 'Calabar, Cross River State', url: "/properties?minPrice=0&maxPrice=1000000&state=rivers", image: '/images/cities/calabar.png' },
  // { name: 'Kaduna, Kaduna State', url: "/properties?minPrice=0&maxPrice=1000000&state=rivers", image: '/images/cities/Kaduna.jpg' },
  // { name: 'Jos, Plateau State', url: "/properties?minPrice=0&maxPrice=1000000&state=rivers", image: '/images/cities/jos.jpg' },
];

const reviews = [
  {
    name: "John Constatine",
    location: "lagos",
    text: "I just moved to the neighborhood 2 years ago and love it! It's a great mix of families, seniors and...",
  },
  {
    name: "Tyrion Lannister",
    location: "Owerri",
    text: "A good mix of young adults/good night life as well as families and family friendly activities...",
  },
];

export default function ExploreHomes() {
  return (
    <div className="container mx-auto mt-8 px-4 py-8">
      <h1 className="mb-2 text-center text-3xl font-bold">
        Explore Our Properties
      </h1>
      <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
        Explore our curated listings, discover authentic neighborhood photos,
        read resident reviews, and gain local insights to find the perfect home
        for you.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cities.map((city, index) => (
          <div
            key={city.name}
            className={`relative overflow-hidden rounded-lg ${index === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
          >
            <Image
              src={city.image}
              alt={city.name}
              width={400}
              height={200}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h2 className="mb-2 text-xl font-semibold">{city.name}</h2>
              <Button asChild variant={"secondary"}>
                <Link href={city.url}>
                  View <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}

        {/* {reviews.map((review, index) => (
                    <div key={review.name} className="bg-muted p-4 rounded-lg">
                        <h3 className="font-semibold">{review.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{review.location}</p>
                        <p className="text-sm">{review.text}</p>
                    </div>
                ))} */}
      </div>
    </div>
  );
}
