import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import * as v from "valibot"
import { SigninSchema } from "./validators/signin-validator";
import { findUserByEmail } from "./resources/user.queries";
import bcrypt from "bcrypt";

const nextAuth = NextAuth({
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
    pages: { signIn: "/auth/sign-in" },
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
                    if (!user.password) return null
                    console.log(user);
                    // Use bcrypt to compare the password
                    const passwordsMatch = await bcrypt.compareSync(password, user.password);

                    if (passwordsMatch) {
                        const { password: _, ...userWithoutPassword } = user;
                        return userWithoutPassword;
                    }
                }
                return null
            }
        })
    ]
});

export const { signIn, auth, signOut, handlers } = nextAuth