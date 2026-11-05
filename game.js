// ============================================================================
// REBECCA'S CHRONO-QUEST — RETRO PIXEL SCENE RENDERER & GAME ENGINE
// ============================================================================

class PixelSceneRenderer {
  constructor() {
    this.frame = 0;
    this.currentScene = "morning_kitchen";
    this.currentPhotoKey = null;
    this.viewMode = "16bit"; // "16bit" | "8bit" | "original" | "cartoon"
    this.images = {};
    this.cache16 = {};
    this.cache8 = {};
    this.titleCycleKeys = [
      "cancun", "kitty_hawk", "korea", "jinny_joonie_adoption",
      "billie_adoption", "billie_portrait", "tommy_adoption",
      "jinny_portrait", "joonie_portrait", "tommy_portrait"
    ];

    this.stars = Array.from({ length: 42 }, (_, i) => ({
      x: (i * 97) % 560,
      y: (i * 53) % 160,
      size: (i % 3) + 1,
      speed: 0.2 + (i % 4) * 0.15
    }));

    this.preloadPhotos();
    this.startLoop();
  }

  preloadPhotos() {
    const photos = window.MEMORY_PHOTOS || {};
    Object.entries(photos).forEach(([key, dataUrl]) => {
      const img = new Image();
      img.onload = () => {
        this.images[key] = img;
        this.cache16[key] = this.buildPixelatedCanvas(img, 460, 280, 3, 10);
        this.cache8[key] = this.buildPixelatedCanvas(img, 460, 280, 6, 6);
        if (window.chronoGame) {
          window.chronoGame.refreshPhotoCanvases();
        }
      };
      img.src = dataUrl;
    });
  }

  // Creates an authentic 8-bit/16-bit Bayer-dithered retro version of a photo
  buildPixelatedCanvas(img, outW, outH, pixelSize, levels) {
    const lowW = Math.max(1, Math.floor(outW / pixelSize));
    const lowH = Math.max(1, Math.floor(outH / pixelSize));

    const off = document.createElement("canvas");
    off.width = lowW;
    off.height = lowH;
    const octx = off.getContext("2d");

    // 1. Draw darkened, zoomed cover background so portrait photos have no blank bars
    const coverScale = Math.max(lowW / img.width, lowH / img.height);
    const cw = img.width * coverScale;
    const ch = img.height * coverScale;
    octx.drawImage(img, (lowW - cw) / 2, (lowH - ch) / 2, cw, ch);
    octx.fillStyle = "rgba(14, 9, 28, 0.72)";
    octx.fillRect(0, 0, lowW, lowH);

    // 2. Draw full uncropped photo centered (contain)
    const pad = 2;
    const availW = lowW - pad * 2;
    const availH = lowH - pad * 2;
    const scale = Math.min(availW / img.width, availH / img.height);
    const dw = Math.round(img.width * scale);
    const dh = Math.round(img.height * scale);
    const dx = Math.round((lowW - dw) / 2);
    const dy = Math.round((lowH - dh) / 2);

    octx.drawImage(img, dx, dy, dw, dh);

    // 3. Apply ordered 2x2 Bayer dithering + retro palette quantization
    const imgData = octx.getImageData(0, 0, lowW, lowH);
    const data = imgData.data;
    const bayer = [
      [-12,  4],
      [  8, -4]
    ];
    const step = 255 / (levels - 1);

    for (let y = 0; y < lowH; y++) {
      for (let x = 0; x < lowW; x++) {
        const i = (y * lowW + x) * 4;
        const dither = bayer[y & 1][x & 1];
        // Slight contrast & warm retro boost
        for (let c = 0; c < 3; c++) {
          let v = data[i + c] + dither;
          v = (v - 128) * 1.08 + 128;
          v = Math.max(0, Math.min(255, v));
          data[i + c] = Math.round(Math.round(v / step) * step);
        }
      }
    }
    octx.putImageData(imgData, 0, 0);

    // 4. Upscale with crisp nearest-neighbor pixels onto target canvas
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = outW;
    finalCanvas.height = outH;
    const fctx = finalCanvas.getContext("2d");
    fctx.imageSmoothingEnabled = false;
    fctx.drawImage(off, 0, 0, lowW, lowH, 0, 0, outW, outH);

    // Draw retro pixel frame around the inner photo
    fctx.strokeStyle = "#ffb86c";
    fctx.lineWidth = 3;
    fctx.strokeRect(
      dx * pixelSize,
      dy * pixelSize,
      dw * pixelSize,
      dh * pixelSize
    );
    return finalCanvas;
  }

  cycleViewMode() {
    const order = ["16bit", "8bit", "original", "cartoon"];
    const nextIdx = (order.indexOf(this.viewMode) + 1) % order.length;
    this.viewMode = order[nextIdx];
    const labels = {
      "16bit": "👾 VIEW: 16-BIT RETRO",
      "8bit": "🕹️ VIEW: CHUNKY 8-BIT",
      "original": "📸 VIEW: ORIGINAL PHOTO",
      "cartoon": "🎨 VIEW: PIXEL CARTOON"
    };
    const btn = document.getElementById("btnPixelMode");
    if (btn) btn.textContent = labels[this.viewMode];
    return this.viewMode;
  }

