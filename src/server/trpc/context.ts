import { type inferAsyncReturnType } from '@trpc/server';

//import { prisma } from '../db/client';

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
//type CreateContextOptions = Record<string, never>;

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 *
 * parameter:
 * opts: CreateContextOptions
 **/
export const createContextInner = async () => {
  return {
    //prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 *
 * parameter:
 * opts: CreateContextOptions
 **/
export const createContext = async () => {
  return await createContextInner();
};

export type Context = inferAsyncReturnType<typeof createContext>;
