"use strict";

// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-theme", currentTheme);

// Theme toggle event listener
themeToggle.addEventListener("click", function () {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Achievement Image Slider Functionality - Global variables and functions
let currentSlideIndex = 1;
let slideInterval;

// Auto slide functionality
function startSlideShow() {
  // Clear any existing interval first
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    currentSlideIndex++;
    if (currentSlideIndex > 4) {
      currentSlideIndex = 1;
    }
    showSlide(currentSlideIndex);
  }, 5000); // Change slide every 5 seconds
}

// Stop auto slide
function stopSlideShow() {
  clearInterval(slideInterval);
}

// Show specific slide
function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");

  if (!slides.length) return; // Exit if no slides found

  // Hide all slides
  slides.forEach((slide) => slide.classList.remove("active"));
  indicators.forEach((indicator) => indicator.classList.remove("active"));

  // Show current slide
  const currentSlide = document.querySelector(`[data-slide="${index}"]`);
  const currentIndicator = document.querySelector(
    `.indicator[data-slide="${index}"]`
  );

  if (currentSlide) currentSlide.classList.add("active");
  if (currentIndicator) currentIndicator.classList.add("active");

  currentSlideIndex = index;
}

// Change slide (next/previous) - Global function for onclick
function changeSlide(direction) {
  stopSlideShow();
  currentSlideIndex += direction;

  if (currentSlideIndex > 4) {
    currentSlideIndex = 1;
  } else if (currentSlideIndex < 1) {
    currentSlideIndex = 4;
  }

  showSlide(currentSlideIndex);
  startSlideShow();
}

// Go to specific slide - Global function for onclick
function currentSlide(index) {
  stopSlideShow();
  showSlide(index);
  startSlideShow();
}

document.addEventListener("DOMContentLoaded", function () {
  // Initialize dynamic dates first
  updateDynamicDates();

  // Update dates every hour to keep "Present" positions current
  setInterval(updateDynamicDates, 3600000); // 1 hour = 3600000 ms

  // Select all navigation links and page elements
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  // Add click event to all navigation links
  navigationLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Get the link's associated page identifier
      const pageId =
        this.getAttribute("data-nav-link") || this.textContent.toLowerCase();

      // Iterate over all pages to show the correct one and update link active state
      pages.forEach((page) => {
        if (pageId === page.dataset.page) {
          page.classList.add("active"); // Show the page
        } else {
          page.classList.remove("active"); // Hide other pages
        }
      });

      // Update active state for links
      navigationLinks.forEach((navLink) => {
        if (
          navLink.getAttribute("data-nav-link") === pageId ||
          navLink.textContent.toLowerCase() === pageId
        ) {
          navLink.classList.add("active");
        } else {
          navLink.classList.remove("active");
        }
      });

      // Initialize slider if switching to achievement page
      if (pageId === "achievement") {
        setTimeout(() => {
          const slides = document.querySelectorAll(".slide");
          if (slides.length > 0) {
            currentSlideIndex = 1;
            showSlide(1);
            startSlideShow();
          }
        }, 100);
      } else {
        // Stop slideshow when leaving achievement page
        stopSlideShow();
      }

      // Scroll to top of the page
      window.scrollTo(0, 0);
    });
  });

  // Initialize slider on page load if achievement is active
  const achievementPage = document.querySelector(".achievement.active");
  if (achievementPage) {
    setTimeout(() => {
      showSlide(1);
      startSlideShow();
    }, 100);
  }

  // Add mouse hover events to pause/resume slideshow
  const sliderContainer = document.querySelector(".post-image-slider");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", stopSlideShow);
    sliderContainer.addEventListener("mouseleave", () => {
      // Only restart if we're on the achievement page
      const achievementActive = document.querySelector(".achievement.active");
      if (achievementActive) {
        startSlideShow();
      }
    });
  }
});

// Dynamic Date Calculation Functions
function calculateTimePeriod(startDate, endDate) {
  const start = new Date(startDate);
  const end = endDate === "current" ? new Date() : new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  // Handle ongoing positions
  const isOngoing = endDate === "current";

  // Format the time period
  let timePeriod = "";
  if (years > 0 && months > 0) {
    timePeriod = `${years} yr${years > 1 ? "s" : ""} ${months} mo${
      months > 1 ? "s" : ""
    }`;
  } else if (years > 0) {
    timePeriod = `${years} yr${years > 1 ? "s" : ""}`;
  } else if (months > 0) {
    timePeriod = `${months} mo${months > 1 ? "s" : ""}`;
  } else {
    timePeriod = "Less than 1 mo";
  }

  return { timePeriod, isOngoing };
}

function formatDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = endDate === "current" ? new Date() : new Date(endDate);
  const isOngoing = endDate === "current";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const startMonth = months[start.getMonth()];
  const startYear = start.getFullYear();

  if (isOngoing) {
    return `${startMonth} ${startYear} - Present`;
  } else {
    const endMonth = months[end.getMonth()];
    const endYear = end.getFullYear();
    return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
  }
}

function updateDynamicDates() {
  const dynamicDateElements = document.querySelectorAll(".dynamic-date");

  dynamicDateElements.forEach((element) => {
    const startDate = element.getAttribute("data-start-date");
    const endDate = element.getAttribute("data-end-date");

    if (startDate && endDate) {
      const { timePeriod, isOngoing } = calculateTimePeriod(startDate, endDate);
      const dateRange = formatDateRange(startDate, endDate);

      // Extract the original text to preserve the degree/position info
      const originalText = element.textContent.trim();

      // Find the position where the date range should start
      // Look for patterns like "MS(CS)", "BS(CS)", etc.
      let beforeDate = "";
      if (originalText.includes("MS(CS)")) {
        beforeDate = "MS(CS)";
      } else if (originalText.includes("BS(CS)")) {
        beforeDate = "BS(CS)";
      } else if (originalText.includes("FSc(Pre-Engineering)")) {
        beforeDate = "FSc(Pre-Engineering)";
      } else if (originalText.includes("Matriculation(Science)")) {
        beforeDate = "Matriculation(Science)";
      } else {
        // For experience entries, just use the date range
        beforeDate = "";
      }

      // Create new content with dynamic dates
      if (beforeDate) {
        element.innerHTML = `${beforeDate} ${dateRange}`;
      } else {
        element.innerHTML = `${dateRange}
          <i class="time-period-display"> · ${timePeriod}</i>`;
      }
    }
  });

  // Update MS program progress
  updateMSProgress();
}

function updateMSProgress() {
  const msProgressElement = document.getElementById("ms-progress");
  if (msProgressElement) {
    const startDate = new Date("2024-01-01"); // MS program start
    const currentDate = new Date();

    // Calculate months since start
    const monthsSinceStart =
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
      (currentDate.getMonth() - startDate.getMonth());

    // MS programs are typically 4 semesters (2 years)
    // Each semester is about 6 months (including breaks)
    const currentSemester = Math.min(Math.ceil(monthsSinceStart / 6), 4);

    let progressText = "";
    if (currentSemester <= 1) {
      progressText = "Currently in my 1st semester of the MS program.";
    } else if (currentSemester === 2) {
      progressText = "Completed 1st semester, currently in 2nd semester.";
    } else if (currentSemester === 3) {
      progressText = "Completed 2 semesters, currently in 3rd semester.";
    } else if (currentSemester === 4) {
      progressText = "Completed 3 semesters, currently in final semester.";
    } else {
      progressText = "Successfully completed the MS program.";
    }

    msProgressElement.textContent = progressText;
  }
}
