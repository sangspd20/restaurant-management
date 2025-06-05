import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string(),
});

const result = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
});

if (!result.success) {
  console.error(result.error);
  throw new Error("Invalid environment variables");
} else {
  //console.log(result.data); // typed and validated!
}

const envConfig = result.data;
export default envConfig;
