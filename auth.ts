import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  secret: process.env.AUTH_SECRET,
  theme: {
    brandColor: "#1ED2AF",
    logo: "/logo.png",
    buttonText: "#ffffff",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async jwt({ token, account, profile }) {
      // Add account info to token when signing in
      if (account) {
        token.accessToken = account.access_token;
        token.provider = "github";
      }
      return token;
    },
    async session({ session, token }) {
      // Add token data to session
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      return session;
    }
  },
});
