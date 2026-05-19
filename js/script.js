// ================================
// eugene.sec — Cybersecurity Blog JS
// ================================

document.addEventListener("DOMContentLoaded", () => {

    // --- Mobile Nav Toggle ---
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");

    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

        // Close mobile nav when a link is clicked
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });
        });
    }

    // --- Navbar scroll effect ---
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            navbar.style.borderBottomColor = "rgba(30,45,61,0.8)";
        } else {
            navbar.style.borderBottomColor = "rgba(30,45,61,0.4)";
        }
    });

    // --- Active nav link highlight ---
    const sections = document.querySelectorAll("section[id]");
    const navLinksList = document.querySelectorAll('.nav-links a[href^="#"]');

    const observerOptions = {
        root: null,
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinksList.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // --- Fetch SOFA macOS Data Feed ---
    fetchSOFAData();
});


async function fetchSOFAData() {
    const grid = document.getElementById("sofa-grid");
    const statusDot = document.querySelector(".status-dot");
    const statusText = document.getElementById("sofa-status-text");

    // If we're not on the main page (no sofa-grid), skip
    if (!grid) return;

    try {
        const response = await fetch("https://sofa.macadmins.io/v1/macos_data_feed.json");

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();

        // Update status bar
        statusDot.classList.remove("loading");
        const lastCheck = data.LastCheck || new Date().toISOString();
        statusText.textContent = `✓ Connected — Last updated: ${formatDate(lastCheck)}`;

        // Build OS cards
        let cardsHTML = "";
        const osVersions = data.OSVersions || [];

        osVersions.forEach(os => {
            const securityReleases = os.SecurityReleases || [];
            const latest = securityReleases[0] || {};
            const cveCount = latest.UniqueCVEsCount || latest.CVEs?.length || "N/A";
            const releaseDate = latest.ReleaseDate || "N/A";
            const productVersion = latest.ProductVersion || os.OSVersion || "Unknown";
            const updateName = latest.UpdateName || "";
            const daysOld = latest.DaysSinceRelease || "—";
            const activelyExploited = latest.ActivelyExploitedCVEs?.length || 0;

            cardsHTML += `
                <div class="sofa-card">
                    <div class="sofa-card-header">
                        <span class="sofa-os-name">${os.OSVersion || "macOS"}</span>
                        <span class="sofa-version">${productVersion}</span>
                    </div>
                    <div class="sofa-details">
                        ${updateName ? `
                        <div class="sofa-detail">
                            <span class="sofa-detail-label"><i class="fas fa-tag"></i> Update</span>
                            <span class="sofa-detail-value">${updateName}</span>
                        </div>` : ""}
                        <div class="sofa-detail">
                            <span class="sofa-detail-label"><i class="far fa-calendar-check"></i> Released</span>
                            <span class="sofa-detail-value date">${formatDate(releaseDate)}</span>
                        </div>
                        <div class="sofa-detail">
                            <span class="sofa-detail-label"><i class="fas fa-clock-rotate-left"></i> Days Old</span>
                            <span class="sofa-detail-value">${daysOld}</span>
                        </div>
                        <div class="sofa-detail">
                            <span class="sofa-detail-label"><i class="fas fa-shield-virus"></i> CVEs Patched</span>
                            <span class="sofa-detail-value cve-count">${cveCount}</span>
                        </div>
                        ${activelyExploited > 0 ? `
                        <div class="sofa-detail">
                            <span class="sofa-detail-label"><i class="fas fa-triangle-exclamation"></i> Actively Exploited</span>
                            <span class="sofa-detail-value" style="color: var(--accent-red); font-weight: 700;">${activelyExploited}</span>
                        </div>` : ""}
                    </div>
                </div>
            `;
        });

        grid.innerHTML = cardsHTML || "<p>No vulnerability data available.</p>";

    } catch (error) {
        console.error("SOFA fetch error:", error);
        if (statusDot) {
            statusDot.classList.remove("loading");
            statusDot.classList.add("error");
        }
        if (statusText) {
            statusText.textContent = `✗ Failed to fetch SOFA data: ${error.message}`;
        }
        if (grid) {
            grid.innerHTML = `
                <div class="sofa-loading">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: var(--accent-red);"></i>
                    <p>Could not load SOFA feed. This may be due to CORS restrictions.<br>
                    When hosted on GitHub Pages, the fetch should work correctly.</p>
                </div>
            `;
        }
    }
}


function formatDate(dateStr) {
    if (!dateStr || dateStr === "N/A") return "N/A";
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    } catch {
        return dateStr;
    }
}
