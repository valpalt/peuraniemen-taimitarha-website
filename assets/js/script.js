// Asynkroninen funktio headerin ja footerin lataamiseen
async function loadHeaderFooter() {
    if (window.__headerFooterLoading || window.__headerFooterLoaded) return; // prevent double init
    window.__headerFooterLoading = true;

    const repoName = "peuraniemen-taimitarha-website";
    const repoPrefix = `/${repoName}/`;
    const hostIsPages = /\.github\.io$/i.test(window.location.hostname);
    const path = window.location.pathname || "/";
    const basePath = path.startsWith(repoPrefix) ? repoPrefix : (hostIsPages ? repoPrefix : "/"); // works on localhost and GitHub Pages

    const prefixPaths = (container) => {
        if (!container) return;
        const needsPrefix = (value) => {
            if (!value) return false;
            if (/^(https?:|mailto:|tel:|#)/i.test(value)) return false; // leave absolute/external as-is
            return !value.startsWith(basePath); // anything not already prefixed should be
        };

        container.querySelectorAll("a[href], img[src]").forEach((el) => {
            const attr = el.hasAttribute("href") ? "href" : "src";
            const original = el.getAttribute(attr);
            if (!needsPrefix(original)) return;
            const normalized = original
                .replace(/^\.\//, "")
                .replace(/^\//, "");
            el.setAttribute(attr, basePath + normalized);
        });
    };

    try {
        // Ladataan header
        const headerResponse = await fetch(basePath + "includes/header.html");
        if (!headerResponse.ok) {
            throw new Error(`Headerin lataus epäonnistui: ${headerResponse.status}`);
        }
        const headerHTML = await headerResponse.text();
        const headerContainer = document.getElementById("header");
        headerContainer.innerHTML = headerHTML;
        prefixPaths(headerContainer);

        // Ladataan footer
        const footerResponse = await fetch(basePath + "includes/footer.html");
        if (!footerResponse.ok) {
            throw new Error(`Footerin lataus epäonnistui: ${footerResponse.status}`);
        }
        const footerHTML = await footerResponse.text();
        const footerContainer = document.getElementById("footer");
        footerContainer.innerHTML = footerHTML;
        prefixPaths(footerContainer);

        window.__headerFooterLoaded = true;
    } catch (error) {
        console.error("Header/footer lataus epäonnistui:", error);
    } finally {
        window.__headerFooterLoading = false;
    }
}

// Funktio, joka suoritetaan, kun header ja footer on ladattu
function initPage() {
    console.log("Sivu on ladattu ja header/footer näkyvissä");
    // Tänne kaikki sivukohtainen JS jatkossa
}

// Käynnistys
(async function start() {
    await loadHeaderFooter();
    initPage();
})();
