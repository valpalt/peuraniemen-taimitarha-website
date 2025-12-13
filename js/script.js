function loadHeaderFooter() {
    // Repo-polku GitHub Pagesissa
    const isGitHubPages = location.hostname === "valpalt.github.io";
    const repoName = "peuraniemen-taimitarha-website";

    const basePath = isGitHubPages ? `/${repoName}/` : "./";

    // Lataa header ja footer
    return Promise.all([
        fetch(basePath + "includes/header.html")
            .then(res => {
                if (!res.ok) throw new Error(`Headerin lataus epäonnistui: ${res.status}`);
                return res.text();
            })
            .then(data => {
                document.getElementById('header').innerHTML = data;
            })
            .catch(error => console.error(error)),
        fetch(basePath + "includes/footer.html")
            .then(res => {
                if (!res.ok) throw new Error(`Footerin lataus epäonnistui: ${res.status}`);
                return res.text();
            })
            .then(data => {
                document.getElementById('footer').innerHTML = data;
            })
            .catch(error => console.error(error))
    ]);
}

  
  // Tämä funktio sisältää sivun muun JavaScript-toiminnallisuuden.
  function initPage() {
    // Tulostetaan viesti konsoliin, kun sivu on ladattu ja header/footer ovat näkyvissä.
    console.log("Sivu on ladattu ja header/footer näkyvissä");
    // Tähän voisi lisätä muuta sivun skriptitoimintaa, esim. tapahtumakuuntelijoita, animaatioita jne.
  }
  
  // Tämä koodi suoritetaan, kun sivu on latautunut kokonaan (DOM on valmis).
  window.addEventListener('DOMContentLoaded', () => {
    // Ensin ladataan header ja footer.
    loadHeaderFooter().then(() => {
      // Kun header ja footer ovat latautuneet, käynnistetään sivun muu toiminnallisuus.
      initPage();
    });
  });