  startLoop() {
    const tick = () => {
      this.frame++;
      this.drawTitleCanvas();
      this.drawSceneCanvas(this.currentScene);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  // Helper to draw a cute retro pixel cat sprite matching real coat markings!
  drawPixelCat(ctx, x, y, bodyColor, label, opts = {}) {
    const bob = Math.sin((this.frame + x) * 0.08) * 2;
    const cy = y + bob;

    if (opts.halo) {
      ctx.fillStyle = "#ffe66d";
      ctx.fillRect(x + 6, cy - 12, 16, 3);
      ctx.fillRect(x + 12, cy - 16, 4, 11);
    }

    if (opts.train) {
      ctx.fillStyle = "#3a86ff";
      ctx.fillRect(x + 4, cy - 8, 20, 5);
      ctx.fillStyle = "#ffbe0b";
      ctx.fillRect(x + 10, cy - 10, 8, 3);
      const puffOffset = (this.frame * 2) % 28;
      ctx.fillStyle = "rgba(255,255,255,0.75)";
      ctx.fillRect(x - 10 - puffOffset, cy - 6 - puffOffset * 0.3, 6, 6);
    }

    // Real coat colors:
    // - Billie (opts.halo): Calico (#222222 black + #e76f51 orange + white)
    // - Tommy (opts.train): Grey & white tuxedo (#5c677d)
    // - Joonie (opts.dirtyEyes): Lighter warm cream / buff (#f9dc9c)
    // - Jinny: Rich ginger-orange tabby (#ea8c38)
    const mainCoat = opts.halo
      ? "#222222"
      : opts.train
      ? "#5c677d"
      : opts.dirtyEyes
      ? "#f9dc9c"
      : "#ea8c38";
    ctx.fillStyle = mainCoat;
    ctx.fillRect(x + 2, cy - 4, 6, 6);
    ctx.fillRect(x + 20, cy - 4, 6, 6);
    ctx.fillRect(x, cy, 28, 20);
    ctx.fillRect(x + 3, cy + 18, 22, 10);

    // Subtle tabby forehead M / stripes for Jinny (darker orange) vs Joonie (soft buff)
    if (!opts.halo && !opts.train) {
      ctx.fillStyle = opts.dirtyEyes ? "#dfb86c" : "#c45b16";
      ctx.fillRect(x + 11, cy + 1, 2, 4);
      ctx.fillRect(x + 15, cy + 1, 2, 4);
      ctx.fillRect(x + 2, cy + 12, 4, 2);
      ctx.fillRect(x + 22, cy + 12, 4, 2);
    }

    // Calico orange patches for Billie
    if (opts.halo) {
      ctx.fillStyle = "#e76f51";
      ctx.fillRect(x + 2, cy + 2, 9, 8);
      ctx.fillRect(x + 18, cy + 10, 8, 7);
    }

    // White tuxedo bib & paws
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x + 7, cy + 13, 14, 11);
    ctx.fillRect(x + 5, cy + 25, 6, 3);
    ctx.fillRect(x + 17, cy + 25, 6, 3);

    // Tail wagging
    ctx.fillStyle = mainCoat;
    const tailWag = Math.sin(this.frame * 0.12 + x) * 4;
    ctx.fillRect(x + 26, cy + 8 + tailWag * 0.4, 7, 4);
    ctx.fillRect(x + 31, cy + 2 + tailWag, 4, 8);

    // Eyes
    ctx.fillStyle = opts.halo || opts.train ? "#d9ed92" : "#111";
    ctx.fillRect(x + 6, cy + 6, 4, 4);
    ctx.fillRect(x + 18, cy + 6, 4, 4);

    if (opts.dirtyEyes) {
      ctx.fillStyle = "#7f4f24";
      ctx.fillRect(x + 9, cy + 10, 3, 2);
      ctx.fillRect(x + 17, cy + 10, 3, 2);
    }

    ctx.fillStyle = opts.halo ? "#333" : "#ff79c6";
    ctx.fillRect(x + 12, cy + 10, 4, 3);

    if (label) {
      ctx.font = '8px "Press Start 2P", monospace';
      ctx.fillStyle = "#f1fa8c";
      ctx.textAlign = "center";
      ctx.fillText(label, x + 14, y + 40);
    }
  }

  drawPhotoToCanvas(ctx, photoKey, w, h, mode) {
    const img = this.images[photoKey];
    if (!img) return false;

    if (mode === "16bit" && this.cache16[photoKey]) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(this.cache16[photoKey], 0, 0, w, h);
      return true;
    }
    if (mode === "8bit" && this.cache8[photoKey]) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(this.cache8[photoKey], 0, 0, w, h);
      return true;
    }
    if (mode === "original") {
      ctx.imageSmoothingEnabled = true;
      const coverScale = Math.max(w / img.width, h / img.height);
      ctx.drawImage(img, (w - img.width * coverScale) / 2, (h - img.height * coverScale) / 2, img.width * coverScale, img.height * coverScale);
      ctx.fillStyle = "rgba(14, 9, 28, 0.75)";
      ctx.fillRect(0, 0, w, h);

      const pad = 8;
      const scale = Math.min((w - pad * 2) / img.width, (h - pad * 2) / img.height);
      const dw = img.width * scale, dh = img.height * scale;
      const dx = (w - dw) / 2, dy = (h - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.strokeStyle = "#ffb86c";
      ctx.lineWidth = 3;
      ctx.strokeRect(dx, dy, dw, dh);
      return true;
    }
    return false;
  }

