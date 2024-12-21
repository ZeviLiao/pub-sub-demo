'use client';

import React, { useState } from 'react';

const Publisher = () => {
  const [message, setMessage] = useState('');

  const handlePublish = async () => {
    if (!message) {
      alert('Please enter a message.');
      return;
    }
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    setMessage(''); // 清空输入框
  };

  return (
    <div className="border border-gray-300 p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-4">Publisher</h3>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button
        onClick={handlePublish}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Publish
      </button>
    </div>
  );
};

export default Publisher;
