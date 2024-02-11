import { authorize } from "@/services/next-auth/authorize";

const handler = authorize;

export { handler as GET, handler as POST };
