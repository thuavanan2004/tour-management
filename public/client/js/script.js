// Form Search Date 
document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#datepicker", {
    dateFormat: "d-m-Y",
    locale: "vi",
    minDate: "today"
  });
});

// End Form Search Date 
// Slider 
const priceSlider = document.getElementById('price-slider');
const minPriceValue = document.getElementById('min-price-value');
const maxPriceValue = document.getElementById('max-price-value');

noUiSlider.create(priceSlider, {
  start: [0, 1000], // Giá trị ban đầu
  connect: true,
  range: {
    'min': 0,
    'max': 1000
  },
  step: 1,
  format: {
    to: value => Math.round(value),
    from: value => Number(value)
  }
});

// Cập nhật giá trị khi thanh trượt thay đổi
priceSlider.noUiSlider.on('update', (values, handle) => {
  if (handle === 0) {
    minPriceValue.textContent = values[0];
  } else {
    maxPriceValue.textContent = values[1];
  }
});
// End Slider 