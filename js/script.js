// Tämä funktio lataa headerin ja footerin erillisistä HTML-tiedostoista ja sijoittaa ne sivulle.
function loadHeaderFooter() {
    // Määritetään oikea polku includes-hakemistoon
    let includesPath = 'includes/'; // Oletuspolku sivuille, jotka ovat juuritasolla

    // Tarkistetaan, onko nykyinen sivu alihakemistossa
    if (window.location.pathname.includes('/lajikkeet/')) {
      includesPath = '../includes/'; // Polku lajikkeet-alihakemistossa oleville sivuille
    }

    // Promise.all mahdollistaa useamman fetch-pyynnön tekemisen samanaikaisesti.
    // Tässä ladataan sekä header että footer samaan aikaan.
    return Promise.all([
      // Ladataan header.html-tiedosto
      fetch(includesPath + 'header.html')
        .then(res => {
          // Tarkistetaan, onnistuiko lataus. Jos vastaus ei ole ok (esim. 404-virhe), heitetään virhe.
          if (!res.ok) {
            throw new Error(`Headerin lataus epäonnistui: ${res.status}`);
          }
          // Jos lataus onnistui, palautetaan vastaus tekstinä.
          return res.text();
        })
        .then(data => {
          // Kun headerin sisältö on ladattu, sijoitetaan se sivulle
          document.getElementById('header').innerHTML = data;
        })
        .catch(error => {
          // Jos headerin latauksessa tapahtuu virhe, tulostetaan virhe konsoliin.
          console.error("Virhe headerin latauksessa:", error);
          // Tässä kohtaa voitaisiin näyttää käyttäjälle virheilmoitus, esim. alert-ikkunalla tai muulla tavalla.
        }),
      // Ladataan footer.html-tiedosto (samanlainen kuin headerin lataus)
      fetch(includesPath + 'footer.html')
        .then(res => {
          // Tarkistetaan, onnistuiko lataus.
          if (!res.ok) {
            throw new Error(`Footerin lataus epäonnistui: ${res.status}`);
          }
          // Jos lataus onnistui, palautetaan vastaus tekstinä.
          return res.text();
        })
        .then(data => {
          // Kun footerin sisältö on ladattu, sijoitetaan se sivulla olevaan elementtiin, jonka id on 'footer'.
          document.getElementById('footer').innerHTML = data;
        })
        .catch(error => {
          // Jos footerin latauksessa tapahtuu virhe, tulostetaan virhe konsoliin.
          console.error("Virhe footerin latauksessa:", error);
          // Tässä kohtaa voitaisiin näyttää käyttäjälle virheilmoitus.
        })
    ]);
  }
  
  // Tämä funktio sisältää sivun muun JavaScript-toiminnallisuuden.
  function initPage() {
    // Tulostetaan viesti konsoliin, kun sivu on ladattu ja header/footer ovat näkyvissä.
    console.log("Sivu on ladattu ja header/footer näkyvissä");
    // Tähän voi lisätä muuta sivun skriptitoimintaa, esim. tapahtumakuuntelijoita, animaatioita jne.
  }
  
  // Tämä koodi suoritetaan, kun sivu on latautunut kokonaan (DOM on valmis).
  window.addEventListener('DOMContentLoaded', () => {
    // Ensin ladataan header ja footer.
    loadHeaderFooter().then(() => {
      // Kun header ja footer ovat latautuneet, käynnistetään sivun muu toiminnallisuus.
      initPage();
    });
  });
