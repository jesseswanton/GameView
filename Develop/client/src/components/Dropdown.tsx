import  { useState } from 'react';
import { HiFilter } from 'react-icons/hi';

// Dropdown component
interface DropdownProps {
  items: string[];
  onItemSelect: (item: string) => void;
}

const Dropdown = ({ items, onItemSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown" onClick={toggleDropdown}>
      <HiFilter size={30} fill='white' className="dropdown-btn"></HiFilter>
      {isOpen && (
        <div>
          <ul className="dropdown-menu">
            {items.map((item, index) => (
              <li key={index} onClick={() => onItemSelect(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
