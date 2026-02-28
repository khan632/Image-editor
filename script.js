/*
function functionalities:
1. createFiltersEle: this will create filters element on UI.
2. createFilters: this will create main element by calling createFilterEle function on filters object
3. applyFiltersToCanvas: this will apply filter to selected image of canvas
4. imgSelectorInput: select image and load on canvas
5. resetBtn: reset all filters which is applied on canvas and filter elemnt will goes to initail condition
6. downloadBtn: this will download filtered image.
*/

let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  grayScale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

const presetFilters = {
  drama: {
    brightness: 90,
    contrast: 150,
    saturation: 120,
    hueRotation: 0,
    blur: 0,
    grayScale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },
  vintage: {
    brightness: 105,
    contrast: 90,
    saturation: 75,
    hueRotation: 15,
    blur: 0,
    grayScale: 10,
    sepia: 40,
    opacity: 100,
    invert: 0,
  },
  oldSchool: {
    brightness: 95,
    contrast: 110,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayScale: 100,
    sepia: 20,
    opacity: 100,
    invert: 0,
  },
  faded: {
    brightness: 115,
    contrast: 80,
    saturation: 70,
    hueRotation: 0,
    blur: 0,
    grayScale: 15,
    sepia: 20,
    opacity: 85,
    invert: 0,
  },
  noir: {
    brightness: 80,
    contrast: 160,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayScale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },
  dreamy: {
    brightness: 115,
    contrast: 85,
    saturation: 80,
    hueRotation: 20,
    blur: 1.5,
    grayScale: 0,
    sepia: 15,
    opacity: 95,
    invert: 0,
  },
  cyberpunk: {
    brightness: 110,
    contrast: 140,
    saturation: 180,
    hueRotation: 190,
    blur: 0,
    grayScale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },
  sunset: {
    brightness: 110,
    contrast: 110,
    saturation: 150,
    hueRotation: 340,
    blur: 0,
    grayScale: 0,
    sepia: 30,
    opacity: 100,
    invert: 0,
  },
  horror: {
    brightness: 70,
    contrast: 170,
    saturation: 50,
    hueRotation: 0,
    blur: 0.5,
    grayScale: 40,
    sepia: 10,
    opacity: 100,
    invert: 10,
  },
  polaroid: {
    brightness: 110,
    contrast: 85,
    saturation: 90,
    hueRotation: 5,
    blur: 0,
    grayScale: 0,
    sepia: 25,
    opacity: 100,
    invert: 0,
  },
  arctic: {
    brightness: 120,
    contrast: 95,
    saturation: 60,
    hueRotation: 180,
    blur: 0,
    grayScale: 20,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },
};

const filterContainer = document.querySelector(".filters");
const canvasImage = document.querySelector("#canvas-image");
const canvasContext = canvasImage.getContext("2d");
const imgSelectorInput = document.querySelector("#image-input");
const inputPlaceholder = document.querySelector(".placeholder");
const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector('#download-btn');
const presentContainer = document.querySelector('.preset')
let file = null;
let image = null;

function createFiltersEle(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const p = document.createElement("p");
  p.innerText = name;

  const input = document.createElement("input");
  input.type = "range";
  input.name = name;
  input.value = value;
  input.min = min;
  input.max = max;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (e) => {
    filters[name].value = input.value;
    applyFiltersToCanvas();
  });

  return div;
}


function createFilters() {
  Object.keys(filters).forEach((key) => {
    const filterElement = createFiltersEle(
      key,
      filters[key].unit,
      filters[key].value,
      filters[key].min,
      filters[key].max,
    );

    filterContainer.appendChild(filterElement);
  });
}
createFilters();

imgSelectorInput.addEventListener("change", (e) => {
  file = e.target.files[0];
  canvasImage.style.display = "block";
  inputPlaceholder.style.display = "none";

  const img = new Image();

  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;
    canvasImage.width = img.width;
    canvasImage.height = img.height;
    canvasContext.drawImage(img, 0, 0);
  };
});

function applyFiltersToCanvas() {
  canvasContext.clearRect(0, 0, canvasImage.width, canvasImage.height);
  canvasContext.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayScale(${filters.grayScale.value}${filters.grayScale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
  `;
  canvasContext.drawImage(image, 0, 0);
}

resetBtn.addEventListener("click", () => {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    hueRotation: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg",
    },
    blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: "px",
    },
    grayScale: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    sepia: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: "%",
    },
    invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
  };
  applyFiltersToCanvas();
  filterContainer.innerHTML = "";
  createFilters();
});

downloadBtn.addEventListener('click', (e) => {
  const link = document.createElement('a');
  link.download = 'edited-image.png';
  link.href = canvasImage.toDataURL();
  link.click();
});

Object.keys(presetFilters).forEach(presetName => {
  const presetBtn = document.createElement('button');
  presetBtn.classList.add('btn')
  presetBtn.innerText = presetName;
  presentContainer.appendChild(presetBtn);

  presetBtn.addEventListener('click', () => {
    const preset = presetFilters[presetName];

    Object.keys(preset).forEach(filterName => {
      filters[filterName].value = preset[filterName];
      console.log(filters);
      
      applyFiltersToCanvas();
      
    })
  })
})
