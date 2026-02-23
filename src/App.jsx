import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseList from './components/CourseList';
import AuthPage from './components/AuthPage';

function MainContent() {
  const { currentPage } = useApp();

  // Auth page has its own full-screen layout (no Navbar)
  if (currentPage === 'auth') {
    return <AuthPage />;
  }

  // Landing Page
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <main>
        <Hero />
        <CourseList />
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-slate-950 py-12 mt-20 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-slate-500">
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">EduSphere</h4>
            <p className="text-sm leading-relaxed">
              Making quality education accessible and simple for everyone, everywhere.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li className="hover:text-blue-500 cursor-pointer">All Courses</li>
              <li className="hover:text-blue-500 cursor-pointer">Become a Mentor</li>
              <li className="hover:text-blue-500 cursor-pointer">Help Center</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm text-white w-full focus:ring-2 focus:ring-blue-600 outline-none"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-slate-900 text-center">
          <p className="text-slate-600 text-xs">© 2026 EduSphere. Designed for React Beginners.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
