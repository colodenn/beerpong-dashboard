import { exampleRouter } from './example';
import { router } from '../trpc';

export const appRouter = router({
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
