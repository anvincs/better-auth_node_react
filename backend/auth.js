import { betterAuth } from "better-auth";
import { anonymous, phoneNumber } from "better-auth/plugins";

import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const auth = betterAuth({
  database: createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
  plugins: [
    anonymous({
      emailDomainName: "example.com",
    }),
    phoneNumber({
      sendOTP: ({ phoneNumber, code }, request) => {
        // Implement sending OTP code via SMS
      },
    }),
  ],
  trustedOrigins: ["http://localhost:5173"],
});
