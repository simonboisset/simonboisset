import { Storage } from '@google-cloud/storage';

let storage: Storage;

declare global {
  var __storage__: Storage;
}

if (process.env.NODE_ENV === 'production') {
  storage = getClient();
} else {
  if (!global.__storage__) {
    global.__storage__ = getClient();
  }
  storage = global.__storage__;
}

function getClient() {
  const client = new Storage();
  return client;
}

export default storage;
