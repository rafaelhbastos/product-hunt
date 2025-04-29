export const fuzzySearch = (searchTerm: string, element: string | string[]) => {
  if (typeof element === "string") {
    return element.toLowerCase().includes(searchTerm.toLowerCase());
  }
  return element.some((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
