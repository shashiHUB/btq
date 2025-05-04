import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  label: string;
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
}

export function Dropdown({ label, items }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { href?: string; onClick?: () => void }) => {
    e.preventDefault();
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      const element = document.querySelector(item.href);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsOpen(false);
  };

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
    >
      <button
        className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-primary transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{label}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-secondary-light rounded-lg shadow-xl z-50 py-1">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href || '#'}
              className="block px-4 py-2 text-gray-300 hover:text-primary hover:bg-secondary/50 transition-colors duration-200"
              onClick={(e) => handleClick(e, item)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}