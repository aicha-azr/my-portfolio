import { MongoClient } from 'mongodb';

// Reuse one client across invocations of a warm serverless function
let clientPromise;

export const getCollection = async (name) => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');

  if (!clientPromise) {
    clientPromise = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 }).connect().catch((error) => {
      clientPromise = undefined;
      throw error;
    });
  }

  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || 'portfolio').collection(name);
};

export const getProjectsCollection = () => getCollection('projects');
