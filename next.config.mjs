/** @type {import('next').NextConfig} */
import config from "./config.mjs";

const nextConfig = {
    env: Object.assign({}, config)
};

export default nextConfig;
