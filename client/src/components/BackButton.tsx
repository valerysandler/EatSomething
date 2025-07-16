import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center text-blue-600 hover:underline mb-4"
    >
      <span className="mr-1">←</span> Back
    </button>
  );
}
