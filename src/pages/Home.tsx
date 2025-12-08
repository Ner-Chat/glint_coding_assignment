import {useNavigate} from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Glint by Ner Chat Coding Assignment
      </h1>
      <button
        onClick={() => navigate("/challenge")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
