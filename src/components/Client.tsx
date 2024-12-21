'use client';

import React, { useState, useRef } from 'react';

interface ClientProps {
  clientId: string; // 每个客户端的唯一标识
}

const Client = ({ clientId }: ClientProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const handleSubscribe = () => {
    if (!isSubscribed) {
      eventSourceRef.current = new EventSource(`/api/events?clientId=${clientId}`);
      eventSourceRef.current.onmessage = (event) => {
        const { message } = JSON.parse(event.data);
        setMessages((prev) => [...prev, message]);
      };
      setIsSubscribed(true);
      alert(`Client ${clientId} subscribed!`);
    }
  };

  const handleUnsubscribe = () => {
    if (isSubscribed && eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsSubscribed(false);
      alert(`Client ${clientId} unsubscribed!`);
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-4">Client {clientId}</h3>
      <div className="space-x-4 mb-4">
        <button
          onClick={handleSubscribe}
          className={`px-4 py-2 rounded-md ${
            isSubscribed
              ? 'bg-gray-500 text-white'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
          disabled={isSubscribed}
        >
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
        <button
          onClick={handleUnsubscribe}
          className={`px-4 py-2 rounded-md ${
            !isSubscribed
              ? 'bg-gray-500 text-white'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
          disabled={!isSubscribed}
        >
          {isSubscribed ? 'Unsubscribe' : 'Unsubscribed'}
        </button>
      </div>
      <div className="bg-gray-100 p-3 rounded-md h-40 overflow-y-auto">
        <h4 className="text-md font-semibold mb-2">Messages</h4>
        <ul className="list-disc pl-5 space-y-2">
          {messages.map((msg, index) => (
            <li key={index} className="text-gray-700">
              {msg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Client;
