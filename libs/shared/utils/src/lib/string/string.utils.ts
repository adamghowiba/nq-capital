export const padId = (id: number, options?: {maxLength: number, prefix?: string}): string => {
  const maxLength = options?.maxLength ?? 5
  const prefix = options?.prefix ?? '#'
  return `${prefix}${id?.toString?.()?.padStart(maxLength, '0')}`;
}
