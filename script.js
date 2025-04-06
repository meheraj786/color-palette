const rainbowShades = {
  Red:    ["#4B0000", "#800000", "#B22222", "#DC143C", "#FF4C4C", "#FF7A7A", "#FFB3B3"],
  Orange: ["#4B2E00", "#804000", "#BF6000", "#FF8000", "#FFA64D", "#FFBF80", "#FFDBB3"],
  Yellow: ["#4B4B00", "#808000", "#BFBF00", "#FFFF00", "#FFFF66", "#FFFF99", "#FFFFCC"],
  Green:  ["#003300", "#006400", "#228B22", "#32CD32", "#4CFF4C", "#80FF80", "#B3FFB3"],
  Blue:   ["#00004B", "#000080", "#0000CD", "#1E90FF", "#4D94FF", "#80B3FF", "#B3D1FF"],
  Indigo: ["#1A0033", "#330066", "#4B0082", "#5D3FD3", "#7F66FF", "#A799FF", "#D1CCFF"],
  Violet: ["#3B004B", "#6A0DAD", "#9932CC", "#BA55D3", "#CC66FF", "#D891FF", "#F0CCFF"]
};

function getBrightness(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

const palette = document.querySelector('.palette');
palette.innerHTML = ''; // Clear existing

// Build palette groups
for (const colorName in rainbowShades) {
  const group = document.createElement('div');
  group.className = 'palette-group';

  const heading = document.createElement('h2');
  heading.textContent = colorName + " Shades";
  group.appendChild(heading);

  const row = document.createElement('div');
  row.className = 'palette-row';

  rainbowShades[colorName].forEach(shade => {
    const box = document.createElement('div');
    box.className = 'color-box';
    box.dataset.color = shade;
    box.textContent = shade;
    box.style.backgroundColor = shade;

    const brightness = getBrightness(shade);
    box.style.color = brightness > 150 ? '#000' : '#fff';

    box.addEventListener('click', () => {
      navigator.clipboard.writeText(shade);
      box.classList.add('copied');
      setTimeout(() => {
        box.classList.remove('copied');
      }, 1500);
    });

    row.appendChild(box);
  });

  group.appendChild(row);
  palette.appendChild(group);
}
