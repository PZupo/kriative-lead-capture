// src/ui/Footer.tsx
import React from "react";
import { APP_NAME, APP_VERSION, REPO_URL, COPYRIGHT } from "../lib/version";

const Footer: React.FC = () => {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-[9000] pointer-events-none"
      aria-label="app footer"
    >
      <div className="mx-auto max-w-7xl px-4 pb-3">
        <div
          className="pointer-events-auto mx-auto w-fit rounded-full border px-3 py-1.5 text-xs shadow-sm"
          style={{
            background: "var(--card)",
            color: "var(--fg)",
            borderColor: "var(--border)",
            opacity: 0.9,
          }}
        >
          <span className="font-medium">{APP_NAME}</span>
          <span className="opacity-70"> • {APP_VERSION}</span>
          <span className="opacity-60"> • </span>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-2 hover:underline"
            style={{ color: "var(--fg)" }}
          >
            repositório
          </a>
          <span className="opacity-60"> • {COPYRIGHT}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
