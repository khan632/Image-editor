const filters = {
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
  exposure: {
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
    const file = e.target.files[0];
    inputPlaceholder.style.display = 'none';

    const img = new Image();

    img.src = URL.createObjectURL(file);

    img.onload = () => {
        canvasImage.width = img.width;
        canvasImage.height = img.height;
        canvasContext.drawImage(img, 0, 0)
    }
})
