import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto flex justify-center">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} penplace. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;