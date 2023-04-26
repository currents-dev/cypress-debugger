import { Toggle } from '@/components/ui/Toggle';
import { useDarkMode } from '@/components/ui/useDarkMode';
import { Moon, Sun } from 'lucide-react';

function DarkModeToggle() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <Toggle
      size="sm"
      aria-label="Toggle dark mode"
      onClick={() => setIsDark((prevIsDark) => !prevIsDark)}
    >
      {isDark ? <Moon /> : <Sun />}
    </Toggle>
  );
}

export default DarkModeToggle;