  // Helper to draw Rebecca & Lucas pixel characters
  drawCouple(ctx, x, y) {
    const bob = Math.sin(this.frame * 0.07) * 1.5;
    // Rebecca (with birthday crown!)
    ctx.fillStyle = "#ffd166"; // Crown
    ctx.fillRect(x + 4, y - 9 + bob, 16, 5);
    ctx.fillStyle = "#f4a261"; // Hair
    ctx.fillRect(x + 2, y - 4 + bob, 20, 12);
    ctx.fillStyle = "#ffcad4"; // Face
    ctx.fillRect(x + 5, y + bob, 14, 12);
    ctx.fillStyle = "#ff79c6"; // Outfit
    ctx.fillRect(x + 3, y + 12 + bob, 18, 18);

    // Floating Pixel Heart between them
    const heartY = y - 10 + Math.sin(this.frame * 0.1) * 3;
    ctx.fillStyle = "#ff4d8d";
    ctx.fillRect(x + 27, heartY, 4, 4);
    ctx.fillRect(x + 33, heartY, 4, 4);
    ctx.fillRect(x + 25, heartY + 2, 14, 4);
    ctx.fillRect(x + 28, heartY + 6, 8, 3);
    ctx.fillRect(x + 30, heartY + 9, 4, 2);

    // Lucas
    const lx = x + 42;
    ctx.fillStyle = "#5c3c24"; // Hair
    ctx.fillRect(lx + 2, y - 4 - bob, 20, 8);
    ctx.fillStyle = "#ffcad4"; // Face
    ctx.fillRect(lx + 5, y - bob, 14, 12);
    ctx.fillStyle = "#4cc9f0"; // Outfit
    ctx.fillRect(lx + 3, y + 12 - bob, 18, 18);
  }
  drawBirthdayCake(ctx, x, y) {
    // Cake stand / plate
    ctx.fillStyle = "#8be9fd";
    ctx.fillRect(x - 6, y + 26, 56, 4);
    // Bottom tier (vanilla/cream)
    ctx.fillStyle = "#fff3b0";
    ctx.fillRect(x, y + 12, 44, 14);
    // Pink strawberry frosting wave
    ctx.fillStyle = "#ff79c6";
    ctx.fillRect(x, y + 12, 44, 5);
    // Top tier
    ctx.fillStyle = "#fff3b0";
    ctx.fillRect(x + 8, y + 2, 28, 10);
    ctx.fillStyle = "#ff4d8d";
    ctx.fillRect(x + 8, y + 2, 28, 4);
    // 3 Candles
    [x + 13, x + 21, x + 29].forEach((cx, i) => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(cx, y - 6, 3, 8);
      // Flickering flame
      const flicker = Math.sin(this.frame * 0.22 + i * 2) * 1.5;
      ctx.fillStyle = "#ffe66d";
      ctx.fillRect(cx - 1, y - 11 + flicker, 5, 5);
      ctx.fillStyle = "#ff9f1c";
      ctx.fillRect(cx, y - 9 + flicker, 3, 3);
    });
  }

  drawTitleCanvas() {
    const canvas = document.getElementById("titleCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#100726");
    grad.addColorStop(1, "#2a144a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    this.stars.forEach(s => {
      const alpha = 0.4 + 0.6 * Math.abs(Math.sin(this.frame * 0.04 + s.x));
      ctx.fillStyle = `rgba(255, 245, 190, ${alpha})`;
      ctx.fillRect(s.x, s.y, s.size, s.size);
    });

    // Retro synthwave horizon grid
    ctx.fillStyle = "#1d0f36";
    ctx.fillRect(0, 165, w, 65);
    ctx.strokeStyle = "rgba(255, 121, 198, 0.35)";
    ctx.lineWidth = 1;
    for (let y = 165; y < h; y += 14) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Billie Starlight Cat in the sky
    this.drawPixelCat(ctx, 265, 24, "#ffd166", "★ BILLIE ★", { halo: true });

    // Rebecca & Lucas + Birthday Cake in center!
    this.drawCouple(ctx, 212, 126);
    this.drawBirthdayCake(ctx, 292, 128);

    // Jinny (by his food bowl), lighter-cream Joonie (cuddle bug), and Tommy (Choo Choo!)
    this.drawPixelCat(ctx, 52, 134, "#ea8c38", "JINNY", {});
    ctx.fillStyle = "#e63946";
    ctx.fillRect(88, 154, 16, 8);

    this.drawPixelCat(ctx, 132, 134, "#f9dc9c", "JOONIE", { dirtyEyes: true });

    const tommyX = 395 + Math.sin(this.frame * 0.09) * 34;
    this.drawPixelCat(ctx, tommyX, 134, "#5c677d", "CHOO CHOO!", { train: true });

    ctx.font = '10px "Press Start 2P", monospace';
    ctx.fillStyle = "#8be9fd";
    ctx.textAlign = "center";
    ctx.fillText("2021 OBX • 2023 KOREA • 2025 DISNEY • 2026 CANCUN", w / 2, 218);
  }

  drawSceneCanvas(sceneType) {
    const canvas = document.getElementById("sceneCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;

    ctx.fillStyle = "#120c24";
    ctx.fillRect(0, 0, w, h);

    // Only display a photo when this specific scene has a matching photoKey!
    const rawKey = this.currentPhotoKey;
    let activePhotoKey = null;
    let slideBadge = null;

    if (rawKey) {
      const group = Array.isArray(rawKey)
        ? rawKey
        : (window.MEMORY_PHOTO_GROUPS && window.MEMORY_PHOTO_GROUPS[rawKey]) || [rawKey];
      const subIdx = Math.floor(this.frame / 190) % group.length;
      activePhotoKey = group[subIdx];
      if (group.length > 1) {
        slideBadge = `📷 ${subIdx + 1}/${group.length}`;
      }
    }

    if (activePhotoKey && this.viewMode !== "cartoon" && this.drawPhotoToCanvas(ctx, activePhotoKey, w, h, this.viewMode)) {
      if (slideBadge) {
        ctx.fillStyle = "rgba(14, 9, 28, 0.82)";
        ctx.fillRect(w - 78, h - 24, 70, 18);
        ctx.strokeStyle = "#ffb86c";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(w - 78, h - 24, 70, 18);
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.fillStyle = "#f1fa8c";
        ctx.textAlign = "center";
        ctx.fillText(slideBadge, w - 43, h - 11);
      }
      return;
    }

    if (sceneType === "disney_castle") {
      ctx.fillStyle = "#0b132b";
      ctx.fillRect(0, 0, w, h);
      this.stars.forEach((s, i) => {
        ctx.fillStyle = ["#ffd166", "#ff79c6", "#4cc9f0"][i % 3];
        ctx.fillRect(s.x % w, s.y, 4, 4);
      });
      // Pixel Cinderella Castle spires
      ctx.fillStyle = "#e0e1dd";
      ctx.fillRect(175, 95, 110, 95);
      ctx.fillRect(212, 48, 36, 50);
      ctx.fillStyle = "#3a86ff";
      ctx.fillRect(170, 75, 24, 22);
      ctx.fillRect(266, 75, 24, 22);
      ctx.fillRect(216, 22, 28, 28);
      ctx.fillStyle = "#ffd166";
      ctx.fillRect(228, 8, 4, 16);
      this.drawCouple(ctx, 198, 165);
      return;
    }

    if (sceneType === "kitty_hawk") {
      // Sky & Atlantic Ocean
      ctx.fillStyle = "#48cae4";
      ctx.fillRect(0, 0, w, 135);
      ctx.fillStyle = "#0077b6";
      ctx.fillRect(0, 135, w, 45);
      // Dunes
      ctx.fillStyle = "#f4e285";
      ctx.fillRect(0, 180, w, 70);
      // Animated Wright Brothers Biplane
      const planeX = ((this.frame * 1.4) % (w + 80)) - 40;
      ctx.fillStyle = "#fff";
      ctx.fillRect(planeX, 42, 46, 6);
      ctx.fillRect(planeX + 4, 54, 46, 6);
      ctx.fillStyle = "#e63946";
      ctx.fillRect(planeX + 18, 46, 12, 10);
      this.drawCouple(ctx, 195, 158);
      this.drawPixelCat(ctx, 90, 170, "#f4a261", "JINNY", {});
      this.drawPixelCat(ctx, 320, 170, "#e5e5e5", "JOONIE", { dirtyEyes: true });
      return;
    }

    if (sceneType === "billie_star") {
      ctx.fillStyle = "#0b071d";
      ctx.fillRect(0, 0, w, h);
      this.stars.forEach(s => {
        ctx.fillStyle = "#ffe66d";
        ctx.fillRect(s.x % w, s.y, s.size + 1, s.size + 1);
      });
      // Golden constellation aura
      ctx.fillStyle = "rgba(255, 209, 102, 0.16)";
      ctx.beginPath();
      ctx.arc(w / 2, 95, 62 + Math.sin(this.frame * 0.05) * 6, 0, Math.PI * 2);
      ctx.fill();
      this.drawPixelCat(ctx, w / 2 - 14, 72, "#ffd166", "★ SWEET BILLIE ★", { halo: true });
      this.drawCouple(ctx, w / 2 - 32, 175);
      return;
    }

    if (sceneType === "seoul_2023") {
      // Neon Seoul Skyline
      ctx.fillStyle = "#190a28";
      ctx.fillRect(0, 0, w, h);
      // Namsan Seoul Tower
      ctx.fillStyle = "#ff4d8d";
      ctx.fillRect(224, 30, 12, 110);
      ctx.fillStyle = "#00f5d4";
      ctx.fillRect(212, 55, 36, 14);
      ctx.fillRect(228, 12, 4, 20);
      // Neon buildings & lanterns
      [40, 95, 150, 290, 355].forEach((bx, idx) => {
        ctx.fillStyle = idx % 2 === 0 ? "#2b193d" : "#231942";
        ctx.fillRect(bx, 90 + (idx % 3) * 15, 45, 110);
      });
      ctx.fillStyle = "#2d1e3e";
      ctx.fillRect(0, 190, w, 60);
      this.drawCouple(ctx, 198, 165);
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillStyle = "#ff4d8d";
      ctx.textAlign = "center";
      ctx.fillText("SEOUL 2023 // COFFEE & PASTA", w / 2, 236);
      return;
    }

    if (sceneType === "tommy_train") {
      ctx.fillStyle = "#132a13";
      ctx.fillRect(0, 0, w, h);
      // Train tracks
      ctx.fillStyle = "#4f772d";
      ctx.fillRect(0, 175, w, 75);
      ctx.fillStyle = "#8d5b4c";
      for (let tx = 0; tx < w; tx += 24) {
        ctx.fillRect(tx, 186, 12, 14);
      }
      ctx.fillStyle = "#adb5bd";
      ctx.fillRect(0, 188, w, 3);
      ctx.fillRect(0, 196, w, 3);
      // Thomas the Tank Engine zooming Tommy!
      const trainX = ((this.frame * 4.2) % (w + 120)) - 60;
      ctx.fillStyle = "#3a86ff";
      ctx.fillRect(trainX - 36, 150, 76, 34);
      ctx.fillStyle = "#e63946";
      ctx.fillRect(trainX - 36, 180, 76, 6);
      this.drawPixelCat(ctx, trainX - 10, 132, "#9d8189", "CHOO CHOO!", { train: true });
      this.drawCouple(ctx, 195, 110);
      return;
    }
    if (sceneType === "cancun_beach") {
      // Sunset sky & turquoise Caribbean ocean
      const grad = ctx.createLinearGradient(0, 0, 0, 140);
      grad.addColorStop(0, "#ff9f1c");
      grad.addColorStop(1, "#ffbf69");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, 130);
      // Sun
      ctx.fillStyle = "#fff3b0";
      ctx.beginPath(); ctx.arc(w / 2, 95, 34, 0, Math.PI * 2); ctx.fill();
      // Turquoise sea
      ctx.fillStyle = "#2ec4b6";
      ctx.fillRect(0, 130, w, 48);
      // White sand beach
      ctx.fillStyle = "#cbf3f0";
      ctx.fillRect(0, 178, w, 72);
      // Palm tree trunk & fronds
      ctx.fillStyle = "#8d5b4c";
      ctx.fillRect(65, 85, 10, 95);
      ctx.fillStyle = "#38b000";
      ctx.fillRect(40, 75, 60, 14);
      this.drawCouple(ctx, 198, 158);
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillStyle = "#171226";
      ctx.textAlign = "center";
      ctx.fillText("2026 CANCUN // 5-YEAR ANNIVERSARY", w / 2, 236);
      return;
    }

    if (sceneType === "cat_kingdom") {
      ctx.fillStyle = "#240046";
      ctx.fillRect(0, 0, w, h);
      // Castle battlements
      ctx.fillStyle = "#5a189a";
      ctx.fillRect(70, 60, 320, 130);
      for (let cx = 70; cx < 390; cx += 40) {
        ctx.fillRect(cx, 42, 24, 20);
      }
      this.drawCouple(ctx, 198, 120);
      this.drawPixelCat(ctx, 95, 155, "#f4a261", "LORD JINNY", {});
      this.drawPixelCat(ctx, 205, 165, "#e5e5e5", "DUKE JOONIE", { dirtyEyes: true });
      this.drawPixelCat(ctx, 325, 155, "#9d8189", "SIR CHOO-CHOO", { train: true });
      return;
    }

    if (sceneType === "time_portal") {
      ctx.fillStyle = "#090414";
      ctx.fillRect(0, 0, w, h);
      // Spinning concentric time rings
      const colors = ["#ff79c6", "#8be9fd", "#f1fa8c", "#bd93f9"];
      colors.forEach((col, idx) => {
        ctx.strokeStyle = col;
        ctx.lineWidth = 3;
        ctx.beginPath();
        const radius = 26 + idx * 22 + Math.sin(this.frame * 0.08 + idx) * 5;
        ctx.arc(w / 2, h / 2 - 10, radius, 0, Math.PI * 2);
        ctx.stroke();
      });
      this.drawCouple(ctx, w / 2 - 32, h / 2 - 22);
      return;
    }

    if (sceneType === "birthday_finale" || sceneType === "future_2076") {
      ctx.fillStyle = "#1f1135";
      ctx.fillRect(0, 0, w, h);
      // Falling pixel confetti
      this.stars.forEach((s, idx) => {
        const cy = (s.y + this.frame * 1.3) % h;
        ctx.fillStyle = ["#ff79c6", "#8be9fd", "#f1fa8c", "#50fa7b"][idx % 4];
        ctx.fillRect(s.x % w, cy, 4, 4);
      });
      // Birthday Table & Cake
      ctx.fillStyle = "#5c3c24";
      ctx.fillRect(140, 178, 180, 42);
      ctx.fillStyle = "#fff";
      ctx.fillRect(210, 154, 40, 24);
      ctx.fillStyle = "#ff79c6";
      ctx.fillRect(210, 162, 40, 6);
      // Candle flame
      ctx.fillStyle = "#ffe66d";
      ctx.fillRect(228, 142 + Math.sin(this.frame * 0.2) * 2, 4, 12);

      this.drawCouple(ctx, 198, 112);
      this.drawPixelCat(ctx, 55, 168, "#f4a261", "JINNY", {});
      this.drawPixelCat(ctx, 110, 168, "#e5e5e5", "JOONIE", { dirtyEyes: true });
      this.drawPixelCat(ctx, 335, 168, "#9d8189", "CHOO CHOO!", { train: true });
      this.drawPixelCat(ctx, 385, 32, "#ffd166", "★ BILLIE", { halo: true });
      return;
    }

    // Default: Cozy Morning Kitchen & Cats Trio + Birthday Cake!
    ctx.fillStyle = "#231938";
    ctx.fillRect(0, 0, w, 195);
    ctx.fillStyle = "#3c2a56";
    ctx.fillRect(0, 195, w, 85);
    // Window with morning sky
    ctx.fillStyle = "#8be9fd";
    ctx.fillRect(34, 24, 82, 64);
    // Kitchen counter with Birthday Cake & Coffee mug!
    ctx.fillStyle = "#5c3c24";
    ctx.fillRect(145, 162, 165, 34);
    this.drawBirthdayCake(ctx, 238, 132);
    this.drawCouple(ctx, 162, 132);
    this.drawPixelCat(ctx, 55, 196, "#ea8c38", "JINNY", {});
    this.drawPixelCat(ctx, 205, 196, "#f9dc9c", "JOONIE", { dirtyEyes: true });
    const tx = 355 + Math.sin(this.frame * 0.12) * 28;
    this.drawPixelCat(ctx, tx, 196, "#5c677d", "CHOO CHOO!", { train: true });
  }
}
class ChronoQuestGame {
  constructor() {
    this.storageKey = "rebecca_chrono_quest_save_v1";
    this.config = { ...window.DEFAULT_GAME_CONFIG };
    this.currentNodeId = "start";
    this.history = [];
    this.inventory = [];
    this.unlockedEndings = [];
    this.visitedNodes = [];
    this.unlockedPhotos = [];
    this.typingTimer = null;
    this.isTyping = false;
    this.fullFormattedText = "";

    this.renderer = new PixelSceneRenderer();
    this.loadSavedState();
    this.bindEvents();
    this.renderHudEndingsCount();
    this.renderHudGalleryCount();
    this.populateCatDex();
    this.populateBirthdayCard();
  }

