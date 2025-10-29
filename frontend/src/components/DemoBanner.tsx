import { DEMO_MODE } from '@/lib/demo-data';

export default function DemoBanner() {
  if (!DEMO_MODE) return null;

  return (
    <div className="bg-yellow-400 text-black py-2 px-4 text-center text-sm font-semibold shadow-md">
      🎭 DEMO MODE - This is a showcase version with simulated data. 
      <a 
        href="https://github.com/NickScherbakov/AutoForge" 
        target="_blank" 
        rel="noopener noreferrer"
        className="ml-2 underline hover:text-blue-800"
      >
        View Full Project →
      </a>
    </div>
  );
}
