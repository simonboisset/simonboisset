import { CSSProperties, useMemo } from 'react';
import { Color } from './types';

const getColorStyle = (color: Color): CSSProperties => ({});

const useStyleColor = (color: Color): CSSProperties => {
  const style = useMemo(() => getColorStyle(color), [color]);
  return style;
};

export default useStyleColor;
