import 'dotenv/config';
import {defineConfig} from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw Error("Could not find DATABASE_URL");
export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
