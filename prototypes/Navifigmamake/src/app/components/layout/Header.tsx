import { Building2, Target } from 'lucide-react';

interface HeaderProps {
  showNav?: boolean;
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

/**
 * 공통 헤더 컴포넌트
 */
export default function Header({ showNav = false, currentRoute, onNavigate }: HeaderProps) {
  return (
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => onNavigate && onNavigate('home')}>
          <div className="relative flex items-center justify-center w-8 h-8 ml-1">
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm group-hover:-translate-y-0.5 transition-transform">
              <defs>
                <linearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
              <ellipse cx="16" cy="22" rx="10" ry="3" stroke="#cbd5e1" strokeWidth="1" />
              <ellipse cx="16" cy="22" rx="6" ry="1.8" stroke="#94a3b8" strokeWidth="1" />
              <ellipse cx="16" cy="22" rx="2.5" ry="0.8" stroke="#64748b" strokeWidth="1.5" />
              <path d="M 4 8 Q 14 5 16 17" stroke="url(#arrowGrad)" strokeWidth="6" strokeLinecap="round" />
              <polygon points="11,15.5 21,14 16.5,24" fill="#1d4ed8" stroke="#1d4ed8" strokeWidth="1" strokeLinejoin="round" />
              <text x="11" y="9.5" fontSize="5.5" fontWeight="900" fill="white" transform="rotate(24 11 9.5)" textAnchor="middle" style={{fontFamily: 'Inter, sans-serif'}}>FIT</text>
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 ml-1">씨드핏</h1>
        </div>

        {showNav && onNavigate && (
          <nav className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentRoute === 'home' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              홈
            </button>
            <button
              onClick={() => onNavigate('search-results')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentRoute === 'search-results' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              검색
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
