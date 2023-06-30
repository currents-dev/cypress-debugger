import { cva } from 'class-variance-authority';
import { TestState } from 'cypress-debugger';

export const testStateVariants = cva<{
  state: Record<TestState | 'default', string>;
}>('', {
  variants: {
    state: {
      default: '',
      passed: 'text-emerald-700 dark:text-emerald-500',
      pending: 'text-amber-500 dark:text-yellow-300',
      failed: 'text-red-600 dark:text-red-400',
      skipped: '',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});
