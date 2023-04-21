import { useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

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
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setIsDarkInStorage(isDark);
  }, [isDark]);

  const reset = () => {
    setIsDark(getSystemPreference());
  };

  return [isDark, setIsDark, reset] as const;
}

export { useDarkMode };
