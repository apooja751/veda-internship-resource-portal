/* ==========================================
   VEDA TECHNOLOGY
   INTERNSHIP RESOURCE PORTAL
   Main JavaScript
========================================== */

let portalData = {
    domains: [],
    projects: [],
    resources: [],
    guidelines: [],
    faqs: []
};


// ==========================================
// INITIALIZE PORTAL
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    initializePortal();
});

async function initializePortal() {
    try {
        // Load the main portal content from the existing JSON file.
        const response = await fetch("data/resources.json");

        if (!response.ok) {
            throw new Error("Unable to load portal JSON data.");
        }

        portalData = await response.json();

        // Make sure the resources collection is an array.
        if (!Array.isArray(portalData.resources)) {
            portalData.resources = [];
        }

        // Fetch additional resource information from the Cloudflare Pages API.
        // If the API is unavailable, the existing JSON resources will still load.
        try {
            const apiResponse = await fetch("/api/resources");

            if (!apiResponse.ok) {
                throw new Error("Unable to fetch API resources.");
            }

            const apiData = await apiResponse.json();

            if (apiData.success && Array.isArray(apiData.resources)) {
                const existingTitles = new Set(
                    portalData.resources
                        .filter(resource => resource && resource.title)
                        .map(resource => resource.title.trim().toLowerCase())
                );

                const newResources = apiData.resources.filter(resource => {
                    if (!resource || !resource.title) {
                        return false;
                    }

                    const title = resource.title.trim().toLowerCase();

                    if (existingTitles.has(title)) {
                        return false;
                    }

                    existingTitles.add(title);
                    return true;
                });

                portalData.resources = [
                    ...portalData.resources,
                    ...newResources
                ];

                console.log("Cloudflare resources API connected successfully.");
            }

        } catch (apiError) {
            console.warn(
                "Cloudflare API unavailable. Using resources from the JSON file.",
                apiError
            );
        }

        renderDomains();
        renderProjects();
        renderResources();
        renderGuidelines();
        renderFAQs();

        setupSearch();

        console.log("Veda Technology Portal loaded successfully.");

    } catch (error) {
        console.error("Portal loading error:", error);

        showErrorMessage(
            "Unable to load portal information. Please check the server and JSON file."
        );
    }
}


// ==========================================
// REUSABLE ELEMENT CREATION
// ==========================================

function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;
}


// ==========================================
// RENDER INTERNSHIP DOMAINS
// ==========================================

function renderDomains() {
    const container = document.querySelector(
        "#domains .access-grid"
    );

    if (!container) return;

    container.replaceChildren();

    portalData.domains.forEach((domain, index) => {
        const card = createElement("article", "access-card");

        const colors = ["blue", "orange", "purple", "green"];

        const icon = createElement(
            "div",
            `card-icon ${colors[index % colors.length]}`,
            String(index + 1).padStart(2, "0")
        );

        const title = createElement("h3", "", domain.name);

        const description = createElement(
            "p",
            "",
            domain.description
        );

        const level = createElement(
            "span",
            "level-tag",
            domain.level
        );

        card.append(icon, title, description, level);
        container.appendChild(card);
    });
}


// ==========================================
// RENDER PROJECTS
// ==========================================

function renderProjects() {
    const container = document.getElementById(
        "projectContainer"
    );

    if (!container) return;

    container.replaceChildren();

    portalData.projects.forEach(project => {
        const card = createElement("article", "dynamic-card");

        const title = createElement("h3", "", project.name);

        const description = createElement(
            "p",
            "",
            project.description
        );

        const technology = createElement(
            "small",
            "",
            "Technologies: " + project.technology
        );

        card.append(title, description, technology);
        container.appendChild(card);
    });
}


// ==========================================
// RENDER LEARNING RESOURCES
// ==========================================

function renderResources() {
    const container = document.getElementById(
        "resourceContainer"
    );

    if (!container) return;

    container.replaceChildren();

    portalData.resources.forEach(resource => {
        const card = createElement("article", "dynamic-card");

        const title = createElement("h3", "", resource.title);

        const description = createElement(
            "p",
            "",
            resource.description
        );

        const category = createElement(
            "span",
            "level-tag",
            resource.category
        );

        // API resources may not have a URL.
        // Only show the link when a resource actually provides one.
        card.append(title, description, category);

        if (resource.url) {
            const link = createElement(
                "a",
                "card-link",
                "Visit Resource →"
            );

            link.href = resource.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            card.appendChild(link);
        }

        container.appendChild(card);
    });
}


