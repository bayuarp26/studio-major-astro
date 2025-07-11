import { MongoClient } from 'mongodb'
import { config } from './env'

const uri = config.MONGODB_URI

console.log('MongoDB URI check:', {
  uri: uri ? 'DEFINED' : 'UNDEFINED',
  length: uri ? uri.length : 0,
  nodeEnv: process.env.NODE_ENV
});

if (!uri) {
  console.warn('MONGODB_URI is not defined in environment variables. Database features will not work.');
}

const options = {}

let client
let clientPromise: Promise<MongoClient> | null = null

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options)
      globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
