import { type JobRouter as QueuebaseJobRouter } from "queuebase/lib/types";
import { createQueuebase } from "queuebase/next";
import { z } from "zod";
 
export const jobRouter = {
  //@ts-ignore
  sayHello: j().handler(() => {
    console.log("Hello there!");
  }),
} satisfies QueuebaseJobRouter;
 
export type JobRouter = typeof jobRouter;