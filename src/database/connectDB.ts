import { MongoClient } from '@db/mongo';

const client = new MongoClient();

const dbString =
	'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8';

await client.connect(dbString);

export const db = client.database('deno_auth');
