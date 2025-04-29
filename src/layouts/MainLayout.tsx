
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Home, Star, User } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-omni-mint h-8 w-8 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold">OmniLearn</h1>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              <li><Link to="/dashboard" className="hover:text-omni-mint transition-colors">Dashboard</Link></li>
              <li><Link to="/quiz" className="hover:text-omni-mint transition-colors">Quizzes</Link></li>
              <li><Link to="/workspace" className="hover:text-omni-mint transition-colors">Workspace</Link></li>
            </ul>
          </nav>
          <Link to="/profile" className="bg-omni-lavender h-9 w-9 rounded-full flex items-center justify-center">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="md:hidden bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav>
            <ul className="flex items-center justify-around">
              <li>
                <Link to="/dashboard" className="flex flex-col items-center p-2">
                  <Home className="w-5 h-5" />
                  <span className="text-xs mt-1">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="flex flex-col items-center p-2">
                  <Star className="w-5 h-5" />
                  <span className="text-xs mt-1">Quiz</span>
                </Link>
              </li>
              <li>
                <Link to="/workspace" className="flex flex-col items-center p-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs mt-1">Learn</span>
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex flex-col items-center p-2">
                  <User className="w-5 h-5" />
                  <span className="text-xs mt-1">Profile</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
