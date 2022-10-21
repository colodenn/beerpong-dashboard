/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetcher = (args: any) => fetch(args).then((res) => res.json());
