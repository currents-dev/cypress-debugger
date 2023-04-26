import useLocalStorage from '@/hooks/useLocalStorage';
import { useEffect, useState } from 'react';

function useDarkMode(key = 'darkMode') {
  const getSystemPreference = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDark, setIsDark] = useState(getSystemPreference());
  const [isDarkInStorage, setIsDarkInStorage] = useLocalStorage<boolean>(
    key,
    getSystemPreference()
  );

  useEffect(() => {
    setIsDark(isDarkInStorage || (!isDarkInStorage && getSystemPreference()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setIsDarkInStorage(isDark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);

  const reset = () => {
    setIsDark(getSystemPreference());
  };

  return [isDark, setIsDark, reset] as const;
}

export { useDarkMode };
