import { loadHeaderAndFooter } from "./utils.mjs";

// Utility functions for date formatting and user identification
const DateUtils = {
    getCurrentYear() {
        return new Date().getFullYear();
    },

    getFormattedLastModified() {
        const lastModified = new Date(document.lastModified);
        const dateFormat = { year: "numeric", month: "short", day: "numeric" };
        const formattedDate = lastModified.toLocaleDateString("en-US", dateFormat);
        const formattedTime = lastModified.toLocaleTimeString("en-US");
        return `${formattedDate} ${formattedTime}`;
    }
};

const UserUtils = {
    getUserId() {
        const cookieMatch = document.cookie.match(/userId=([^;]+)/);
        if (cookieMatch) return cookieMatch[1];

        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("userId") || "Guest";
    },

    storeAccessInfo() {
        const accessTimes = JSON.parse(localStorage.getItem("accessTimes")) || [];
        accessTimes.push({
            dateTime: new Date().toLocaleString(),
            userId: this.getUserId()
        });
        localStorage.setItem("accessTimes", JSON.stringify(accessTimes));
    }
};

// UI update functions
const UI = {
    updateCurrentYear() {
        document.querySelectorAll(".currentyear").forEach(element => {
            element.textContent = DateUtils.getCurrentYear();
        });
    },

    updateLastModified() {
        const formattedDateTime = DateUtils.getFormattedLastModified();
        const elements = ["#lastModified", "#timestamp"];

        elements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.innerHTML = `<span class="highlighter">${formattedDateTime}</span>`;
            }
        });
    },

    setupHamburgerMenu() {
        const hamburgerBtn = document.querySelector("#menu");
        const navigationBtn = document.querySelector(".nav-links");

        if (hamburgerBtn && navigationBtn) {
            hamburgerBtn.addEventListener("click", () => {
                hamburgerBtn.classList.toggle("open");
                navigationBtn.classList.toggle("open");
            });
        }
    },

    setActiveNavLink() {
        const navLinks = document.querySelectorAll(".nav-links a");
        const currentPath = window.location.pathname;

        navLinks.forEach(link => {
            if (link.getAttribute("href") === currentPath) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }
};

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
    loadHeaderAndFooter();
    UI.setupHamburgerMenu();
    UI.updateCurrentYear();
    UI.updateLastModified();
    UI.setActiveNavLink(); // Set the active navigation link
    UserUtils.storeAccessInfo();
});
