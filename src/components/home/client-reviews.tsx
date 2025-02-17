import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    name: "Alice Johnson",
    image: "/placeholder.svg?height=100&width=100",
    review:
      "This platform has revolutionized how I share my content. The compression tools are amazing!",
    stars: 5,
  },
  {
    name: "Bob Smith",
    image: "/placeholder.svg?height=100&width=100",
    review:
      "I love how easy it is to share my videos across different social media platforms. Great job!",
    stars: 4,
  },
  {
    name: "Charlie Brown",
    image: "/placeholder.svg?height=100&width=100",
    review:
      "The image optimization feature has saved me so much time. Highly recommended!",
    stars: 5,
  },
  {
    name: "Diana Martinez",
    image: "/placeholder.svg?height=100&width=100",
    review:
      "Fast, efficient, and user-friendly. This platform has everything I need for my content creation.",
    stars: 4,
  },
];

export default function ClientReviews() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          What Our Users Say
        </h2>
        <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <Image
                        src={review.image || "/placeholder.svg"}
                        alt={review.name}
                        width={100}
                        height={100}
                        className="rounded-full mb-4"
                      />
                      <h3 className="text-lg font-semibold mb-2">
                        {review.name}
                      </h3>
                      <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
                        {review.review}
                      </p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.stars
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
