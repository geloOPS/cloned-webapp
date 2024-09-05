import React from "react";
import moneyImage from '../images/money.jpg';
import churchImage from '../images/church.jpg';
import groceryImage from '../images/grocery.jpg';
import restoImage from '../images/resto.jpg';

const Gallery: React.FC = () => {
  return (
    <div className="w-full h-fit bg-[#7c3732] rounded-lg p-4 md:p-8 gap-4">
      <h2 className="text-white text-2xl font-extrabold mb-4">Quick Links</h2>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center justify-center">
          <img  
            className="w-40 h-40 object-cover rounded-lg"  
            src={moneyImage}  
            alt="Gallery Image 1"  
          /> 
        </div>
        <div className="flex items-center justify-center">
          <img  
            className="w-40 h-40 object-cover rounded-lg"  
            src={churchImage}  
            alt="Gallery Image 2"  
          />  
        </div>
        <div className="flex items-center justify-center">
          <img
            className="w-40 h-40 object-cover rounded-lg"
            src={groceryImage} 
            alt="Gallery Image 3"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            className="w-40 h-40 object-cover rounded-lg"
            src={restoImage} 
            alt="Gallery Image 4"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
