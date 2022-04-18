import { CSSProperties, useMemo } from 'react';
import { ApiColor } from './types';

const getColorStyle = (color: ApiColor): CSSProperties => ({});

const useStyleColor = (color: ApiColor): CSSProperties => {
  const style = useMemo(() => getColorStyle(color), [color]);
  return style;
};

export default useStyleColor;
