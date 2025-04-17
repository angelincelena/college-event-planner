import React, { useEffect, useState } from 'react';
import '../Styles/CategoryFilter.css';

// Interface to define the structure of a Category object
interface Category {
  category_id: number;
  name: string;
}

// Interface to define the expected props for CategoryFilter component
interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

// Functional Component - CategoryFilter
const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  // State to store the list of fetched categories
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories from backend when component first mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5002/api/categories');
        const data = await res.json();
        if (res.ok) {
          // Update state with fetched categories
          setCategories(data.categories);
        } else {
          console.error('Failed to fetch categories:', data.message);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories(); // Invoke fetch function
  }, []); // Empty dependency array => Runs only once when component mounts

  return (
    <>
      {/* Dropdown to select a category */}
      <select
        value={selectedCategory}             // Controlled input linked to parent's selectedCategory
        onChange={(e) => onCategoryChange(e.target.value)}  // Notify parent about category change
        className="category-filter"
      >
        <option value="All">All</option> {/* Default option to show all events */}
        
        {/* Dynamically render fetched categories */}
        {categories.map((category) => (
          <option key={category.category_id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default CategoryFilter;