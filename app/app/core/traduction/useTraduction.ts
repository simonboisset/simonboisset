import { useMatches, useParams } from '@remix-run/react';
import { useMemo } from 'react';
import type { Language } from '.';
import { traduction } from '.';

export const useTraduction = () => {
  const matchingRoutes = useMatches();
  const params = useParams();
  const routeFound = useMemo(() => {
    return matchingRoutes.find((path) => path.id === 'routes/');
  }, [matchingRoutes]);

  const lang = (params.lang || routeFound?.data || 'en') as Language;
  return { t: traduction[lang], lang };
};
