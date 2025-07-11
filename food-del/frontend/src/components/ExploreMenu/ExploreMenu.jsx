import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. 
        Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>

      <div className='explore-menu-list'>
        {menu_list.map((item, index) => (
          <div 
            key={index} 
            className={`explore-menu-list-item ${category === item.menu_name ? 'active' : ''}`}
            onClick={() => setCategory(category === item.menu_name ? "All" : item.menu_name)}
            tabIndex={0} // Makes it keyboard accessible
            role="button" // Indicates clickable element
          >
            <img 
              className={category === item.menu_name ? "active" : ""} 
              src={item.menu_image} 
              alt={item.menu_name} 
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;
