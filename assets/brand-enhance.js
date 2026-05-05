(() => {
  const assets = {
    acaMark: "/assets/aca-hydraulic-mark.svg",
    acaLogo: "/assets/aca-hydraulic-site-logo.svg",
    dsnMark: "/assets/dsn-tianjin-mark.svg",
    dsnLogo: "/assets/dsn-tianjin-site-logo.svg",
  };

  const makeImage = (src, alt, className) => {
    const image = document.createElement("img");
    image.src = src;
    image.alt = alt;
    image.className = className;
    image.decoding = "async";
    image.loading = "eager";
    return image;
  };

  const rowFor = (element) =>
    element.closest(".flex.items-center.gap-2, .flex.items-center.gap-3, .flex.items-center.gap-4") ||
    element.parentElement;

  const looksLikeIcon = (element) => {
    if (!element) return false;
    const text = element.textContent.trim();
    const classes = String(element.className || "");
    return (
      text === "ACA" ||
      text === "DSN" ||
      classes.includes("bg-gold") ||
      classes.includes("bg-red") ||
      element.tagName.toLowerCase() === "svg"
    );
  };

  const replaceFirstIcon = (row, image) => {
    if (!row || row.dataset.brandEnhanced === "true") return;
    const icon = Array.from(row.children).find(looksLikeIcon);
    if (icon) icon.replaceWith(image);
    else row.prepend(image);
    row.dataset.brandEnhanced = "true";
  };

  const replaceHeaderLogo = () => {
    const link = document.querySelector('header a[href="/"]');
    if (!link || link.dataset.brandEnhanced === "true") return;

    const hasAca = Array.from(link.querySelectorAll("span")).some(
      (span) => span.textContent.trim() === "ACA" || span.textContent.trim() === "HYDRAULIC",
    );
    if (!hasAca) return;

    link.replaceChildren(makeImage(assets.acaLogo, "ACA Hydraulic", "brand-nav-logo"));
    link.dataset.brandEnhanced = "true";
  };

  const replaceFooterLogo = () => {
    const link = document.querySelector('footer a[href="/"]');
    if (!link || link.dataset.brandEnhanced === "true") return;

    const hasAca = Array.from(link.querySelectorAll("span")).some(
      (span) => span.textContent.trim() === "ACA" || span.textContent.trim() === "HYDRAULIC",
    );
    if (!hasAca) return;

    link.replaceChildren(makeImage(assets.acaLogo, "ACA Hydraulic", "brand-footer-logo"));
    link.dataset.brandEnhanced = "true";
  };

  const replaceTextBrands = () => {
    document.querySelectorAll("span").forEach((span) => {
      const text = span.textContent.trim();

      if (text === "ACA Hydraulic — Центральная Азия") {
        replaceFirstIcon(rowFor(span), makeImage(assets.acaMark, "ACA Hydraulic", "brand-chip-logo"));
      }

      if (text === "Tianjin DSN — Китай") {
        replaceFirstIcon(rowFor(span), makeImage(assets.dsnMark, "Tianjin DSN", "brand-chip-logo"));
      }

      if (text === "ACA Hydraulic") {
        replaceFirstIcon(rowFor(span), makeImage(assets.acaMark, "ACA Hydraulic", "brand-mini-logo"));
      }

      if (text === "Tianjin DSN") {
        replaceFirstIcon(rowFor(span), makeImage(assets.dsnMark, "Tianjin DSN", "brand-mini-logo"));
      }
    });
  };

  const replaceHeadingBrands = () => {
    document.querySelectorAll("h3, h4").forEach((heading) => {
      const text = heading.textContent.trim();
      const row = rowFor(heading);
      const isLargeCard = row?.querySelector(".w-16.h-16");
      const isFooterHeading = heading.tagName.toLowerCase() === "h4";
      const smallClass = "brand-chip-logo";
      const acaClass = isFooterHeading ? smallClass : isLargeCard ? "brand-card-logo-lg" : "brand-card-logo";
      const dsnClass = isFooterHeading ? smallClass : "brand-card-logo";

      if (
        text === "ACA Hydraulic" ||
        text === "ACA Hydraulic LLP" ||
        text === "ACA Hydraulic — Казахстан" ||
        text === "AACA Hydraulic"
      ) {
        replaceFirstIcon(row, makeImage(assets.acaMark, "ACA Hydraulic", acaClass));
      }

      if (text === "Tianjin DSN" || text === "Tianjin DSN — Китай") {
        replaceFirstIcon(row, makeImage(assets.dsnMark, "Tianjin DSN", dsnClass));
      }
    });
  };

  const enhance = () => {
    replaceHeaderLogo();
    replaceFooterLogo();
    replaceTextBrands();
    replaceHeadingBrands();
  };

  const schedule = () => window.requestAnimationFrame(enhance);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", schedule, { once: true });
  } else {
    schedule();
  }

  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
})();