  loadSavedState() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.inventory)) this.inventory = parsed.inventory;
        if (Array.isArray(parsed.unlockedEndings)) this.unlockedEndings = parsed.unlockedEndings;
        if (Array.isArray(parsed.visitedNodes)) this.visitedNodes = parsed.visitedNodes;
        if (Array.isArray(parsed.unlockedPhotos)) this.unlockedPhotos = parsed.unlockedPhotos;
        if (parsed.currentNodeId && window.STORY_NODES[parsed.currentNodeId]) {
          this.currentNodeId = parsed.currentNodeId;
        }
        const hasProgress =
          this.currentNodeId !== "start" ||
          this.inventory.length > 0 ||
          this.unlockedEndings.length > 0 ||
          this.unlockedPhotos.length > 0;
        const btnCont = document.getElementById("btnContinueGame");
        if (btnCont && hasProgress) {
          btnCont.style.display = "inline-block";
        }
      }
    } catch (e) {
      console.warn("Could not read save state:", e);
    }
  }

  saveState() {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify({
          currentNodeId: this.currentNodeId,
          inventory: this.inventory,
          unlockedEndings: this.unlockedEndings,
          visitedNodes: this.visitedNodes,
          unlockedPhotos: this.unlockedPhotos
        })
      );
    } catch (e) {
      console.warn("Could not save state:", e);
    }
  }

  formatText(str) {
    if (!str) return "";
    return str
      .replace(/\{wife\}/g, this.config.wifeName)
      .replace(/\{husband\}/g, this.config.husbandName)
      .replace(/\{drink\}/g, this.config.favDrink)
      .replace(/\{food\}/g, this.config.favFood);
  }

  markdownBoldToHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--accent-gold);">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em style="color:var(--accent-secondary);">$1</em>');
  }

  startGame(resetRun = false, keepEndings = false) {
    window.retroAudio.playSelect();
    if (resetRun) {
      this.currentNodeId = "start";
      this.history = [];
      this.inventory = [];
      if (!keepEndings) {
        this.unlockedEndings = [];
        this.visitedNodes = [];
        this.unlockedPhotos = [];
      }
      this.saveState();
      this.renderInventory();
      this.renderHudEndingsCount();
      this.renderHudGalleryCount();
    }
    document.body.classList.remove("on-splash");
    document.getElementById("titleScreen").classList.remove("active");
    document.getElementById("gameScreen").classList.add("active");
    this.goToNode(this.currentNodeId, false);
  }

  goToNode(nodeId, recordHistory = true) {
    const node = window.STORY_NODES[nodeId];
    if (!node) return;

    if (recordHistory && this.currentNodeId) {
      this.history.push(this.currentNodeId);
    }
    this.currentNodeId = nodeId;
    if (!this.visitedNodes.includes(nodeId)) {
      this.visitedNodes.push(nodeId);
    }

    // Trigger sound effect for node (Happy Birthday song is reserved only for Lucas's Note modal!)
    if (node.sfx === "warp") window.retroAudio.playTimeWarp();
    else if (node.sfx === "meow") window.retroAudio.playCatMeow();
    else if (node.sfx === "choochoo") window.retroAudio.playChooChoo();

    // Update theme class on body
    const crtOn = document.body.classList.contains("crt-enabled");
    document.body.className = `${node.theme || "theme-birthday"}${crtOn ? " crt-enabled" : ""}`;

    // Update HUD
    document.getElementById("hudEra").textContent = node.era || "2026";
    document.getElementById("hudLocation").textContent = node.location || "TIMELINE";
    document.getElementById("sceneBadge").textContent = node.isEnding ? "🏆 ENDING UNLOCKED" : "CHRONO-VIEWPORT";
    document.getElementById("sceneYearTag").textContent = node.yearTag || "YR: 2026";
    document.getElementById("sceneCaption").textContent = this.formatText(node.caption || "");
    document.getElementById("hudCoffeeBar").style.width = `${node.coffee || 90}%`;
    document.getElementById("hudLoveBar").style.width = `${node.love || 100}%`;

    // Update Canvas Scene, Photo Key & Zone Chiptune Soundtrack!
    this.renderer.currentScene = node.sceneType || "morning_kitchen";
    this.renderer.currentPhotoKey = node.photoKey || null;
    if (node.photoKey && !this.unlockedPhotos.includes(node.photoKey)) {
      this.unlockedPhotos.push(node.photoKey);
      this.renderHudGalleryCount();
    }

    const nodeToTrack = {
      start: "happy_birthday",
      kitchen_prep: "happy_birthday",
      feed_jinny: "kitty_ragtime",
      cuddle_joonie: "kitty_ragtime",
      zoom_tommy: "thomas_locomotive",
      chrono_hub: "warp_zone",
      era_2021_hub: "ocean_waltz",
      kitty_hawk_2021: "ocean_waltz",
      adopt_2021: "kitty_ragtime",
      era_2022_billie: "starlight_musicbox",
      era_2023_korea: "seoul_pentatonic",
      korea_cafe_hop: "seoul_pentatonic",
      era_2024_tommy: "thomas_locomotive",
      era_2025_disney: "disney_wishes",
      disney_park_hop: "disney_wishes",
      era_2026_cancun: "wedding_march",
      alt_cat_kingdom: "castle_minuet",
      finale_hub: "happy_birthday",
      ending_true_node: "happy_birthday",
      ending_starlight_node: "starlight_musicbox",
      ending_cat_empress_node: "castle_minuet",
      ending_seoul_node: "seoul_pentatonic",
      ending_cancun_node: "wedding_march",
      ending_choo_choo_node: "thomas_locomotive",
      ending_2076_node: "auld_lang_syne",
      ending_disney_node: "disney_wishes"
    };
    window.retroAudio.setMusicTrack(nodeToTrack[nodeId] || "happy_birthday", true);

    // Handle Item Pickup
    const toast = document.getElementById("itemToast");
    if (node.giveItem && window.ITEMS_CATALOG[node.giveItem]) {
      const itemObj = window.ITEMS_CATALOG[node.giveItem];
      if (!this.inventory.includes(node.giveItem)) {
        this.inventory.push(node.giveItem);
        window.retroAudio.playItemGet();
        toast.textContent = `✨ SOUVENIR COLLECTED: ${itemObj.icon} ${itemObj.name}!`;
        toast.style.display = "block";
      } else {
        toast.style.display = "none";
      }
    } else {
      toast.style.display = "none";
    }

    // Handle Ending Unlock
    if (node.isEnding && node.endingId) {
      if (!this.unlockedEndings.includes(node.endingId)) {
        this.unlockedEndings.push(node.endingId);
      }
      this.renderHudEndingsCount();
    }

    this.renderInventory();
    this.saveState();

    // Render Story Title & Typewriter Text
    document.getElementById("storyTitle").textContent = this.formatText(node.title);
    this.startTypewriter(this.formatText(node.text));

    // Render Choices
    this.renderChoices(node);
  }
  startTypewriter(rawText) {
    if (this.typingTimer) clearInterval(this.typingTimer);
    this.fullFormattedText = rawText;
    this.isTyping = true;

    const storyTextEl = document.getElementById("storyText");
    const indicatorEl = document.getElementById("typingIndicator");
    storyTextEl.innerHTML = "";
    indicatorEl.style.visibility = "visible";

    let idx = 0;
    this.typingTimer = setInterval(() => {
      idx += 2;
      if (idx >= rawText.length) {
        this.finishTypewriter();
        return;
      }
      const slice = rawText.slice(0, idx);
      storyTextEl.innerHTML = this.markdownBoldToHtml(slice);
      if (idx % 6 === 0) {
        window.retroAudio.playTypeChar(rawText[idx]);
      }
    }, 18);
  }

  finishTypewriter() {
    if (this.typingTimer) clearInterval(this.typingTimer);
    this.typingTimer = null;
    this.isTyping = false;
    const storyTextEl = document.getElementById("storyText");
    const indicatorEl = document.getElementById("typingIndicator");
    storyTextEl.innerHTML = this.markdownBoldToHtml(this.fullFormattedText);
    indicatorEl.style.visibility = "hidden";
  }

  renderChoices(node) {
    const listEl = document.getElementById("choicesList");
    listEl.innerHTML = "";

    (node.choices || []).forEach(choice => {
      if (choice.reqItem && !this.inventory.includes(choice.reqItem)) {
        return;
      }
      if (choice.hideIfItem && this.inventory.includes(choice.hideIfItem)) {
        return;
      }
      const isVisited =
        choice.next &&
        choice.next !== "chrono_hub" &&
        !choice.action &&
        this.visitedNodes.includes(choice.next);

      const btn = document.createElement("button");
      btn.className =
        "choice-btn" +
        (choice.reqItem ? " secret-choice" : "") +
        (isVisited ? " visited-choice" : "");

      const textSpan = document.createElement("span");
      textSpan.textContent = this.formatText(choice.text);

      const tagSpan = document.createElement("span");
      tagSpan.className = "choice-tag" + (isVisited ? " visited-tag" : "");
      const baseTag = choice.tag || "GO";
      tagSpan.textContent = isVisited ? `✓ VISITED • ${baseTag}` : baseTag;

      btn.appendChild(textSpan);
      btn.appendChild(tagSpan);

      btn.addEventListener("mouseenter", () => window.retroAudio.playHover());
      btn.addEventListener("click", () => {
        if (choice.sfx === "choochoo") window.retroAudio.playChooChoo();
        else window.retroAudio.playSelect();

        if (choice.action === "open_card") {
          this.openModal("modalBirthdayCard");
          return;
        }
        if (choice.action === "open_dlc") {
          this.openModal("modalDlc");
          return;
        }
        if (choice.checkBoosWarning) {
          const morningChecks = [
            { item: "iced_coffee", label: "☕ Drink your morning Coffee" },
            { item: "jinny_treats", label: "🐟 Give Jinny his boos foos" },
            { item: "joonie_tissue", label: "🤍 Clean Joonie's dirty eyes & cuddle" },
            { item: "choo_choo_whistle", label: "🚂 Check on Tommy ('Choo Choo!')" }
          ];
          const missing = morningChecks.filter(m => !this.inventory.includes(m.item));
          if (missing.length > 0) {
            this.pendingJumpTarget = choice.next;
            const listDiv = document.getElementById("boosRemainingList");
            if (listDiv) {
              listDiv.innerHTML =
                `<div style="font-family:var(--font-pixel);font-size:9px;color:var(--accent-primary);margin-bottom:6px;">STILL UNCHECKED THIS MORNING:</div>` +
                missing.map(m => `<div>• ${m.label}</div>`).join("");
            }
            this.openModal("modalBoosWarning");
            return;
          }
        }
        this.goToNode(choice.next, true);
      });

      listEl.appendChild(btn);
    });
  }

  renderInventory() {
    const listEl = document.getElementById("inventoryList");
    const countEl = document.getElementById("inventoryCount");
    countEl.textContent = `${this.inventory.length} ITEMS`;

    if (this.inventory.length === 0) {
      listEl.innerHTML = `<div class="empty-inventory">No souvenirs collected yet! Explore timelines to find items.</div>`;
      return;
    }

    listEl.innerHTML = "";
    this.inventory.forEach(itemId => {
      const item = window.ITEMS_CATALOG[itemId];
      if (!item) return;
      const badge = document.createElement("div");
      badge.className = "inv-badge";
      badge.title = item.desc;
      badge.innerHTML = `<span>${item.icon}</span><span>${item.name}</span>`;
      listEl.appendChild(badge);
    });
  }

  renderHudEndingsCount() {
    const total = Object.keys(window.ENDINGS_CATALOG).length;
    const el = document.getElementById("endingsCountHud");
    if (el) el.textContent = `${this.unlockedEndings.length}/${total}`;
  }

  renderHudGalleryCount() {
    const total = (window.PHOTO_SCRAPBOOK_LIST || []).length;
    const el = document.getElementById("galleryCountHud");
    if (el) el.textContent = `${this.unlockedPhotos.length}/${total}`;
  }

  refreshPhotoCanvases() {
    this.populateCatDex();
    this.populatePhotoGallery();
  }

  populateCatDex() {
    const container = document.getElementById("catDexContent");
    if (!container) return;
    if (this.catDexTimer) clearInterval(this.catDexTimer);
    const grid = document.createElement("div");
    grid.className = "cat-dex-grid";
    const renderFns = [];

    window.CAT_DEX_DATA.forEach(cat => {
      const group = (window.MEMORY_PHOTO_GROUPS && window.MEMORY_PHOTO_GROUPS[cat.photoKey]) || [cat.photoKey];
      let photoIdx = 0;
      let mode = "16bit";

      const card = document.createElement("div");
      card.className = "cat-card";
      card.innerHTML = `
        <h3>${cat.icon} ${cat.name}</h3>
        <div class="cat-meta">${cat.joined} // ${cat.title}</div>
        <canvas width="320" height="200" class="cat-portrait-canvas" title="Click to cycle photos & 8-Bit / Original mode"></canvas>
        <p style="margin-bottom:8px;">${cat.bio}</p>
        <div class="cat-meta" style="color:var(--accent-green);">SPECIAL MOVE: ${cat.specialMove}</div>
      `;
      const cvs = card.querySelector("canvas");
      const renderPortrait = () => {
        const ctx = cvs.getContext("2d");
        ctx.fillStyle = "#090612";
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        const key = group[photoIdx % group.length];
        this.renderer.drawPhotoToCanvas(ctx, key, cvs.width, cvs.height, mode);
        ctx.fillStyle = "rgba(14, 9, 28, 0.82)";
        ctx.fillRect(cvs.width - 66, cvs.height - 22, 60, 16);
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.fillStyle = "#f1fa8c";
        ctx.textAlign = "center";
        ctx.fillText(`${(photoIdx % group.length) + 1}/${group.length}`, cvs.width - 36, cvs.height - 10);
      };
      renderPortrait();
      renderFns.push(() => {
        photoIdx = (photoIdx + 1) % group.length;
        renderPortrait();
      });
      cvs.addEventListener("click", () => {
        photoIdx = (photoIdx + 1) % group.length;
        if (photoIdx === 0) {
          mode = mode === "16bit" ? "original" : "16bit";
        }
        if (cat.id === "tommy") window.retroAudio.playChooChoo();
        else window.retroAudio.playCatMeow();
        renderPortrait();
      });
      grid.appendChild(card);
    });
    container.innerHTML = "";
    container.appendChild(grid);
    this.catDexTimer = setInterval(() => {
      const modal = document.getElementById("modalCatDex");
      if (modal && modal.style.display !== "none") {
        renderFns.forEach(fn => fn());
      }
    }, 3000);
  }

  populatePhotoGallery(forceMode = null) {
    const container = document.getElementById("photoGalleryContent");
    if (!container) return;
    if (this.galleryTimer) clearInterval(this.galleryTimer);
    container.innerHTML = "";
    this.galleryGlobalMode = forceMode || this.galleryGlobalMode || "16bit";
    const renderFns = [];

    (window.PHOTO_SCRAPBOOK_LIST || []).forEach(item => {
      const isUnlocked = this.unlockedPhotos.includes(item.key);
      const group = (window.MEMORY_PHOTO_GROUPS && window.MEMORY_PHOTO_GROUPS[item.key]) || [item.key];
      let photoIdx = 0;
      let cardMode = this.galleryGlobalMode;

      const card = document.createElement("div");
      card.className = "gallery-card";
      card.innerHTML = `
        <canvas width="360" height="225"></canvas>
        <div class="gallery-card-title">${isUnlocked ? item.title : "🔒 ??? MYSTERY MEMORY ???"}</div>
        <div class="gallery-card-sub">${
          isUnlocked
            ? `${item.sub} <span style="color:var(--accent-secondary);font-size:14px;">[Click: Next Photo]</span>`
            : "Explore timelines in the story to unlock this memory!"
        }</div>
      `;
      const cvs = card.querySelector("canvas");

      if (!isUnlocked) {
        const ctx = cvs.getContext("2d");
        ctx.fillStyle = "#06040a";
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        // Retro pixel mystery box with glowing "?"
        const bx = (cvs.width - 84) / 2;
        const by = (cvs.height - 84) / 2 - 8;
        ctx.fillStyle = "#161026";
        ctx.fillRect(bx, by, 84, 84);
        ctx.strokeStyle = "#4a3b6e";
        ctx.lineWidth = 3;
        ctx.strokeRect(bx, by, 84, 84);
        ctx.font = '38px "Press Start 2P", monospace';
        ctx.fillStyle = "#ff79c6";
        ctx.textAlign = "center";
        ctx.fillText("?", cvs.width / 2 + 2, by + 58);
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.fillStyle = "#8be9fd";
        ctx.fillText("LOCKED MEMORY", cvs.width / 2, cvs.height - 18);
        card.style.cursor = "default";
        container.appendChild(card);
        return;
      }

      const drawCard = () => {
        const ctx = cvs.getContext("2d");
        ctx.fillStyle = "#090612";
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        const key = group[photoIdx % group.length];
        this.renderer.drawPhotoToCanvas(ctx, key, cvs.width, cvs.height, cardMode);
        ctx.fillStyle = "rgba(14, 9, 28, 0.82)";
        ctx.fillRect(cvs.width - 68, cvs.height - 22, 62, 16);
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.fillStyle = "#f1fa8c";
        ctx.textAlign = "center";
        ctx.fillText(`📷 ${(photoIdx % group.length) + 1}/${group.length}`, cvs.width - 37, cvs.height - 10);
      };
      drawCard();
      renderFns.push(() => {
        photoIdx = (photoIdx + 1) % group.length;
        drawCard();
      });
      card.addEventListener("click", () => {
        photoIdx = (photoIdx + 1) % group.length;
        window.retroAudio.playSelect();
        drawCard();
      });
      container.appendChild(card);
    });

    this.galleryTimer = setInterval(() => {
      const modal = document.getElementById("modalPhotoGallery");
      if (modal && modal.style.display !== "none") {
        renderFns.forEach(fn => fn());
      }
    }, 3200);
  }

  populateEndingsModal() {
    const grid = document.getElementById("endingsGrid");
    if (!grid) return;
    grid.innerHTML = "";

    Object.values(window.ENDINGS_CATALOG).forEach(end => {
      const unlocked = this.unlockedEndings.includes(end.id);
      const card = document.createElement("div");
      card.className = "ending-card" + (unlocked ? " unlocked" : "");
      card.innerHTML = `
        <h4>${unlocked ? "✅ " + end.title : "🔒 MYSTERY TIMELINE ENDING"}</h4>
        <div style="font-family:var(--font-pixel);font-size:8px;color:var(--accent-secondary);margin-bottom:6px;">
          ${unlocked ? end.badge : "STATUS: NOT YET DISCOVERED"}
        </div>
        <p style="font-size:18px;color:var(--text-muted);">
          ${unlocked ? end.summary : "Keep exploring the Chrono-Dial eras and collecting souvenirs to unlock this ending!"}
        </p>
      `;
      grid.appendChild(card);
    });
  }

  populateBirthdayCard() {
    const container = document.getElementById("birthdayCardContent");
    if (!container) return;
    container.innerHTML = `
      <div class="birthday-letter">${this.markdownBoldToHtml(this.config.birthdayNote)}</div>
      <div style="margin-top:14px;text-align:center;">
        <button class="retro-btn primary-btn" onclick="window.retroAudio.playBirthdaySong()">
          🎵 PLAY BIRTHDAY SONG
        </button>
      </div>
    `;
  }
  populateDlcModal() {
    const grid = document.getElementById("dlcGrid");
    if (!grid) return;
    grid.innerHTML = "";

    (window.DLC_EXPANSIONS || []).forEach(pack => {
      const card = document.createElement("div");
      card.className = "ending-card" + (pack.unlocked ? " unlocked" : "");
      card.innerHTML = `
        <h4>${pack.icon} ${pack.title}</h4>
        <div style="font-family:var(--font-pixel);font-size:8px;color:${
          pack.unlocked ? "var(--accent-green)" : "var(--accent-secondary)"
        };margin-bottom:6px;">
          ${pack.badge} // RELEASE: ${pack.releaseDate}
        </div>
        <p style="font-size:19px;color:var(--text-muted);">${pack.description}</p>
      `;
      grid.appendChild(card);
    });
  }

  openModal(id) {
    window.retroAudio.playSelect();
    if (id === "modalPhotoGallery") this.populatePhotoGallery();
    if (id === "modalCatDex") this.populateCatDex();
    if (id === "modalEndings") this.populateEndingsModal();
    if (id === "modalDlc") this.populateDlcModal();
    if (id === "modalBirthdayCard") {
      this.populateBirthdayCard();
      window.retroAudio.playBirthdaySong();
    }
    const el = document.getElementById(id);
    if (el) el.style.display = "flex";
  }

  closeModal(id) {
    window.retroAudio.playHover();
    if (id === "modalBirthdayCard") {
      window.retroAudio.stopSong();
    }
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  }

  bindEvents() {
    // Title buttons
    document.getElementById("btnStartGame").addEventListener("click", () => this.startGame(true));
    document.getElementById("btnContinueGame").addEventListener("click", () => this.startGame(false));
    const btnDlcSplash = document.getElementById("btnDlcSplash");
    if (btnDlcSplash) btnDlcSplash.addEventListener("click", () => this.openModal("modalDlc"));
    const btnDlcTop = document.getElementById("btnDlcTop");
    if (btnDlcTop) btnDlcTop.addEventListener("click", () => this.openModal("modalDlc"));

    // Android PWA Install Prompt Handler
    let deferredInstallPrompt = null;
    const btnInstall = document.getElementById("btnInstallPwa");
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      deferredInstallPrompt = e;
      if (btnInstall) btnInstall.style.display = "inline-block";
    });
    if (btnInstall) {
      btnInstall.addEventListener("click", async () => {
        if (!deferredInstallPrompt) return;
        deferredInstallPrompt.prompt();
        await deferredInstallPrompt.userChoice;
        deferredInstallPrompt = null;
        btnInstall.style.display = "none";
      });
    }

    // Register Offline & Auto-Update Service Worker
    if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
      navigator.serviceWorker.register("./sw.js").then(reg => {
        reg.update().catch(() => {});
      }).catch(() => {});
    }

    // Retro Power-On Overlay & Audio Unlock (guarantees Title Screen music starts immediately on tap!)
    const powerOverlay = document.getElementById("arcadePowerOverlay");
    const dismissPowerOverlay = () => {
      window.retroAudio.init();
      window.retroAudio.playSelect();
      if (powerOverlay) powerOverlay.style.display = "none";
    };
    if (powerOverlay) {
      powerOverlay.addEventListener("click", dismissPowerOverlay);
      powerOverlay.addEventListener("touchend", e => {
        e.preventDefault();
        dismissPowerOverlay();
      }, { passive: false });
    }
    window.addEventListener("keydown", () => {
      if (powerOverlay && powerOverlay.style.display !== "none") {
        dismissPowerOverlay();
      }
    }, { once: true });

    // Header buttons
    document.getElementById("btnPhotoGallery").addEventListener("click", () => this.openModal("modalPhotoGallery"));
    document.getElementById("btnCatDex").addEventListener("click", () => this.openModal("modalCatDex"));
    document.getElementById("btnEndings").addEventListener("click", () => this.openModal("modalEndings"));

    // Viewport Pixel Mode Toggle button & canvas click
    document.getElementById("btnPixelMode").addEventListener("click", () => {
      window.retroAudio.playSelect();
      this.renderer.cycleViewMode();
    });
    document.getElementById("sceneCanvas").addEventListener("click", () => {
      window.retroAudio.playSelect();
      this.renderer.cycleViewMode();
    });
    document.getElementById("btnToggleAllGalleryMode").addEventListener("click", () => {
      window.retroAudio.playSelect();
      const next = this.galleryGlobalMode === "16bit" ? "original" : (this.galleryGlobalMode === "original" ? "8bit" : "16bit");
      this.populatePhotoGallery(next);
    });

    // Mini cat cards on title screen
    document.querySelectorAll(".party-mini-card").forEach(card => {
      card.addEventListener("click", () => {
        const cat = card.getAttribute("data-cat");
        if (cat === "tommy") window.retroAudio.playChooChoo();
        else window.retroAudio.playCatMeow();
        this.openModal("modalCatDex");
      });
    });

    // Music, Audio & CRT toggles
    const btnMusic = document.getElementById("btnMusicToggle");
    if (btnMusic) {
      btnMusic.addEventListener("click", () => {
        const on = window.retroAudio.toggleMusic();
        btnMusic.textContent = on ? "🎵 BGM: ON" : "🔇 BGM: OFF";
      });
    }

    // Attempt immediate autoplay on launch, and also listen for any touch/click until AudioContext is running
    window.retroAudio.init();
    const unlockEvents = ["touchstart", "touchend", "pointerdown", "mousedown", "click", "keydown"];
    const unlockAudio = () => {
      window.retroAudio.init();
      if (window.retroAudio.ctx && window.retroAudio.ctx.state === "running") {
        unlockEvents.forEach(evt => document.removeEventListener(evt, unlockAudio, true));
      }
    };
    unlockEvents.forEach(evt => document.addEventListener(evt, unlockAudio, { capture: true, passive: true }));

    const btnAudio = document.getElementById("btnAudioToggle");
    btnAudio.addEventListener("click", () => {
      const on = window.retroAudio.toggle();
      btnAudio.textContent = on ? "🔊 SFX: ON" : "🔇 SFX: OFF";
    });

    const btnCrt = document.getElementById("btnCrtToggle");
    btnCrt.addEventListener("click", () => {
      document.body.classList.toggle("crt-enabled");
      const on = document.body.classList.contains("crt-enabled");
      btnCrt.textContent = on ? "📺 CRT: ON" : "📺 CRT: OFF";
    });

    // Story box click / spacebar to finish typing
    document.getElementById("storyBox").addEventListener("click", () => {
      if (this.isTyping) this.finishTypewriter();
    });
    window.addEventListener("keydown", e => {
      if (e.code === "Space" && this.isTyping && document.getElementById("gameScreen").classList.contains("active")) {
        e.preventDefault();
        this.finishTypewriter();
      }
    });

    // Bottom navigation buttons
    document.getElementById("btnBackChoice").addEventListener("click", () => {
      if (this.history.length > 0) {
        const prev = this.history.pop();
        window.retroAudio.playSelect();
        this.goToNode(prev, false);
      }
    });

    document.getElementById("btnRestartStory").addEventListener("click", () => {
      this.startGame(true, true);
    });

    document.getElementById("btnHomeTitle").addEventListener("click", () => {
      window.retroAudio.playSelect();
      window.retroAudio.setMusicTrack("happy_birthday", false);
      document.getElementById("gameScreen").classList.remove("active");
      document.getElementById("titleScreen").classList.add("active");
      document.body.className = "theme-birthday on-splash" + (document.body.classList.contains("crt-enabled") ? " crt-enabled" : "");
      if (this.currentNodeId !== "start" || this.inventory.length > 0 || this.unlockedEndings.length > 0) {
        document.getElementById("btnContinueGame").style.display = "inline-block";
      }
    });

    // Close modals
    document.querySelectorAll(".close-modal-btn").forEach(btn => {
      btn.addEventListener("click", () => this.closeModal(btn.getAttribute("data-close")));
    });
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", e => {
        if (e.target === backdrop) this.closeModal(backdrop.id);
      });
    });

    document.getElementById("btnResetProgress").addEventListener("click", () => {
      this.inventory = [];
      this.unlockedEndings = [];
      this.visitedNodes = [];
      this.unlockedPhotos = [];
      this.currentNodeId = "start";
      this.history = [];
      this.saveState();
      this.renderHudEndingsCount();
      this.renderHudGalleryCount();
      this.renderInventory();
      this.populateEndingsModal();
    });

    // Boos Morning Warning Modal buttons
    const btnStay = document.getElementById("btnStayMorning");
    if (btnStay) {
      btnStay.addEventListener("click", () => {
        this.closeModal("modalBoosWarning");
      });
    }
    const btnConfirmJump = document.getElementById("btnConfirmJump");
    if (btnConfirmJump) {
      btnConfirmJump.addEventListener("click", () => {
        this.closeModal("modalBoosWarning");
        this.goToNode(this.pendingJumpTarget || "chrono_hub", true);
      });
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.chronoGame = new ChronoQuestGame();
});


