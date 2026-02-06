import "./styles.css";
/**
 * Portfolio Website - Interactive Features
 * Handles smooth scrolling, project filtering, and interactive elements
 */

(function () {
  "use strict";

  // ==========================================
  // INITIALIZATION
  // ==========================================

  document.addEventListener("DOMContentLoaded", function () {
    initializeFeatures();
  });

  function initializeFeatures() {
    setupSmoothScroll();
    setupProjectInteractivity();
    setupResponsiveMenu();
    setupAccessibility();
  }

  // ==========================================
  // SMOOTH SCROLLING
  // ==========================================

  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  // ==========================================
  // PROJECT CARD INTERACTIONS
  // ==========================================

  function setupProjectInteractivity() {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      // Add keyboard interaction for project cards
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          this.classList.add("active");
        }
      });

      // Add visual feedback on focus
      card.addEventListener(
        "focus",
        function () {
          this.style.outline = "2px solid var(--primary-color)";
          this.style.outlineOffset = "2px";
        },
        true,
      );

      card.addEventListener(
        "blur",
        function () {
          this.style.outline = "none";
        },
        true,
      );

      // Enhance project links with visual feedback
      const links = card.querySelectorAll("a");
      links.forEach((link) => {
        link.addEventListener("mouseenter", function () {
          card.style.transform = "translateY(-6px)";
        });

        link.addEventListener("mouseleave", function () {
          card.style.transform = "";
        });
      });
    });
  }

  // ==========================================
  // RESPONSIVE MENU SETUP
  // ==========================================

  function setupResponsiveMenu() {
    // Add mobile-specific behaviors if needed
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      // Disable hover effects that don't work well on touch devices
      document.body.classList.add("is-mobile");
    }

    // Listen for viewport changes
    window.addEventListener(
      "resize",
      debounce(function () {
        const nowMobile = window.matchMedia("(max-width: 767px)").matches;
        if (nowMobile && !document.body.classList.contains("is-mobile")) {
          document.body.classList.add("is-mobile");
        } else if (
          !nowMobile &&
          document.body.classList.contains("is-mobile")
        ) {
          document.body.classList.remove("is-mobile");
        }
      }, 250),
    );
  }

  // ==========================================
  // ACCESSIBILITY ENHANCEMENTS
  // =========================================

  function setupAccessibility() {
    // Improve focus visibility for keyboard navigation
    document.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-nav");
      }
    });

    document.addEventListener("mousedown", function () {
      document.body.classList.remove("keyboard-nav");
    });

    // Add aria-labels to icon-only buttons
    const iconButtons = document.querySelectorAll("a:has(svg):not(:has(span))");
    iconButtons.forEach((button, index) => {
      if (!button.hasAttribute("aria-label")) {
        const parent = button.closest('[class*="links"]');
        if (parent) {
          button.setAttribute("aria-label", `Link ${index + 1}`);
        }
      }
    });

    // Announce page regions for screen readers
    document.querySelectorAll("section").forEach((section) => {
      if (!section.hasAttribute("role")) {
        section.setAttribute("role", "region");
      }
    });

    // Make images in contact section descriptive
    const contactImg = document.querySelector(".contact-image img");
    if (contactImg && !contactImg.hasAttribute("role")) {
      contactImg.setAttribute("role", "presentation");
    }
  }

  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================

  /**
   * Debounce function to limit how often a function is called
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function for performance-critical operations
   */
  function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // ==========================================
  // SCROLL ANIMATIONS (Optional)
  // ==========================================

  function setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all project cards and sections for animation
    document.querySelectorAll(".project-card, section").forEach((el) => {
      observer.observe(el);
    });
  }

  // ==========================================
  // FORM VALIDATION (If adding contact form)
  // ==========================================

  function setupFormValidation() {
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form fields
        const inputs = this.querySelectorAll("input, textarea");
        let isValid = true;

        // Validate each field
        inputs.forEach((input) => {
          if (!input.value.trim()) {
            input.classList.add("error");
            isValid = false;
          } else {
            input.classList.remove("error");
          }

          // Email validation
          if (input.type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
              input.classList.add("error");
              isValid = false;
            }
          }
        });

        if (isValid) {
          // Handle form submission
          console.log("Form is valid, ready to submit");
          // You can add actual form submission logic here
        }
      });
    }
  }

  // ==========================================
  // PERFORMANCE MONITORING
  // ==========================================

  function setupPerformanceMonitoring() {
    // Log when the page is fully loaded
    window.addEventListener("load", function () {
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page fully loaded in ${loadTime}ms`);
      }
    });
  }

  // Initialize performance monitoring
  setupPerformanceMonitoring();

  // ==========================================
  // THEME SWITCHER (Optional Dark Mode)
  // ==========================================

  function setupThemeSwitcher() {
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem("theme") || "light";

    // If the user prefers dark mode
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-theme", "dark");
    }

    // Listen for changes
    if (window.matchMedia) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          document.documentElement.setAttribute(
            "data-theme",
            e.matches ? "dark" : "light",
          );
          localStorage.setItem("theme", e.matches ? "dark" : "light");
        });
    }
  }

  // Initialize theme switcher
  setupThemeSwitcher();

  // ==========================================
  // EXPORT FOR TESTING (Optional)
  // ==========================================

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      debounce,
      throttle,
    };
  }
})();
