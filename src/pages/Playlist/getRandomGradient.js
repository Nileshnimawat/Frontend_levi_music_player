import ColorThief from 'colorthief';

export const getSpotifyStyleGradient = (imageUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const colorThief = new ColorThief();
      try {
        const palette = colorThief.getPalette(img, 2);
        if (palette && palette.length >= 2) {
          const [r1, g1, b1] = palette[0];
          const [r2, g2, b2] = palette[1];
          resolve(`linear-gradient(to bottom right, rgb(${r1},${g1},${b1}), rgb(${r2},${g2},${b2}))`);
        } else {
          resolve("#181818");
        }
      } catch (err) {
        console.error("ColorThief failed:", err);
        resolve("#181818");
      }
    };

    img.onerror = () => {
      console.warn("Image failed to load");
      resolve("#181818");
    };
  });
};
