// ============================================================================
// REBECCA'S CHRONO-QUEST — AUTOMATIC PHOTO BUNDLER & EXIF ORIENTATION FIXER
// Run anytime with: node rebuild-photos.js
// ============================================================================

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function stripExifFromJpeg(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return buf;
  const chunks = [buf.slice(0, 2)];
  let pos = 2;
  while (pos < buf.length) {
    if (buf[pos] !== 0xff) {
      chunks.push(buf.slice(pos));
      break;
    }
    const marker = buf[pos + 1];
    if (marker === 0xda || marker === 0xd9) {
      chunks.push(buf.slice(pos));
      break;
    }
    const len = buf.readUInt16BE(pos + 2);
    if (marker !== 0xe1) {
      chunks.push(buf.slice(pos, pos + 2 + len));
    }
    pos += 2 + len;
  }
  return Buffer.concat(chunks);
}

function readExifOrientation(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return 1;
  let pos = 2;
  while (pos + 4 < buf.length && buf[pos] === 0xff) {
    const marker = buf[pos + 1];
    if (marker === 0xda || marker === 0xd9) break;
    const len = buf.readUInt16BE(pos + 2);
    if (marker === 0xe1 && pos + 10 < buf.length && buf.toString("ascii", pos + 4, pos + 8) === "Exif") {
      const tiff = pos + 10;
      const le = buf.toString("ascii", tiff, tiff + 2) === "II";
      const r16 = o => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
      const r32 = o => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
      const dir = tiff + r32(tiff + 4);
      if (dir + 2 <= buf.length) {
        const count = r16(dir);
        for (let i = 0; i < count; i++) {
          const e = dir + 2 + i * 12;
          if (e + 12 <= buf.length && r16(e) === 0x0112) return r16(e + 8);
        }
      }
    }
    pos += 2 + len;
  }
  return 1;
}

const os = require("os");
const projectDir = __dirname;
const photosDir = path.join(projectDir, "photos");
const tmpDir = path.join(os.tmpdir(), "rebecca_photos_win");
fs.mkdirSync(tmpDir, { recursive: true });

let existingPhotos = {};
const existingPath = path.join(projectDir, "photos-data.js");
if (fs.existsSync(existingPath)) {
  try {
    global.window = {};
    require(existingPath);
    existingPhotos = global.window.MEMORY_PHOTOS || {};
  } catch (e) {}
}

const GROUPS = {
  kitty_hawk: ["kitty hawk 1.jpg", "kitty hawk 2.jpg", "kitty hawk 3.jpg"],
  jinny_joonie_adoption: [
    "jinny and joonie adoption 1.jpg",
    "jinny and joonie adoption 2.jpg",
    "jinny and joonie adoption 3.jpg"
  ],
  billie_adoption: ["billie adoption 1.jpg", "billie adoption 2.jpg", "billie adoption 3.jpg"],
  billie_portrait: ["billie portrait 1.jpg", "Billie portrait 2.jpg", "billie portrait 3.jpg"],
  korea: ["korea 1.jpg", "korea 2.jpg", "korea 3.jpg"],
  tommy_adoption: ["tommy adoption 1.jpg", "tommy adoption 2.dng", "tommy adoption 3.jpg"],
  tommy_portrait: ["tommy portrait 1.jpg", "tommy portrait 2.jpg", "tommy portrait 3.jpg"],
  jinny_portrait: ["jinny portrait 1.jpg", "jinny portrait 2.jpg", "jinny portrait 3.jpg"],
  joonie_portrait: ["joonie portrait 1.jpg", "joonie portrait 2.jpg", "joonie portrait 3.jpg"],
  disney: ["disney 1.jpg", "disney 2.jpg", "disney 3.jpg"],
  cancun: ["cancun 1.jpg", "cancun 2.jpg", "cancun 3.jpg"]
};

function processJpegWindows(srcPath, dstPath, orientation) {
  let rotEnum = 0;
  if (orientation === 6) rotEnum = 1;
  else if (orientation === 3) rotEnum = 2;
  else if (orientation === 8) rotEnum = 3;

  const psScript = [
    "Add-Type -AssemblyName System.Drawing",
    `$img = [System.Drawing.Image]::FromFile('${srcPath.replace(/'/g, "''")}')`,
    `if (${rotEnum} -ne 0) { $img.RotateFlip([System.Drawing.RotateFlipType]${rotEnum}) }`,
    "$scale = [Math]::Min(640.0 / $img.Width, 640.0 / $img.Height)",
    "if ($scale -gt 1.0) { $scale = 1.0 }",
    "$w = [int][Math]::Round($img.Width * $scale); $h = [int][Math]::Round($img.Height * $scale)",
    "$bmp = New-Object System.Drawing.Bitmap($w, $h)",
    "$g = [System.Drawing.Graphics]::FromImage($bmp)",
    "$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic",
    "$g.DrawImage($img, 0, 0, $w, $h); $g.Dispose(); $img.Dispose()",
    `$bmp.Save('${dstPath.replace(/'/g, "''")}', [System.Drawing.Imaging.ImageFormat]::Jpeg); $bmp.Dispose()`
  ].join("\n");

  const psFile = path.join(tmpDir, "resize_one.ps1");
  fs.writeFileSync(psFile, psScript);
  execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${psFile}"`);
}

const photosOut = {};
const groupsOut = {};

for (const [groupKey, files] of Object.entries(GROUPS)) {
  groupsOut[groupKey] = [];
  files.forEach((filename, idx) => {
    const itemKey = `${groupKey}_${idx + 1}`;
    const src = path.join(photosDir, filename);

    if (existingPhotos[itemKey] && groupKey !== "disney") {
      photosOut[itemKey] = existingPhotos[itemKey];
      if (idx === 0) photosOut[groupKey] = existingPhotos[itemKey];
      groupsOut[groupKey].push(itemKey);
      return;
    }

    if (!fs.existsSync(src)) {
      console.warn(`Warning: Missing file ${src}`);
      return;
    }

    const orientation = readExifOrientation(fs.readFileSync(src));
    const dstJpg = path.join(tmpDir, itemKey + ".jpg");
    processJpegWindows(src, dstJpg, orientation);
    const finalBuf = stripExifFromJpeg(fs.readFileSync(dstJpg));
    fs.writeFileSync(dstJpg, finalBuf);

    const dataUrl = "data:image/jpeg;base64," + finalBuf.toString("base64");
    photosOut[itemKey] = dataUrl;
    if (idx === 0) photosOut[groupKey] = dataUrl;
    groupsOut[groupKey].push(itemKey);

    console.log(`Processed ${itemKey} (${filename}, exif=${orientation}): ${(finalBuf.length / 1024).toFixed(1)} KB`);
  });
}

const jsContent =
  "// Auto-generated 8-Bit Memory Photos Bundle (33 Photos in 11 3-Photo Loops)\n" +
  "window.MEMORY_PHOTO_GROUPS = " + JSON.stringify(groupsOut, null, 2) + ";\n" +
  "window.MEMORY_PHOTOS = " + JSON.stringify(photosOut, null, 2) + ";\n";

fs.writeFileSync(path.join(projectDir, "photos-data.js"), jsContent);
console.log("Successfully generated photos-data.js with all 33 photos!");
