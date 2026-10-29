import fs from "fs";

const pkg = {
  name: "workspace-growth-360",
  version: "0.1.0",
  private: true,
  scripts: {
    dev: "next dev",
    build: "next build",
    start: "next start",
    lint: "eslint",
    test: "vitest run",
    "test:watch": "vitest",
  },
  dependencies: {
    bootstrap: "^5.3.8",
    "bootstrap-icons": "^1.13.2",
    gsap: "^3.15.0",
    next: "16.4.3",
    react: "19.3.0",
    "react-dom": "19.3.0",
  },
  devDependencies: {
    "@tailwindcss/turbopack": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    eslint: "^9",
    "eslint-config-next": "16.4.3",
    tailwindcss: "^4",
    typescript: "^5",
    vitest: "^3.2.7",
  },
};

fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");
fs.mkdirSync("public/assets/css", { recursive: true });

function fixCss(src, dest) {
  let s = fs.readFileSync(src, "utf8");
  s = s.replace(/<\/?style>/gi, "");
  s = s.replace(/url\((['"]?)(\.\.\/)?images\//g, "url($1../images/");
  s = s.replace(/url\((['"]?)assets\/images\//g, "url($1../images/");
  fs.writeFileSync(dest, s);
  console.log("wrote", dest, s.length);
}

fixCss("styles/original.css", "public/assets/css/original.css");
fixCss("styles/inner.css", "public/assets/css/inner.css");
console.log("package.json ok", fs.readFileSync("package.json")[0] === 123);
