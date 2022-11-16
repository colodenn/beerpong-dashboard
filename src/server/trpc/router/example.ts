import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      };
    }),
  whatUp: publicProcedure
    .input(z.object({ name: z.string().nullish() }).nullish())
    .query(({ input }) => {
      //ctx.prisma.example.findMany();
      return {
        info: `Just chillin with ${input?.name}`,
      };
    }),
});
