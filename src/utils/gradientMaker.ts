export const header1 = "#0F010E";
export const header2 = "#2A2A4A";
export const bg1 = "#1A091F";
export const bg2 = "#34315A";

export const subHexColor = (c1, c2) => {
    let hexStr = (
      parseInt(c1.substring(1, 7), 16) - parseInt(c2.substring(1, 7), 16)
    ).toString(16)
      .padStart(6, "0");
    if (hexStr.includes("-")) {
      return c1;
    }
    return `#${hexStr}`;
  };
  
  export const addHexColor = (c1, c2) => {
    let hexStr = (
      parseInt(c1.substring(1, 7), 16) + parseInt(c2.substring(1, 7), 16)
    ) .toString(16)
      .padStart(6, "0");
    if (hexStr.length > 6) {
      return c1;
    }
    return `#${hexStr}`;
  };