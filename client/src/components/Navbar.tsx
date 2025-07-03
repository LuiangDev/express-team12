import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-white text-gray-800 px-8 py-4 flex flex-between items-center">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold">
          Mail Generator
        </Link>
      </div>
      <div className="flex items-center mr-6">
        <Link
          to="/"
          className="btn btn-outline btn-sm bg-gray-900 text-white px-8 py-2 rounded-2xl hover:bg-gray-800 transition-colors "
        >
          Login
        </Link>
      </div>

      <div className="flex items-center">
        <Link
          to="/"
          className="btn btn-outline btn-sm text-gray-900 px-6 py-2 rounded-2xl border-1 border-gray-900 hover:bg-gray-200 transition-colors"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
