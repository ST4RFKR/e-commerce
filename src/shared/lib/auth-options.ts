import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { compare, hashSync } from "bcryptjs";
import { UserRole } from "@/app/generated/prisma";
import prisma from "../../../prisma/prisma-client";
import { headers } from "next/headers";


export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name || profile.given_name,
                    email: profile.email,
                    image: profile.picture,
                    role: 'USER' as UserRole,
                };
            },
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }

            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }
                const values = {
                    email: credentials.email,
                }
                const findUser = await prisma.user.findFirst({
                    where: values
                })
                if (!findUser) {
                    return null;
                }
                const isPasswordValid = await compare(credentials.password, findUser.password)
                if (!isPasswordValid) {
                    return null
                }
                if (!findUser.verified) {
                    return null
                }
                return {
                    id: findUser.id,
                    email: findUser.email,
                    name: findUser.fullName,
                    role: findUser.role
                }
            }

        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async signIn({ user, account }) {
            const headersList = await headers();
            const cookieHeader = headersList.get('cookie');
            const cartToken = cookieHeader
                ?.split('; ')
                .find(row => row.startsWith('cartToken='))
                ?.split('=')[1];

            try {
                if (account?.provider === 'credentials') {
                    if (cartToken && user.id) {
                        await prisma.cart.updateMany({
                            where: { token: cartToken },
                            data: { userId: Number(user.id) }
                        });
                    }
                    return true;
                }

                if (!user.email) {
                    return false;
                }

                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { provider: account?.provider, providerId: account?.providerAccountId },
                            { email: user.email },
                        ],
                    },
                });

                if (findUser) {
                    await prisma.user.update({
                        where: {
                            id: findUser.id,
                        },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId,
                        },
                    });
                    return true;
                }

                await prisma.user.create({
                    data: {
                        email: user.email,
                        fullName: user.name || 'User #' + user.id,
                        provider: account?.provider,
                        providerId: account?.providerAccountId,
                        password: hashSync(user.email, 10),
                        verified: new Date(),
                        role: 'USER' as UserRole,
                    },
                });
                if (cartToken && user.email) {
                    const findUser = await prisma.user.findFirst({
                        where: { email: user.email }
                    });

                    if (findUser) {
                        await prisma.cart.updateMany({
                            where: { token: cartToken },
                            data: { userId: findUser.id }
                        });
                    }
                }
                return true;
            } catch (error) {
                console.error('Error [Sign-in]', error);
                return false;
            }
        },
        async jwt({ token }) {
            if (!token.email) {
                return token
            }

            const user = await prisma.user.findFirst({
                where: {
                    email: token.email as string
                }
            })
            if (user) {
                token.id = String(user.id)
                token.role = user.role
                token.email = user.email
                token.fullName = user.fullName
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id
                session.user.role = token.role as string
            }
            return session
        }
    }

}
