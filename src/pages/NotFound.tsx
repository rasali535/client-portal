import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
            <Link to="/" className="text-blue-500 hover:text-blue-700">
                Return to Home
            </Link>
        </div>
    );
};

export default NotFound;
