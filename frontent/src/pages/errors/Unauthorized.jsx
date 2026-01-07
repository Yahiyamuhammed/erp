import React from 'react';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#f3f4f6]">
      
      {/* --- Ambient Background (Matches Starline Theme) --- */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-200/50 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-200/50 rounded-full blur-[100px]" />
      
      <div className="relative z-10 w-full max-w-lg p-4 text-center">
        
        {/* --- Glass Card --- */}
        <div className="bg-white/60 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-3xl p-10 md:p-12">
          
          {/* Icon Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                <ShieldAlert className="w-12 h-12 text-red-500" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md">
                <Lock className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Access Denied</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            You do not have permission to view this page. <br />
            It looks like you are trying to access a restricted area.
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate(-1)} // Go back to previous page
              className="w-full bg-[#D4F34A] hover:bg-[#cbe846] text-gray-900 font-bold py-3.5 rounded-xl shadow-lg shadow-[#d4f34a]/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
            
            <button 
              onClick={() => navigate('/login')} 
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-xl border border-gray-200 transition-colors"
            >
              Log in as different user
            </button>
          </div>

        </div>
        
        <p className="mt-8 text-sm text-gray-400">Error Code: 401 Unauthorized</p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;