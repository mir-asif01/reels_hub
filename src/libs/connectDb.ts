import mongoose from "mongoose";

const mongo_uri = process.env.MONGO_URI;

if (!mongo_uri) {
  throw new Error("MongoDB connection URI not found");
}

let cached_connection = global.mongoose;
if (!cached_connection) {
  cached_connection = global.mongoose = { connection: null, promise: null };
}

export const connectDb = async () => {
  if (cached_connection.connection) {
    return cached_connection.connection;
  }

  if (!cached_connection.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 9,
    };

    cached_connection.promise = mongoose
      .connect(mongo_uri, opts)
      .then(() => mongoose.connection);
  }
  try {
    cached_connection.connection = await cached_connection.promise;
  } catch (error) {
    throw new Error("Error while connectiong to database");
  }
  return cached_connection.connection;
};
