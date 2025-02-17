import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Image, Zap, Share2, Shield, Globe } from "lucide-react";

const features = [
  {
    title: "Video Compression",
    description:
      "Compress your videos without losing quality for faster sharing.",
    icon: Video,
  },
  {
    title: "Image Optimization",
    description:
      "Optimize your images for web and mobile with our smart algorithms.",
    icon: Image,
  },
  {
    title: "Lightning Fast",
    description: "Experience blazing-fast upload and download speeds.",
    icon: Zap,
  },
  {
    title: "Easy Sharing",
    description:
      "Share your content across multiple platforms with a single click.",
    icon: Share2,
  },
  {
    title: "Privacy Controls",
    description: "Advanced privacy settings to keep your content secure.",
    icon: Shield,
  },
  {
    title: "Global Reach",
    description: "Connect with creators and viewers from around the world.",
    icon: Globe,
  },
];

export default function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white dark:bg-gray-900">
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
