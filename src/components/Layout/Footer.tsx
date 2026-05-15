import { Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-600 text-sm">
              Built with <Heart className="inline h-4 w-4 text-red-500" /> for the IBM Bob Hackathon
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Demonstrating IBM Bob's multi-modal workflow capabilities
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/IBM/bob"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="text-sm font-medium">IBM Bob</span>
            </a>
            <a
              href="https://github.com/hansasabin/IBM-Hackathon-BOBBY"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="text-sm font-medium">View Source</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Made with Bob
