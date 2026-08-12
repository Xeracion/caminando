"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "[data-reveal]:not(.is-revealed)";

/**
 * Mounted once in app/(site)/layout.tsx. Finds every [data-reveal] element
 * and fades/rises it in the first time it scrolls into view.
 *
 * Two things keep it correct beyond the very first paint:
 *  - it re-runs on pathname change, since App Router keeps this layout
 *    mounted across client-side navigations instead of remounting it;
 *  - a MutationObserver catches [data-reveal] elements added later by
 *    client-side re-renders (e.g. OpportunitiesExplorer swapping cards
 *    in/out as someone filters) — without it, those would stay stuck
 *    invisible, since nothing would ever ask to observe them.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    const observeWithin = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => io.observe(el));
    };

    observeWithin(document);

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(SELECTOR)) io.observe(node);
          observeWithin(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
