import type { ComponentPropsWithoutRef } from 'react';

export interface IconComponentProps extends Partial<
  Omit<ComponentPropsWithoutRef<'svg'>, 'stroke'>
> {
  stroke?: string | number;
  size?: number;
  color?: string;
}
