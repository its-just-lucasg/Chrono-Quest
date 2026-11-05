// ============================================================================
// REBECCA'S CHRONO-QUEST — INTERACTIVE SEMANTIC VERSION (X.Y.Z) PUBLISHER
// Double-click publish-update.bat (or run `node publish-update.js`)
// ============================================================================

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { execSync } = require("child_process");

const projectDir = __dirname;
const swPath = path.join(projectDir, "sw.js");
const htmlPath = path.join(projectDir, "index.html");

const swContent = fs.readFileSync(swPath, "utf8");
const match = swContent.match(/rebecca-chrono-quest-v(\d+)\.(\d+)\.(\d+)/);

const curMajor = match ? parseInt(match[1], 10) : 1;
const curMinor = match ? parseInt(match[2], 10) : 0;
const curPatch = match ? parseInt(match[3], 10) : 1;
const currentVer = `${curMajor}.${curMinor}.${curPatch}`;

const vPatch = `${curMajor}.${curMinor}.${curPatch + 1}`;
const vMinor = `${curMajor}.${curMinor + 1}.0`;
const vMajor = `${curMajor + 1}.0.0`;

console.log("=============================================================");
console.log("  REBECCA'S CHRONO-QUEST — VERSION & GITHUB UPDATE PUBLISHER");
console.log(`  Current Version: v${currentVer}`);
console.log("=============================================================");
console.log(`  [1] Patch Update -> v${vPatch}  (Tiny fixes, typos, text tweaks)`);
console.log(`  [2] Minor Update -> v${vMinor}  (New DLC, new scenes, new photos)`);
console.log(`  [3] Major Update -> v${vMajor}  (Major overhaul)`);
console.log(`  [4] Keep Current -> v${currentVer}  (Push without changing version)`);
console.log(`  [5] Custom X.Y.Z Version`);
console.log("=============================================================");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, ans => resolve(ans.trim())));
}

(async () => {
  const choice = await ask("Select option [1-5] (default 1): ");
  let targetVer = vPatch;

  if (choice === "2") targetVer = vMinor;
  else if (choice === "3") targetVer = vMajor;
  else if (choice === "4") targetVer = currentVer;
  else if (choice === "5") {
    const custom = await ask("Enter custom version (e.g. 1.2.3): ");
    targetVer = custom.replace(/^v/i, "") || vPatch;
  }

  const note = await ask(`Optional commit message (press Enter for "Release v${targetVer}"): `);
  const commitMsg = note || `Release v${targetVer}`;
  rl.close();

  // 1. Update sw.js
  const updatedSw = swContent.replace(
    /rebecca-chrono-quest-v[\d.]+/,
    `rebecca-chrono-quest-v${targetVer}`
  );
  fs.writeFileSync(swPath, updatedSw, "utf8");

  // 2. Update index.html version badge & script cache-busters
  if (fs.existsSync(htmlPath)) {
    const htmlContent = fs.readFileSync(htmlPath, "utf8");
    const updatedHtml = htmlContent
      .replace(
        /<span id="appVersionBadge">v[^<]+<\/span>/,
        `<span id="appVersionBadge">v${targetVer}</span>`
      )
      .replace(/ARCADE SYSTEM v[\d.]+/g, `ARCADE SYSTEM v${targetVer}`)
      .replace(/\?v=[\d.]+/g, `?v=${targetVer}`);
    fs.writeFileSync(htmlPath, updatedHtml, "utf8");
  }

  console.log(`\n-> Updated sw.js and index.html to v${targetVer}`);
  console.log("-> Staging, committing, and pushing to GitHub...\n");

  try {
    execSync("git add .", { cwd: projectDir, stdio: "inherit" });
    execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, { cwd: projectDir, stdio: "inherit" });
    execSync("git push", { cwd: projectDir, stdio: "inherit" });
    console.log(`\n✅ SUCCESS! Published v${targetVer} to GitHub Pages!`);
    console.log("   Live URL: https://its-just-lucasg.github.io/Chrono-Quest/");
  } catch (err) {
    console.error("\n⚠️ Git push note:", err.message);
  }
})();
