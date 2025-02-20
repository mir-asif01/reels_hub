"use client";
import { apiClient } from "@/ApiClient/apiClient";
import FileUpload from "@/components/FileUpload";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { useState } from "react";
import { toast } from "sonner";

export default function UploadPage() {
  const [image, setImage] = useState({
    title: "",
    description: "",
    imageUrl: "",
    thumbnailUrl: "",
  });

  const handleFileUploadSuccess = (res: IKUploadResponse) => {
    console.log(res);
    if (res?.url) {
      setImage({
        ...image,
        imageUrl: res?.url,
      });
    }
    if (res?.thumbnailUrl) {
      setImage({
        ...image,
        thumbnailUrl: res?.thumbnailUrl,
      });
    }
  };

  const handleUploadVideo = async () => {
    console.log(image);
    try {
      const res: any = await apiClient.createImage(image);
      if (res?.success) {
        setImage({
          title: "",
          description: "",
          imageUrl: "",
          thumbnailUrl: "",
        });
        toast.success("Video saved successfully");
      }
    } catch (error) {
      toast.error("Error while saving video information");
    }
  };

  return (
    <div className="container mx-auto py-10 flex justify-center items-center">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h1 className="text-xl font-bold text-center">Upload Video</h1>
        <div className="space-y-2">
          <div className="space-y-2">
            <Label htmlFor="file">Video File</Label>
            <FileUpload onSuccess={handleFileUploadSuccess} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={image?.title}
              onChange={(e) =>
                setImage({
                  ...image,
                  title: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={image?.description}
              onChange={(e) =>
                setImage({
                  ...image,
                  description: e.target.value,
                })
              }
              rows={4}
            />
          </div>

          <Button onClick={handleUploadVideo}>Upload</Button>
        </div>
      </div>
    </div>
  );
}
