// types/index.ts

// O tipo que era exportado por MainFilters.tsx
export type MainFilterType = 'all' | 'botecar' | 'comida-di-buteco' | 'tropeirao';

// O tipo que era exportado por FilterBar.tsx
export type ActiveFilters = {
  openNow: boolean;
  nearby: boolean;
  bomPraDate: boolean;
  torresmo: boolean;
};