// Thanks to ChatGPT for this function =)
export default function ColorDecider(bgColor) {
  // Convert hex color to RGB
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  // Calculate relative luminance
  const calculateLuminance = (rgb) => {
    const [r, g, b] = rgb.map((val) => {
      val /= 255;
      return val <= 0.03928
        ? val / 12.92
        : Math.pow((val + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  // Get RGB values from hex color
  const rgb = hexToRgb(bgColor);

  // Calculate luminance
  const luminance = calculateLuminance(rgb);

  // Use white text if the background is dark, and vice versa
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}
