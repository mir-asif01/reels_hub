"use client";

import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import { useState } from "react";

type FileUploadProps = {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "video";
};

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType,
}: FileUploadProps) {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: { message: string }) => {
    setError(err?.message);
    setUploading(false);
  };

  const handleSuccess = (res: IKUploadResponse) => {
    setUploading(false);
    setError(null);
    onSuccess(res);
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  const handleProgress = (e: ProgressEvent) => {
    if (e.lengthComputable && onProgress) {
      const percentCompleted = (e.loaded / e.total) * 100;
      onProgress(Math.round(percentCompleted));
    }
  };
  const validateFile = (file: File) => {
    if (fileType === "video") {
      console.log("video");
      if (!file?.type?.startsWith("video/")) {
        setError("Please upload a valid video file");
        return false;
      }
      if (file?.size > 100 * 1024 * 1024) {
        setError("Video size must be less than 100MB");
        return false;
      }
    } else {
      const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validImageTypes.includes(file?.type)) {
        setError("Please upload a valid image file(jpeg, png and webp)");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return false;
      }
    }
    return true;
  };

  return (
    <div className="my-2 border border-gray-300 rounded-md p-2">
      <IKUpload
        fileName={fileType === "video" ? "image" : "video"}
        isPrivateFile={false}
        useUniqueFileName={true}
        accept={fileType === "video" ? "video/*" : "image/*"}
        validateFile={validateFile}
        folder={fileType === "video" ? "/videos" : "/images"}
        onError={handleError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        onUploadStart={handleStartUpload}
      />

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-primary">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-green-500">Uploading...</span>
        </div>
      )}

      {error && <div className="text-error text-sm">{error}</div>}
    </div>
  );
}
