import React from "react";

const Gallery: React.FC = () => {
  return (
    <div className="w-full h-fit bg-[#7c3732] rounded-lg p-4 md:p-8 gap-4">
      <h2 className="text-white text-2xl font-extrabold mb-4">Quick Links</h2>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center justify-center">
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
            alt="Gallery Image 1"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
            alt="Gallery Image 2"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
            alt="Gallery Image 3"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
            alt="Gallery Image 4"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
