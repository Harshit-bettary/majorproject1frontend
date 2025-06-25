import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-email/${token}`);
        const data = await response.json();

        if (response.ok) {
          setMessage(' Email verified successfully! Redirecting to login...');
          setTimeout(() => navigate('/login', { replace: true }), 3000);
        } else {
          setMessage(` ${data.message || 'Invalid or expired verification link.'}`);
        }
      } catch (error) {
        setMessage('Verification failed. Please try again later.');
        console.error(error);
      }
    };

    if (token) verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-indigo-700 mb-4">Email Verification</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default VerifyEmail;
