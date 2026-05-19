document.addEventListener("DOMContentLoaded", () => {
  setActiveNavigationLink();
  setupMenuSearch();
  showOpeningStatus();
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

/* Shows if the cofe open */
function showOpeningStatus() {
  const statusElement = document.querySelector("[data-open-status]");

  if (!statusElement) return;

  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hour * 60 + minutes;

  const weekdayOpening = 7 * 60;
  const weekdayClosing = 18 * 60;
  const saturdayOpening = 9 * 60;
  const saturdayClosing = 16 * 60;

  let isOpen = false;

  if (day >= 1 && day <= 5) {
    isOpen = currentTime >= weekdayOpening && currentTime < weekdayClosing;
  } else if (day === 6) {
    isOpen = currentTime >= saturdayOpening && currentTime < saturdayClosing;
  }

  if (isOpen) {
    statusElement.textContent = "Open now";
    statusElement.classList.add("open");
    statusElement.classList.remove("closed");
  } else {
    statusElement.textContent = "Closed now";
    statusElement.classList.add("closed");
    statusElement.classList.remove("open");
  }
}
