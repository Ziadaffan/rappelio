export function useGetBugIcon(colorScheme: string) {
  return colorScheme === "dark"
    ? require("../assets/icons/bug-icon-white.png")
    : require("../assets/icons/bug-icon-black.png");
}
