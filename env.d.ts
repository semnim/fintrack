declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_DATABASE_URL: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    RESEND_CLIENT_ID: string;
  }
}
