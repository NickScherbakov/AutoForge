import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { DEMO_MODE } from '@/lib/demo-data';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Skip auto-redirect in demo mode to let users see the landing page
    if (DEMO_MODE) return;
    
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">AutoForge</span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12">
            The no-code platform for automating business processes with pay-per-success pricing
          </p>

          {DEMO_MODE && (
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border-2 border-yellow-400">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">🎭 Interactive Demo</h3>
              <p className="text-gray-700 mb-4">
                You're viewing a live demo with simulated data. Explore all features without any backend!
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/login"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Try Demo →
                </Link>
                <a
                  href="https://github.com/NickScherbakov/AutoForge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Visual Editor</h3>
              <p className="text-gray-600">
                Build workflows with {DEMO_MODE ? 'a simple' : 'drag-and-drop'} interface
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Pay Per Success</h3>
              <p className="text-gray-600">
                Only pay $0.05-$0.50 when your workflow succeeds
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
              <p className="text-gray-600">
                Connect webhooks, emails, and Telegram
              </p>
            </div>
          </div>

          <div className="space-x-4">
            <Link
              href={DEMO_MODE ? '/login' : '/register'}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {DEMO_MODE ? 'Try Demo' : 'Get Started'}
            </Link>
            
            {!DEMO_MODE && (
              <Link
                href="/login"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
