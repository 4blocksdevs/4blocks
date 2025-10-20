import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found - 4Blocks",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-6 p-4">
        <h1 className="text-4xl font-bold text-black">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block bg-[#9ED95D] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#8BC34A] transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
