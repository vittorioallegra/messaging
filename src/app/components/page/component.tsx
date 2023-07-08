import { PropsWithChildren } from 'react';

export const Page = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col items-center justify-center bg-white w-full h-full">{children}</div>
);
