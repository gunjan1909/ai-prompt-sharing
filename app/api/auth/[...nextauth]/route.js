import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/User";
import { connectToDB } from "@utils/database";

//NEXT AUTH DOCS NEEDS TO BE CHECKED TBH, BACKEND CODE FOR NEXT AUTH LOGIN SIGNUP, USING GOOGLEPROVIDER AS THE PROVIDER, THERE CAN BE MORE
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        //check if user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });
        //if not, create new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
