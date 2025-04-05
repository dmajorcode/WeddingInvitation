/**
 * Font loading utility to ensure fonts are loaded as early as possible
 */

// List of custom fonts to preload
const customFonts = [
  {
    family: "GowunBatang-Regular",
    url: "/fonts/GowunBatang-Regular.ttf",
    format: "truetype",
  },
  {
    family: "IncheonEducationJaram",
    url: "/fonts/IncheonEducationJaram.ttf",
    format: "truetype",
  },
  {
    family: "Nanum-Letter",
    url: "/fonts/Nanum-Letter.ttf",
    format: "truetype",
  },
  {
    family: "MaruBuri",
    url: "https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.woff2",
    format: "woff2",
  },
];

/**
 * Preload fonts using the Font Loading API
 */
export const preloadFonts = () => {
  // Check if the browser supports the Font Loading API
  if ("FontFace" in window) {
    // Create and load each font
    customFonts.forEach((font) => {
      const fontFace = new FontFace(
        font.family,
        `url(${font.url}) format('${font.format}')`
      );

      // Load the font
      fontFace
        .load()
        .then((loadedFont) => {
          // Add the font to the document.fonts collection
          document.fonts.add(loadedFont);
        })
        .catch((error) => {
          console.error(`Error loading font ${font.family}:`, error);
        });
    });
  }
};

/**
 * Initialize font loading
 */
export const initFontLoading = () => {
  // Preload fonts
  preloadFonts();

  // Add a class to the document when fonts are loaded
  document.fonts.ready.then(() => {
    document.documentElement.classList.add("fonts-loaded");
  });
};
