import { AuthOptions, User as SessionUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUserAsync } from '@/repository/userRepository'

export const authOptions: AuthOptions = {
	session: {
		strategy: "jwt"
	},
	providers: [
		CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },            
			async authorize(credentials, request) : Promise<SessionUser> {
                const dbUser = await authenticateUserAsync(credentials?.email  || '', credentials?.password || '' );            
                const sessionUser = {...dbUser, id: ''} as SessionUser;
                return sessionUser;
			}
		})
	],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}