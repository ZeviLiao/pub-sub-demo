import React from 'react';
import Publisher from '../components/Publisher';
import Client from '../components/Client';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Pub/Sub with SSE</h1>
        <Publisher />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Client clientId="1" />
          <Client clientId="2" />
          <Client clientId="3" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
