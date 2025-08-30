import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import md5 from 'md5';

const getUser = async (email: string, password: string) => {
  const prisma = new PrismaClient();
  const user = await prisma.users.findFirst({
    where: {
      email,
      password: md5(password)
    }
  });

  prisma.$disconnect();
  return user;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (credentials) {
          const user = await getUser(credentials.email, credentials.password);

          if (user) {
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              title: user.title
            };
          } else {
            return null;
          }
        }
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt' // keep it stateless for now
  },
  pages: {
    signIn: '/login' // custom login page
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
