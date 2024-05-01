/* eslint-disable @typescript-eslint/no-explicit-any */
export const omit = <T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: readonly K[]
): Omit<T, K> => {
  const tempObject = { ...object };

  keys.forEach((key) => {
    if (key in tempObject) delete tempObject[key];
  });

  return tempObject;
};
