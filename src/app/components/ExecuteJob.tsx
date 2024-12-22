// app/components/ExecuteJob.tsx
'use client';

import { jobs } from '@/utils/queuebase';

export default function ExecuteJob() {
  const handleClick = async () => {
    await jobs('sayHello').enqueue({ name: '您的名字' });
  };

  return (
    <button onClick={handleClick}>
      執行工作
    </button>
  );
}
