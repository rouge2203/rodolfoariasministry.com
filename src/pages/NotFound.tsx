import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4">
      <div className="max-w-md text-center">
        <div className="text-6xl font-bold text-indigo-600 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page not found
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Sorry, we couldn't find the page you're looking for. The page may have
          been moved or doesn't exist.
        </p>
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ← Go back home
          </Link>
          <div className="text-sm text-gray-400">
            or{" "}
            <Link
              to="/contact"
              className="text-indigo-600 hover:text-indigo-500"
            >
              contact us
            </Link>{" "}
            if you need help
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="text-9xl opacity-10">🏠</div>
        <p className="text-sm text-gray-400 mt-4">
          "For I know the plans I have for you," declares the Lord, "plans to
          prosper you and not to harm you, to give you hope and a future." -
          Jeremiah 29:11
        </p>
      </div>
    </div>
  );
};

export default NotFound;
