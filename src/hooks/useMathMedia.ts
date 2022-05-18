import { useEffect, useState } from 'react';

export const MATHC_MAP_NAME = {
  IS_PHABLET: 'IS_PHABLET',
  IS_MOBILE: 'IS_MOBILE',
} as const;

const MATCH_MAP = {
  IS_PHABLET: '(max-width: 768px)',
  //IS_MOBILE: '(max-width: 480px)',
  IS_MOBILE: '(max-width: 636px)',
} as const;
type MatchingSize = keyof typeof MATCH_MAP;

export function useMathcMedia(match: MatchingSize) {
  const [mathces, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const handleOnResize = (event: Event) => {
      setMatches(window.matchMedia(MATCH_MAP[match]).matches);
    };

    window.addEventListener('resize', handleOnResize);
    return () => {
      window.removeEventListener('resize', handleOnResize);
    };
  }, [match]);

  return mathces;
}
