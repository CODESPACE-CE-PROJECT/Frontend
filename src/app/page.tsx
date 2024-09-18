"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="mb-10 text-3xl font-bold">Welcome to the Home Page</div>

      <nav className="flex space-x-6">

        <Link href="/login">
          <span className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-500 transition duration-300">
            Login
          </span>
        </Link>

        <Link href="/courses">
          <span className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition duration-300">
            Courses
          </span>
        </Link>

        <Link href="/homeworkspace">
          <span className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-500 transition duration-300">
            Home Workspace
          </span>
        </Link>
      </nav>
    </div>
  );
}
