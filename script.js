// Asynkroninen funktio headerin ja footerin lataamiseen
async function loadHeaderFooter() {
    const isGitHubPages = location.hostname === "valpalt.github.io";
    const repoName = "peuraniemen-taimitarha-website";
    const basePath = isGitHubPages ? `/${repoName}/` : "./";

    try {
        // Ladataan header
        const headerResponse = await fetch(basePath + "includes/header.html");
        if (!headerResponse.ok) throw new Error(`Headerin lataus epäonnistui: ${headerResponse.status}`);
        const headerHTML = await headerResponse.text();
        document.getElementById('header').innerHTML = headerHTML;

        // Ladataan footer
        const footerResponse = await fetch(basePath + "includes/footer.html");
        if (!footerResponse.ok) throw new Error(`Footerin lataus epäonnistui: ${footerResponse.status}`);
        const footerHTML = await footerResponse.text();
        document.getElementById('footer').innerHTML = footerHTML;

    } catch (error) {
        console.error("Header/footer lataus epäonnistui:", error);
    }
}

// Funktio, joka suoritetaan, kun header ja footer on ladattu
function initPage() {
    console.log("Sivu on ladattu ja header/footer näkyvissä");
    // Lisää tähän muu sivun logiikka, esim. tapahtumakuuntelijat, animaatiot
}

// Suoritetaan, kun DOM on valmis
window.addEventListener('DOMContentLoaded', async () => {
    await loadHeaderFooter(); // Odotetaan headerin ja footerin latausta
    initPage();               // Suoritetaan muu sivun toiminnallisuus
});
