import React from 'react';
import Navbar from './components/Navbar';
import SideNavbar from './components/SideNavbar';
import Homepage from './pages/Homepage';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <SideNavbar />
        <main className="flex-1 bg-gray-100 overflow-auto">
          <Homepage />
        </main>
      </div>
    </div>
  );
}

export default App;
