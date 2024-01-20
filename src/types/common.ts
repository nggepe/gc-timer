import { FC, ReactNode } from "react";

export interface FCProps {
  children?: ReactNode;
}

export type _FC<P = FCProps> = FC<P>;
