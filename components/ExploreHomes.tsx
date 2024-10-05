import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link';
import { Button } from './ui/button';

const cities = [
    { name: 'Ikeja, Lagos State', url: "/properties?minPrice=0&maxPrice=1000000&state=lagos", image: '/images/cities/lagos2.jpg' },
    { name: 'Abuja, FCT', url: "/properties?minPrice=0&maxPrice=1000000&state=fedral+capital+territory", image: '/images/cities/abuja.jpg' },
    { name: 'Port Harcourt, Rivers State', url: "/properties?minPrice=0&maxPrice=1000000&state=rivers", image: '/images/cities/port-harcourt.png' },
    { name: 'Ibadan, Oyo State', url: "/properties?minPrice=0&maxPrice=1000000&state=oyo", image: '/images/cities/ibadan.avif' },
    { name: 'Enugu, Enugu State', url: "/properties?minPrice=0&maxPrice=1000000&state=enugu", image: '/images/cities/enugu.jpg' },
    // { name: 'Kano, Kano State', url: "/properties?minPrice=0&maxPrice=1000000&state=rivers", image: '/images/cities/kano.jpg' },
    // { name: 'Abeokuta, Ogun State', url: "/properties?minPrice=0&maxPrice=1000000&state=rivers", image: '/images/cities/ogun.jpg' },
    // { name: 'Benin City, Edo State', url: "/properties?minPrice=0&maxPrice=1000000&state=rivers", image: '/images/cities/benin.png' },
    // { name: 'Calabar, Cross River State', url: "/properties?minPrice=0&maxPrice=1000000&state=rivers", image: '/images/cities/calabar.png' },
    // { name: 'Kaduna, Kaduna State', url: "/properties?minPrice=0&maxPrice=1000000&state=rivers", image: '/images/cities/Kaduna.jpg' },
    // { name: 'Jos, Plateau State', url: "/properties?minPrice=0&maxPrice=1000000&state=rivers", image: '/images/cities/jos.jpg' },
];


const reviews = [
    {
        name: 'John Constatine',
        location: 'lagos',
        text: 'I just moved to the neighborhood 2 years ago and love it! It\'s a great mix of families, seniors and...',
    },
    {
        name: 'Tyrion Lannister',
        location: 'Owerri',
        text: 'A good mix of young adults/good night life as well as families and family friendly activities...',
    },
]

export default function ExploreHomes() {
    return (
        <div className="container mx-auto px-4 py-8 mt-8">
            <h1 className="text-3xl font-bold text-center mb-2">Explore Our Properties</h1>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explore our curated listings, discover authentic neighborhood photos, read resident reviews, and gain local insights to find the perfect home for you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cities.map((city, index) => (
                    <div key={city.name} className={`relative rounded-lg overflow-hidden ${index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}>
                        <Image
                            src={city.image}
                            alt={city.name}
                            width={400}
                            height={200}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                            <h2 className="text-xl font-semibold mb-2">{city.name}</h2>
                            <Button asChild variant={"secondary"}>
                                <Link href={city.url}>
                                    View <ChevronRight className="w-4 h-4 ml-1" />
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
    )
}