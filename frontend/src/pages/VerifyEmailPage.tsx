import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'

    const token = searchParams.get('token');

    useEffect(() => {
        const verify = async () => {
            if (!token) {
                setStatus('error');
                return;
            }

            try {
                // Your backend URL
                await axios.get(`http://localhost:5000/api/auth/verify-email?token=${token}`);
                setStatus('success');
                
                // Wait 3 seconds then go to login
                setTimeout(() => navigate('/login'), 3000);
            } catch (err) {
                console.error(err);
                setStatus('error');
            }
        };

        verify();
    }, [token, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {status === 'loading' && <p>Verifying your delicacies account...</p>}
            {status === 'success' && (
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-green-600">Success!</h1>
                    <p>Your email is verified. Redirecting you to login...</p>
                </div>
            )}
            {status === 'error' && (
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">Verification Failed</h1>
                    <p>The link is invalid or has expired.</p>
                    <button 
                        onClick={() => navigate('/register')}
                        className="mt-4 text-blue-500 underline"
                    >
                        Try registering again
                    </button>
                </div>
            )}
        </div>
    );
};
