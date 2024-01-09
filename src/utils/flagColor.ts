export const flagColor = (priority: number) => {
  const flagColors = {
    1: "#82C91E",
    2: "#15AABF",
    3: "#FAB005",
    4: "#FA5252",
  };
  return flagColors[priority] || "#B2ACAC";
};