// ==========================================
// RENDER INTERNSHIP GUIDELINES
// ==========================================

function renderGuidelines() {
    const container = document.getElementById(
        "guidelineContainer"
    );

    if (!container) return;

    container.replaceChildren();

    portalData.guidelines.forEach((guideline, index) => {
        const card = createElement("article", "dynamic-card");

        const number = createElement(
            "div",
            "card-icon blue",
            String(index + 1).padStart(2, "0")
        );

        const title = createElement(
            "h3",
            "",
            guideline.title
        );

        const description = createElement(
            "p",
            "",
            guideline.description
        );

        card.append(number, title, description);
        container.appendChild(card);
    });
}


// ==========================================
// RENDER FAQ
// ==========================================

function renderFAQs() {
    const container = document.getElementById(
        "faqContainer"
    );

    if (!container) return;

    container.replaceChildren();

    portalData.faqs.forEach(faq => {
        const item = createElement("details", "faq-item");

        const question = createElement(
            "summary",
            "",
            faq.question
        );

        const answer = createElement(
            "p",
            "",
            faq.answer
        );

        item.append(question, answer);
        container.appendChild(item);
    });
}


// ==========================================
// SEARCH FUNCTION
// ==========================================

function searchPortal(query) {
    const searchTerm = query.trim().toLowerCase();

    const matches = (items, fields) => {
        if (!searchTerm) return items;

        return items.filter(item =>
            fields.some(field =>
                String(item[field] || "")
                    .toLowerCase()
                    .includes(searchTerm)
            )
        );
    };

    return {
        domains: matches(
            portalData.domains,
            ["name", "description", "category", "level"]
        ),

        projects: matches(
            portalData.projects,
            ["name", "description", "technology"]
        ),

        resources: matches(
            portalData.resources,
            ["title", "description", "category"]
        ),

        guidelines: matches(
            portalData.guidelines,
            ["title", "description"]
        )
    };
}


// ==========================================
// SEARCH AND FILTER SETUP
// ==========================================

function setupSearch() {
    const input = document.getElementById("portalSearch");
    const button = document.getElementById("searchButton");
    const category = document.getElementById("searchCategory");

    if (!input || !button || !category) return;

    button.addEventListener("click", performSearch);

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            performSearch();
        }
    });

    category.addEventListener("change", performSearch);

    input.addEventListener("input", () => {
        if (!input.value.trim()) {
            document.getElementById(
                "searchResults"
            ).replaceChildren();
        }
    });
}


// ==========================================
// DISPLAY SEARCH RESULTS
// ==========================================

function performSearch() {
    const input = document.getElementById("portalSearch");
    const category = document.getElementById("searchCategory");
    const resultsContainer = document.getElementById("searchResults");

    const query = input.value.trim();

    resultsContainer.replaceChildren();

    if (!query) {
        resultsContainer.appendChild(
            createElement(
                "p",
                "no-results",
                "Please enter a search term."
            )
        );
        return;
    }

    const results = searchPortal(query);

    const collections = {
        domains: results.domains,
        projects: results.projects,
        resources: results.resources,
        guidelines: results.guidelines
    };

    const selectedCategories = category.value === "all"
        ? Object.keys(collections)
        : [category.value];

    const foundResults = [];

    selectedCategories.forEach(type => {
        collections[type].forEach(item => {
            foundResults.push({
                ...item,
                type
            });
        });
    });

    if (foundResults.length === 0) {
        resultsContainer.appendChild(
            createElement(
                "p",
                "no-results",
                "No matching results found. Try another search."
            )
        );
        return;
    }

    const heading = createElement(
        "h3",
        "",
        `Found ${foundResults.length} result(s)`
    );

    heading.style.marginBottom = "15px";

    resultsContainer.appendChild(heading);

    foundResults.forEach(item => {
        const card = createElement(
            "article",
            "search-result-item"
        );

        const title = createElement(
            "h3",
            "",
            item.name || item.title
        );

        const description = createElement(
            "p",
            "",
            item.description
        );

        const type = createElement(
            "p",
            "",
            "Category: " + item.type
        );

        card.append(title, description, type);

        if (item.url) {
            const link = createElement(
                "a",
                "",
                "Open Resource →"
            );

            link.href = item.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            card.appendChild(link);
        }

        resultsContainer.appendChild(card);
    });
}


// ==========================================
// ERROR HANDLING
// ==========================================

function showErrorMessage(message) {
    const main = document.querySelector("main");

    if (!main) return;

    const error = createElement(
        "p",
        "error-message",
        message
    );

    main.prepend(error);
}