const searchInput = document.querySelector("#search");
const productsDOM = document.querySelector(".products-center");
const btns = document.querySelectorAll(".btn");
let allProductsData = [];
const filters = {
  searchItems: "",
};
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      allProductsData = res.data;
      // render products on DOM :
      renderProducts(res.data, filters);
    })
    .catch((res) => console.log(res));
});
function renderProducts(_products, _filters) {
  const filterProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
  });
  // render to DOM :
  productsDOM.innerHTML = "";
  filterProducts.forEach((item) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
          <div class="img-container">
            <img src="${item.image}" alt="p${item.id}" />
          </div>
          <div class="product-desc">
            <p class="product-price">${item.price}</p>
            <p class="product-title">${item.title}</p>
          </div>
    `;
    productsDOM.appendChild(productDiv);
  });
}
searchInput.addEventListener("input", (e) => {
  const filter = e.target.value;
  filters.searchItems = filter;
  renderProducts(allProductsData, filters);
});
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;
    filters.searchItems = filter;
    renderProducts(allProductsData, filters);
  });
});
