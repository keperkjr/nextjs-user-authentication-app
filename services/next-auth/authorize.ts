import { authOptions } from './authOptions';
import NextAuth from "next-auth/next";

export const authorize = NextAuth(authOptions);