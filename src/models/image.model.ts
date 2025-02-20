import mongoose, { model, models, Schema } from "mongoose";

export interface TImage {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  thumbnailUrl: string;
  imageUrl: string;
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

const videoSchema = new Schema<TImage>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    imageUrl: { type: String, required: true },
    controls: { type: Boolean, default: true },
    tranformations: {
      height: { type: Number, default: VIDEO_DIMENSION.height },
      width: { type: Number, default: VIDEO_DIMENSION.width },
      quality: { type: Number, min: 1, max: 1000 },
    },
  },
  { timestamps: true }
);

export const Image = models?.Image || model<TImage>("Image", videoSchema);
