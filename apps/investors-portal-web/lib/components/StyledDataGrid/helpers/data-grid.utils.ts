import { GridColDef } from '@mui/x-data-grid';

export const formatGridColumns = <Data extends Record<string, any>>(
  columns: Data,
  options: {
    mapper?: Partial<Record<keyof Data, Partial<GridColDef<Data>>>>;
    autoCleanHeaders?: boolean;
    autoSizeColumns?: boolean;
  }
): GridColDef<Data>[] => {
  if (!columns) return [];

  return Object.entries(columns)?.reduce(
    (acc: GridColDef<Data>[], [key, value]) => {
      const cleanedName =
        options?.mapper?.[key]?.headerName ||
        (options.autoCleanHeaders ?? true
          ? key.replace(/_/g, ' ').replace(/^./, (match) => match.toUpperCase())
          : key);

      const estimatedColumnWidth =
        options.autoCleanHeaders ?? true ? cleanedName.length * 10 : undefined;

      acc.push({
        field: key,
        headerName: cleanedName,
        width: estimatedColumnWidth,
        valueFormatter: (params) => params.value ?? '-',
        // typeof params.value === 'string'
        //   ? params.value.trim() || '-'
        //   : params.value ?? '-',
        ...options?.mapper?.[key],
      });

      return acc;
    },
    []
  );
};
