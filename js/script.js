function loadHeaderFooter() {
  const isGitHubPages = location.hostname === "valpalt.github.io";
  const repoName = "peuraniemen-taimitarha-website";
  const basePath = isGitHubPages ? `/${repoName}/` : "./";

  console.group("[loadHeaderFooter]");
  console.log("hostname:", location.hostname, "protocol:", location.protocol);
  console.log("isGitHubPages:", isGitHubPages, "repoName:", repoName, "basePath:", basePath);

  const headerUrl = new URL(basePath + "includes/header.html", location.href).href;
  const footerUrl = new URL(basePath + "includes/footer.html", location.href).href;
  console.log("headerUrl:", headerUrl);
  console.log("footerUrl:", footerUrl);

  console.time("headerFetch");
  const headerPromise = fetch(headerUrl)
    .then(res => {
      console.log("[header] status:", res.status, "ok:", res.ok, "url:", res.url);
      if (!res.ok) throw new Error(`Headerin lataus epäonnistui: ${res.status}`);
      return res.text();
    })
    .then(data => {
      console.log("[header] length:", data.length);
      const el = document.getElementById("header");
      if (!el) {
        console.error("[header] elementtiä #header ei löytynyt");
        return;
      }
      el.innerHTML = data;
    })
    .catch(err => {
      console.error("[header] virhe:", err);
      throw err; // tärkeä: anna virheen kaataa Promise.all:n
    })
    .finally(() => console.timeEnd("headerFetch"));

  console.time("footerFetch");
  const footerPromise = fetch(footerUrl)
    .then(res => {
      console.log("[footer] status:", res.status, "ok:", res.ok, "url:", res.url);
      if (!res.ok) throw new Error(`Footerin lataus epäonnistui: ${res.status}`);
      return res.text();
    })
    .then(data => {
      console.log("[footer] length:", data.length);
      const el = document.getElementById("footer");
      if (!el) {
        console.error("[footer] elementtiä #footer ei löytynyt");
        return;
      }
      el.innerHTML = data;
    })
    .catch(err => {
      console.error("[footer] virhe:", err);
      throw err; // tärkeä: anna virheen kaataa Promise.all:n
    })
    .finally(() => console.timeEnd("footerFetch"));

  const all = Promise.all([headerPromise, footerPromise])
    .finally(() => console.groupEnd());

  return all;
}

function initPage() {
  console.log("[initPage] käynnissä, header/footer pitäisi olla näkyvissä");
}

window.addEventListener("DOMContentLoaded", () => {
  console.log("[DOMContentLoaded] fired. path:", location.pathname);
  loadHeaderFooter()
    .then(() => initPage())
    .catch(err => {
      console.error("[DOMContentLoaded] header/footer lataus epäonnistui:", err);
    });
});
