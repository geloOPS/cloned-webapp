import React, { useEffect, useState } from 'react';

const Homepage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const carousel = document.querySelector('[data-carousel="slide"]');
    const items = carousel?.querySelectorAll('[data-carousel-item]');
    const prevButton = carousel?.querySelector('[data-carousel-prev]');
    const nextButton = carousel?.querySelector('[data-carousel-next]');

    function showSlide(index: number) {
      if (items) {
        items.forEach((item, i) => {
          item.classList.toggle('block', i === index);
          item.classList.toggle('hidden', i !== index);
        });
      }
    }

    function showNextSlide() {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (items ? items.length : 1));
    }

    function showPrevSlide() {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + (items ? items.length : 1)) % (items ? items.length : 1));
    }

    if (nextButton) {
      nextButton.addEventListener('click', showNextSlide);
    }

    if (prevButton) {
      prevButton.addEventListener('click', showPrevSlide);
    }

    // Automatically change slide every 2 seconds
    const intervalId = setInterval(showNextSlide, 2000);

    // Show the initial slide
    showSlide(currentIndex);

    // Cleanup interval and event listeners on component unmount
    return () => {
      clearInterval(intervalId);
      if (nextButton) {
        nextButton.removeEventListener('click', showNextSlide);
      }
      if (prevButton) {
        prevButton.removeEventListener('click', showPrevSlide);
      }
    };
  }, [currentIndex]);

  useEffect(() => {
    // Update the displayed slide whenever `currentIndex` changes
    const carousel = document.querySelector('[data-carousel="slide"]');
    const items = carousel?.querySelectorAll('[data-carousel-item]');
    if (items) {
      items.forEach((item, i) => {
        item.classList.toggle('block', i === currentIndex);
        item.classList.toggle('hidden', i !== currentIndex);
      });
    }
  }, [currentIndex]);
  return (
    <section className="flex-1 h-full bg-white dark:bg-gray-900">
      <div className="px-4 pb-4 mx-auto max-w-screen-xl flex flex-col md:flex-row gap-8">
        {/* Main Content Section */}
        <div className="flex-1">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
            <a href="#" className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-2">
              <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z"/>
              </svg>
              Tutorial
            </a>
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">How to quickly deploy a static website</h1>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers.</p>
            <a href="#" className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Read more
              <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>
          </div>
          <div id="carousel" className="relative w-full h-56 md:h-96 mb-8" data-carousel="slide">
            <div className="relative h-full overflow-hidden rounded-lg">
              {[
                'https://images.pexels.com/photos/1704120/pexels-photo-1704120.jpeg',
                'https://images.pexels.com/photos/2120150/pexels-photo-2120150.jpeg',
                'https://images.pexels.com/photos/276040/pexels-photo-276040.jpeg',
                'https://images.pexels.com/photos/3709891/pexels-photo-3709891.jpeg',
                'https://images.pexels.com/photos/3995861/pexels-photo-3995861.jpeg'
              ].map((image, index) => (
                <div key={index} className={`hidden duration-700 ease-in-out ${index === 0 ? 'block' : ''}`} data-carousel-item={index === 0 ? 'active' : ''}>
                  <img src={image} className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={`Slide ${index + 1}`} />
                </div>
              ))}
            </div>
            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
              <a href="#" className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2">
                <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M17 11h-2.722L8 17.278a5.512 5.512 0 0 1-.9.722H17a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM6 0H1a1 1 0 0 0-1 1v13.5a3.5 3.5 0 1 0 7 0V1a1 1 0 0 0-1-1ZM3.5 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM16.132 4.9 12.6 1.368a1 1 0 0 0-1.414 0L9 3.55v9.9l7.132-7.132a1 1 0 0 0 0-1.418Z"/>
                </svg>
                Design
              </a>
              <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">Start with Flowbite Design System</h2>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers.</p>
              <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Read more
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
              <a href="#" className="bg-red-100 text-red-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-red-400 mb-2">
                <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M15 0H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 2a.5.5 0 0 1 .5.5V4h3V2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V4h2V2.5a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5V8h-2V7a1 1 0 1 0-2 0v1H8V7a1 1 0 1 0-2 0v1H6V2.5a.5.5 0 0 1 .5-.5ZM7.5 11.5h5a.5.5 0 0 1 .5.5V14h-6v-1a.5.5 0 0 1 .5-.5ZM12.5 16h-7v-1h7v1ZM15 14H8v-2h7v2ZM7 10h1V7H7v3Zm5 0h1V7h-1v3Zm-4 0h1V7H8v3Z"/>
                </svg>
                Code
              </a>
              <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">Building with Tailwind CSS</h2>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers.</p>
              <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Learn more
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-8 flex flex-col gap-4">
            <h2 className="text-gray-900 dark:text-white text-2xl font-extrabold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-center">
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="Gallery Image 1" />
                </div>
                <div className="flex items-center justify-center">
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="Gallery Image 2" />
                </div>
                <div className="flex items-center justify-center">
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="Gallery Image 3" />
                </div>
                <div className="flex items-center justify-center">
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="Gallery Image 4" />
                </div>
            </div>
            </div>
        </div>
    </section>
  );
};

export default Homepage;
