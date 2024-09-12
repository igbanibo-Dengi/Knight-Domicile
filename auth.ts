import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import db from "./drizzle"
import * as schema from "@/drizzle/schema"
import * as v from "valibot"
import { SigninSchema } from "./validators/signin-validator";
import { findUserByEmail } from "./resources/user.queries";
import bcrypt from "bcrypt";
import { oauthVerrifyEmail } from "./lib/actions/auth/oauthVerifyEmail.actions"
import { OAuthAccountAlreadyLinkedError } from "./lib/custom-errors"

const nextAuth = NextAuth({
    adapter: DrizzleAdapter(db, {
        accountsTable: schema.accounts,
        usersTable: schema.users,
        authenticatorsTable: schema.authenticators,
        sessionsTable: schema.sessions,
        verificationTokensTable: schema.verificationTokens,
    }),
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
    pages: { signIn: "/auth/sign-in" },
    callbacks: {
        jwt({ token, user, trigger, session }) {

            if (trigger === "update") {
                return { ...token, ...session.user }
            }
            // console.log("user:", user);
            if (user?.id) { // User is available during sign-in
                token.id = user.id
                // console.log(user.id);
            }
            if (user?.role) { // User is available during sign-in
                token.role = user.role
                // console.log(user.role);
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id
            session.user.role = token.role
            return session
        },
        // ALLOW ONLY VERIFIED USERS
        signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                return !!profile?.email_verified
            }

            if (account?.provider === "github") {
                return true
            }

            if (account?.provider === "credentials") {
                if (user.emailVerified) {
                    // return true
                }
                return true
            }

            return false
        },
    },
    events: {
        async linkAccount({ user, account }) {
            if (["google", "github"].includes(account.provider)) {
                // verify email of Oauth accounts
                if (user.email) await oauthVerrifyEmail(user.email)
            }
        }
    },
    providers: [
        Credentials({
            async authorize(Credentials) {
                const parsedCredentials = v.safeParse(SigninSchema, Credentials)

                if (parsedCredentials.success) {
                    // carry on with signing in
                    const { email, password } = parsedCredentials.output

                    // look for our user in the database
                    const user = await findUserByEmail(email)
                    if (!user) return null
                    if (!user.password) throw new OAuthAccountAlreadyLinkedError();
                    // console.log(user);
                    // Use bcrypt to compare the password
                    const passwordsMatch = await bcrypt.compareSync(password, user.password);

                    if (passwordsMatch) {
                        const { password: _, ...userWithoutPassword } = user;
                        return userWithoutPassword;
                    }
                }
                return null
            }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true   // default state is false. (error handling for false case is taken care of)
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true   // default state is false. (error handling for false case is taken care of)
        })
    ]
});

export const { signIn, auth, signOut, handlers } = nextAuth