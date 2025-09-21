/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ["res.cloudinary.com"], // ✅ allow Cloudinary images
  },
  api: {
    bodyParser: false, // disable body parsing for webhook route
  },
};

export default nextConfig;
