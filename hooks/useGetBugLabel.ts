export const useGetBugLabel = (): string => {
  const bugKeys = Array.from({ length: 8 }, (_, i) => `bugv${i + 1}`);
  const randomIndex = Math.floor(Math.random() * bugKeys.length);

  return `errors.bugs.${bugKeys[randomIndex]}`;
};
