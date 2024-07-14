// Form Search Date 
document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#datepicker", {
    dateFormat: "d-m-Y",
    // locale: "vi",
    minDate: "today"
  });
});

document.addEventListener("DOMContentLoaded", function () {
  flatpickr("[filter-by-date]", {
    dateFormat: "d-m-Y",
    // locale: "vi",
    minDate: "today",
    mode: "range",
    onClose: function (selectedDates, dateStr, instance) {
      const url = new URL(window.location.href);
      const arrDate = dateStr.split(" ");
      const startDate = arrDate[0];
      const endDate = arrDate[2];
      url.searchParams.set("startDate", startDate);
      url.searchParams.set("endDate", endDate);
      window.location.href = url.href;
    },
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
// Filter Sort 
const filterSort = document.querySelector("[filter-sort]");
if (filterSort) {
  const filterByName = filterSort.querySelector("[filter-by-title]");
  const filterByPrices = filterSort.querySelectorAll("[filter-by-price]");


  const url = new URL(window.location.href);

  filterByName.addEventListener("click", () => {
    url.searchParams.delete("sortValue");
    url.searchParams.set("sortKey", "title");
    window.location.href = url.href;
  })

  filterByPrices.forEach((filterByPrice) => {
    filterByPrice.addEventListener("click", () => {
      const [sortKey, sortValue] = filterByPrice.getAttribute("filter-by-price").split("-");
      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);
      window.location.href = url.href;
    })
  })

}
// End Filter Sort 