import Button from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Share Your Moments in a Snap
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Compress, share, and enjoy short videos and images with our
              lightning-fast platform. Join millions of creators today!
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild>
              <Link href="#">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
