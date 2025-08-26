import { Link } from 'react-router-dom';

export default function FooterLinksSection({ title, links }) {
  return (
    <div>
      <h4 className="font-bold text-white mb-4 sm:mb-6 text-lg sm:text-xl">{title}</h4>
      <ul className="space-y-3 sm:space-y-4">
        {links.map((link, i) => (
          <li key={i}>
            <Link 
              to="#" 
              className="text-gray-300 hover:text-green-400 hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200 text-sm sm:text-base block"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 