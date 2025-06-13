import React, { useState, useEffect } from 'react';

const Modal = ({ onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem('modalLastShown');
    const now = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (!lastShown || (now - parseInt(lastShown)) > twentyFourHours) {
      setShowModal(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('modalLastShown', new Date().getTime().toString());
    onSubmit(name);
    setShowModal(false);
  };

  const handleClose = () => {
    localStorage.setItem('modalLastShown', new Date().getTime().toString());
    setShowModal(false);
    onClose();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] p-8 rounded-lg lg:w-[40%] w-[90%] border border-gray-700">
        <h2 className="text-2xl text-white font-semibold mb-4">Welcome!</h2>
        <p className="text-gray-400 mb-6">Please share your name. You can use a pseudonym if you prefer.</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-3 mb-4 bg-[#2d2d2d] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#a0b1ba]"
            required
          />
          
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Skip
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#a0b1ba]/80 text-black rounded-md hover:bg-[#a0b1ba] transition-colors"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;