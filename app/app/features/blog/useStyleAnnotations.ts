import { CSSProperties, useMemo } from 'react';
import { Annotations } from './types';

const getStyleAnnotations = (annotations: Annotations): CSSProperties => ({});

const useStyleAnnotations = (annotations: Annotations): CSSProperties => {
  const style = useMemo(() => getStyleAnnotations(annotations), [annotations]);
  return style;
};

export default useStyleAnnotations;
