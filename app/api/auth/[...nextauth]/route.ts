import GoogleProvider from "next-auth/providers/google";
import NextAuth, {getServerSession, SessionStrategy} from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";
import usersRepository from "@/db/users/repository";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 24 * 60 * 60, // 1 day
  },
  pages: {
    signIn: '/login', // Custom sign-in page
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials) {
        if (!credentials) return null
        const {email, password} = credentials

        const user = await usersRepository.findByMail(email);

        if (user && bcrypt.compareSync(password, user.passwordHash)) {
          return {id: user.id.toFixed(), email: user.email, image: user.image};
        } else {
          throw new Error('Invalid credentials')
        }
      },
    }),
  ]
}
export const getAuth = () => getServerSession(authOptions)
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}
