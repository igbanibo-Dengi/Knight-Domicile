import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const cities = [
    { name: 'Ikeja, Lagos State', image: 'https://images.pexels.com/photos/2409953/pexels-photo-2409953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Abuja, FCT', image: 'https://images.pexels.com/photos/5137664/pexels-photo-5137664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Port Harcourt, Rivers State', image: 'https://images.pexels.com/photos/14417165/pexels-photo-14417165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Ibadan, Oyo State', image: 'https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Enugu, Enugu State', image: 'https://images.pexels.com/photos/13249340/pexels-photo-13249340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Kano, Kano State', image: 'https://images.pexels.com/photos/2549596/pexels-photo-2549596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Abeokuta, Ogun State', image: 'https://images.pexels.com/photos/14054631/pexels-photo-14054631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Benin City, Edo State', image: 'https://images.pexels.com/photos/1167021/pexels-photo-1167021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Calabar, Cross River State', image: 'https://images.pexels.com/photos/2129796/pexels-photo-2129796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Kaduna, Kaduna State', image: 'https://images.pexels.com/photos/5997997/pexels-photo-5997997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Jos, Plateau State', image: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
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
                            height={300}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                            <h2 className="text-xl font-semibold mb-2">{city.name}</h2>
                            <button className="flex items-center text-sm bg-white text-black px-3 py-1 rounded">
                                View <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>
                ))}

                {reviews.map((review, index) => (
                    <div key={review.name} className="bg-muted p-4 rounded-lg">
                        <h3 className="font-semibold">{review.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{review.location}</p>
                        <p className="text-sm">{review.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}