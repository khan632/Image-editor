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

const filterContainer = document.querySelector('.filters');
const canvasImage = document.querySelector('#canvas-image');
const canvasContext = canvasImage.getContext('2d');
const imgSelectorInput = document.querySelector('#image-input');
const inputPlaceholder = document.querySelector('.placeholder');
const resetBtn = document.querySelector("#reset-btn")
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

  input.addEventListener('input', (e) => {
    filters[name].value = input.value;
    applyFiltersToCanvas()
  })

  return div;
}

Object.keys(filters).forEach((key) => {
  const filterElement = createFiltersEle(
    key,
    filters[key].unit,
    filters[key].value,
    filters[key].min,
    filters[key].max,
  );

  filterContainer.appendChild(filterElement)

});

imgSelectorInput.addEventListener('change', (e) => {
    file = e.target.files[0];
    canvasImage.style.display = 'block';
    inputPlaceholder.style.display = 'none';

    const img = new Image();

    img.src = URL.createObjectURL(file);

    img.onload = () => {
      image = img;
        canvasImage.width = img.width;
        canvasImage.height = img.height;
        canvasContext.drawImage(img, 0, 0)
    }
})

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
  `
  canvasContext.drawImage(image, 0, 0);
}

resetBtn.addEventListener('click', () => {
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
  applyFiltersToCanvas()
})
