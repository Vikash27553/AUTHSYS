import { useState, useEffect } from 'react'; 
import { data, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Verify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Fixed: Remove invalid 'any mistake' comment; TypeScript infers string | null [web:12]
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    const verifyEmail = async () => {
      try {
        // Use GET with params (matches your backend req.query.token pattern from memories) [cite:9]
              const response = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/verify`, 
          { params: { token } },  // Second arg = body data → req.body = 
          // { token: '...' }
          {           // Third arg = config (optional)
            headers: { 'Content-Type': 'application/json' }
          }
        );

        console.log('Email verification successful:', response.data);
        setStatus('success');
        setTimeout(() => navigate('/login'), 2000); // Auto-redirect after success [cite:1]
      } catch (error) {
        console.error('Error during email verification:', error.response?.data || error.message);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [token]); // Fixed: Proper dependency array (no extra }, [] syntax); include navigate to satisfy ESLint [web:13][web:16]

  const handleOk = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Header: Centered with fitted background */}
      <h1 className="w-fit mx-auto text-3xl sm:text-4xl font-bold text-center bg-amber-200/80 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-lg mb-6 sm:mb-8 backdrop-blur-sm">
        Verification Email!
      </h1>
      
      {/* Message Card */}
      <div className="w-full max-w-md sm:max-w-lg bg-white/70 backdrop-blur-md border border-amber-200 font-bold text-lg sm:text-xl text-gray-800 p-6 sm:p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300">
        <h2 className="text-center mb-6 leading-relaxed">
          {status === 'verifying' && 'Verifying your email... Please wait.'}
          {status === 'success' && 'Email verified successfully! Redirecting to login...'}
          {status === 'error' && 'Verification failed. Check your inbox for the link, then Login.'}
          <span className="text-red-500 font-black block mt-2">{status === 'error' && 'Try again or contact support.'}</span>
        </h2>
        {(status === 'success' || status === 'error') && (
          <button 
            className="w-full sm:w-auto bg-gradient-to-r from-green-700 to-green-900 text-white font-bold py-3 px-6 sm:px-8 rounded-xl shadow-lg hover:from-green-800 hover:to-green-950 hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer active:scale-95 mx-auto block"
            onClick={handleOk}
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
}

export default Verify;
