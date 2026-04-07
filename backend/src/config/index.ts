import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_private_key: process.env.JWT_PRIVATE_KEY,
  stripe_key: process.env.STRIPE_KEY,
};
