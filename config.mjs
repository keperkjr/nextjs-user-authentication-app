const config = {
    API: process.env.NODE_ENV === 'production' ? '' : "http://localhost:3000/api",
    NEXTAUTH_SECRET: "J01271992K07281987",
};

export default config;