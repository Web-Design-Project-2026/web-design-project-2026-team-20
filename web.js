document.addEventListener("DOMContentLoaded", () => {
  setActiveNavigationLink();
  setupMenuSearch();
});

/* Highlight */
function setActiveNavigationLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".navigation a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (
      currentPage === linkPage ||
      (currentPage.startsWith("menu") && linkPage === "menu.html")
    ) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/* Search for menu */
function setupMenuSearch() {
  const searchInput = document.querySelector("#menu-search");
  const menuItems = document.querySelectorAll(".menu-item");
  const menuCount = document.querySelector("#menu-count");

  if (!searchInput || menuItems.length === 0) return;

  updateMenuCount(menuItems.length, menuCount);

  searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase().trim();
    let visibleItems = 0;

    menuItems.forEach((item) => {
      const itemText = item.textContent.toLowerCase();
      const matchesSearch = itemText.includes(searchText);

      item.style.display = matchesSearch ? "flex" : "none";

      if (matchesSearch) {
        visibleItems++;
      }
    });

    updateMenuCount(visibleItems, menuCount);
  });
}

function updateMenuCount(count, menuCount) {
  if (!menuCount) return;

  if (count === 1) {
    menuCount.textContent = "Showing 1 item";
  } else {
    menuCount.textContent = `Showing ${count} items`;
  }
}
