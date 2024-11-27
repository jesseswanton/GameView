import  { useState } from 'react';

// Dropdown component
interface DropdownProps {
  label: string;
  items: string[];
  onItemSelect: (item: string) => void;
}

const Dropdown = ({ label, items, onItemSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown" onClick={toggleDropdown}>
      <button className="dropdown-btn">{label}</button>
      {isOpen && (
        <ul className="dropdown-menu">
          {items.map((item, index) => (
            <li key={index} onClick={() => onItemSelect(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
