export async function loadHeaderAndFooter() {
    async function loadTemplate(url, containerSelector, callback = null) {
        try {
            const container = document.querySelector(containerSelector);
            if (!container || container.hasChildNodes()) return; // Prevent duplicates

            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch ${url}`);

            container.innerHTML = await response.text();

            if (callback) callback(); // Run callback after loading
        } catch (error) {
            console.error(`Error loading template: ${error.message}`);
        }
    }

    const basePath = window.location.pathname.includes("/pages/") ? "../partials/" : "partials/";

    await loadTemplate(`${basePath}header.html`, "#header-container", () => {
        setupHamburgerMenu();
        setActiveNavLink(); // Apply active class after header loads
    });

    await loadTemplate(`${basePath}footer.html`, "#footer-container", updateFooterInfo);
}

// Function to set active link based on current page
function setActiveNavLink() {
    const navLinks = document.querySelectorAll(".nav-links a");
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname;

        if (linkPath === currentPath || (linkPath.endsWith("index.html") && currentPath === "/")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// Function to format last modified date
function getFormattedLastModified() {
    const lastModified = new Date(document.lastModified);
    const dateFormat = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = lastModified.toLocaleDateString("en-US", dateFormat);
    const formattedTime = lastModified.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
}

// Function to update footer info
function updateFooterInfo() {
    const yearElement = document.querySelector(".currentyear");
    const modifiedElement = document.querySelector("#lastModified");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (modifiedElement) {
        modifiedElement.textContent = getFormattedLastModified();
    }
}

// Function to enable the hamburger menu
function setupHamburgerMenu() {
    const checkHeader = setInterval(() => {
        const hamburgerBtn = document.querySelector("#menu");
        const navigationMenu = document.querySelector(".nav-links");

        if (hamburgerBtn && navigationMenu) {
            clearInterval(checkHeader); // Stop checking once elements are found

            hamburgerBtn.addEventListener("click", () => {
                hamburgerBtn.classList.toggle("open");
                navigationMenu.classList.toggle("open");
            });
        }
    }, 100);
}

// Ensure script runs on load
document.addEventListener("DOMContentLoaded", loadHeaderAndFooter);
