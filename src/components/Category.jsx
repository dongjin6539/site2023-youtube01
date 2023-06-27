import React from 'react';
import { categories } from '../utils/content.js';

const Category = ({ selectCategory, setSelectCategory }) => {
    return (
        <div>
            {categories.map(category => (
                <button
                    style={{ backgroundColor: category.name === selectCategory ? '#8d8b8b' : 'transparent' }}
                    key={category.name}
                    onClick={() => setSelectCategory(category.name)}
                >
                    <span className="icon">{category.icon}</span>
                    <span>{category.name}</span>
                </button>
            ))}
        </div>
    );
};

export default Category;
