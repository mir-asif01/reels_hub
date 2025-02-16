import mongoose, { model, models, Schema } from "mongoose";

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  controls?: boolean;
  tranformations?: {
    height: number;
    width: number;
    quality: number | undefined;
  };
}

const VIDEO_DIMENSION = {
  height: 1920,
  width: 1080,
} as const;

const videoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    controls: { type: Boolean, default: true },
    tranformations: {
      height: { type: Number, default: VIDEO_DIMENSION.height },
      width: { type: Number, default: VIDEO_DIMENSION.width },
      quality: { type: Number, min: 1, max: 1000 },
    },
  },
  { timestamps: true }
);

export const Video = models?.Video || model<IVideo>("Video", videoSchema);
