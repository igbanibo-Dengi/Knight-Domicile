interface ImageData {
  src: string;
  alt: string;
}

interface PropertyInfo {
  squareFeet: string;
  pricePerSquareFeet: string;
  outdoor: string;
  ac: string;
}

interface TourInfo {
  tourAvailability: string;
}

interface PropertyData {
  mainImage: ImageData;
  additionalImages: ImageData[];
  location: string;
  description: string;
  propertyInfo: PropertyInfo;
  tourInfo: TourInfo;
}

const propertyData: PropertyData = {
  mainImage: {
    src: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Main view of 29 Park Dr",
  },
  additionalImages: [
    {
      src: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Kitchen view",
    },
    {
      src: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Bathroom view",
    },
    {
      src: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Bathroom view",
    },

    {
      src: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Bathroom view",
    },
  ],
  location: "Tulia, TX 79088",
  description:
    "Charming 2 bedroom, 1 bathroom home in the heart of Tulia, TX. This cozy abode offers a perfect opportunity for first-time homebuyers, offering a comfortable and affordable living space with plenty of room for outdoor activities.",
  propertyInfo: {
    squareFeet: "912 sqft",
    pricePerSquareFeet: "₦500",
    outdoor: "Patio",
    ac: "Heating and Cooling",
  },
  tourInfo: {
    tourAvailability: "Tomorrow at 11:00AM",
  },
};

export default propertyData;
