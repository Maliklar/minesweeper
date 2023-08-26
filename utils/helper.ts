export const getCeilFontColor = (value: number) => {
  switch (value) {
    case 1:
      return "#0000ff";

    case 2:
      return "#008200";

    case 3:
      return "#fe0000";

    case 4:
      return "#000084";

    case 5:
      return "#8a1414";

    case 6:
      return "#008284";

    case 7:
      return "#840084";

    case 8:
      return "#757575";

    default:
      return "black";
  }
};
