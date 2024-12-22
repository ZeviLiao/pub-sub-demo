// utils/queuebase.ts
import { createQueuebaseClient } from 'queuebase/client';
import type { JobRouter } from '@/app/api/queuebase/core';

export const { jobs } = createQueuebaseClient<JobRouter>({
  apiKey: process.env.NEXT_PUBLIC_QUEUEBASE_API_KEY!,
});
