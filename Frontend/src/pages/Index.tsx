
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L20.2161 7V17L12 22L3.78394 17V7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-800">Your Logo</span>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Button asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Welcome to Our Platform
              </h1>
              <p className="text-lg text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Reactus, Typescriptum,
              et utuntur ad systema authentificationis modernum cum login et signup fluido experientia.
              </p>
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <Button asChild size="lg">
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild size="lg">
                      <Link to="/signup">Get Started</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/login">Sign in</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="w-full max-w-md p-1 bg-white rounded-lg shadow-xl">
                <div 
                  className="rounded-md overflow-hidden aspect-square" 
                  style={{ 
                    backgroundImage: "url('/wave-bg.svg')", 
                    backgroundSize: "cover" 
                  }}
                >
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; 2025 Restfull Service, Andy Melvin. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
