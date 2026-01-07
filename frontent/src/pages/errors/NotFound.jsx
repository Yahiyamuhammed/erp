import React from 'react';
import { FileQuestion, Home, SearchX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#f3f4f6]">
      
      {/* --- Ambient Background --- */}
      <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-[#D4F34A]/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-200/50 rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-lg p-4 text-center">
        
        {/* --- Glass Card --- */}
        <div className="bg-white/60 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-3xl p-10 md:p-12">
          
          {/* Icon Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                <SearchX className="w-12 h-12 text-gray-400" />
              </div>
              <div className="absolute -top-2 -right-2 bg-[#D4F34A] p-2 rounded-full shadow-md rotate-12">
                <FileQuestion className="w-6 h-6 text-gray-900" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <h1 className="text-7xl font-bold text-gray-900 mb-2 tracking-tighter">404</h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Oops! The page you are looking for doesn't exist or has been moved. 
          </p>

          {/* Actions */}
          <button 
            onClick={() => navigate('/dashboard')} 
            className="w-full bg-[#D4F34A] hover:bg-[#cbe846] text-gray-900 font-bold py-3.5 rounded-xl shadow-lg shadow-[#d4f34a]/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Back to Dashboard
          </button>

        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;