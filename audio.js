// ============================================================================
// 8-BIT ZONE SOUNDTRACK COMPOSER & RETRO SFX ENGINE (Pure Web Audio API)
// ============================================================================
// Each track has a distinct tempo, waveform instrument, harmony, and rhythm
// so changing scenes feels like jumping down a Mario Warp Pipe into a new zone!

const N = {
  _: 0,
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, Bb2: 116.54, B2: 123.47,
  C3: 130.81, Cs3: 138.59, D3: 146.83, Eb3: 155.56, E3: 164.81, F3: 174.61, Fs3: 185.00, G3: 196.00, Ab3: 207.65, A3: 220.00, Bb3: 233.08, B3: 246.94,
  C4: 261.63, Cs4: 277.18, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, Fs4: 369.99, G4: 392.00, Ab4: 415.30, A4: 440.00, Bb4: 466.16, B4: 493.88,
  C5: 523.25, Cs5: 554.37, D5: 587.33, Eb5: 622.25, E5: 659.25, F5: 698.46, Fs5: 739.99, G5: 783.99, Ab5: 830.61, A5: 880.00, Bb5: 932.33, B5: 987.77,
  C6: 1046.50, D6: 1174.66, E6: 1318.51
};

// Format of each step in sequence: [leadNote, harmNote, bassNote, drumType, beats]
// drumType: 0 = none, 1 = kick, 2 = snare/hihat, 3 = steam-chug
window.ZONE_SOUNDTRACKS = {
  // 1. TITLE & BIRTHDAY MORNING: Authentic 8-Bit "Happy Birthday to You" Waltz!
  happy_birthday: {
    label: "✨ STARLIGHT TITLE SCREEN",
    unitMs: 180, // Relaxed, breathing tempo (~83 BPM per quarter beat)
    leadWave: "triangle", // Soft, warm tones without harsh edges
    harmWave: "sine",     // Smooth ambient pad backing
    steps: [
      // --- BAR 1: C Major (Warm Opening Arpeggio) ---
      ["E5", "G4", "C3", 0, 2], ["G5", "C5", "_",  0, 2],
      ["C6", "E5", "E3", 0, 2], ["B5", "D5", "_",  0, 2],
      ["A5", "C5", "G3", 0, 2], ["G5", "B4", "_",  0, 2],
      ["E5", "G4", "C3", 3, 2], ["D5", "F4", "_",  0, 2],

      // --- BAR 2: A Minor (Gentle, Reflective Descent) ---
      ["C5", "E4", "A2", 0, 2], ["E5", "A4", "_",  0, 2],
      ["A5", "C5", "C3", 0, 2], ["G5", "B4", "_",  0, 2],
      ["E5", "A4", "E3", 0, 2], ["D5", "G4", "_",  0, 2],
      ["C5", "E4", "A2", 3, 2], ["B4", "D4", "_",  0, 2],

      // --- BAR 3: F Major 7 (Dreamy, Floating Feel) ---
      ["A4", "C4", "F2", 0, 2], ["C5", "E4", "_",  0, 2],
      ["E5", "G4", "A2", 0, 2], ["F5", "A4", "_",  0, 2],
      ["E5", "G4", "C3", 0, 2], ["D5", "F4", "_",  0, 2],
      ["C5", "E4", "F2", 3, 2], ["D5", "F4", "_",  0, 2],

      // --- BAR 4: G Dominant -> Quiet Resolution (Loops back to Bar 1) ---
      ["D5", "G4", "G2", 0, 2], ["F5", "B4", "_",  0, 2],
      ["G5", "D5", "B2", 0, 2], ["F5", "B4", "_",  0, 2],
      ["E5", "G4", "D3", 0, 2], ["D5", "F4", "_",  0, 2],
      ["C5", "E4", "G2", 3, 2], ["B4", "D4", "_",  0, 2]
    ]
  },

  // 2. 2026 CANCUN 5-YEAR ANNIVERSARY: 8-Bit "Wedding March" (Here Comes the Bride / Recessional)!
  wedding_march: {
    label: "💍 8-BIT WEDDING MARCH",
    unitMs: 185,
    leadWave: "square",
    harmWave: "sawtooth",
    steps: [
      // "Here comes the bride, all dressed in white..."
      ["C5", "E4", "C3", 1, 2], ["F5", "A4", "F3", 2, 3], ["F5", "A4", "C3", 0, 1], ["F5", "A4", "F3", 1, 2],
      ["C5", "E4", "C3", 1, 2], ["G5", "Bb4","E3", 2, 3], ["E5", "G4", "C3", 0, 1], ["F5", "A4", "F3", 1, 2],
      ["C5", "F4", "C3", 1, 2], ["F5", "A4", "F3", 2, 2], ["A5", "C5", "A3", 1, 2], ["C6", "F5", "F3", 2, 2],
      ["A5", "C5", "D3", 1, 2], ["G5", "B4", "G3", 2, 2], ["F5", "A4", "C3", 1, 2], ["G5", "E5", "C3", 2, 2],
      // Second phrase + celebratory bell fanfare
      ["C5", "E4", "C3", 1, 2], ["F5", "A4", "F3", 2, 3], ["F5", "A4", "C3", 0, 1], ["F5", "A4", "F3", 1, 2],
      ["C5", "E4", "C3", 1, 2], ["G5", "Bb4","C3", 2, 3], ["E5", "G4", "G3", 0, 1], ["F5", "A4", "F3", 1, 2],
      ["C5", "F4", "A2", 1, 2], ["F5", "A4", "D3", 2, 2], ["A5", "C5", "F3", 1, 2], ["G5", "Bb4","G3", 2, 2],
      ["F5", "A4", "C3", 1, 2], ["E5", "G4", "C3", 2, 2], ["F5", "A4", "F3", 1, 3], ["_",  "_",  "_",  0, 1]
    ]
  },

  // 3. CHRONO-DIAL HUB: 70s/80s Analog Cosmic Space Synthwave Arpeggiator!
  //    (Inspired by Vangelis / Jean-Michel Jarre / Stranger Things rolling Maj7 & Min7 synths)
  warp_zone: {
    label: "🪐 80s COSMIC SYNTHWAVE",
    unitMs: 130,
    leadWave: "sawtooth",
    harmWave: "sine",
    steps: [
      // Bar 1: Cmaj7 Space Arpeggio (C4 - E4 - G4 - B4 - C5 - B4 - G4 - E4)
      ["C4", "G4", "C2", 1, 1], ["E4", "G4", "C3", 0, 1], ["G4", "B4", "C2", 2, 1], ["B4", "E5", "C3", 0, 1],
      ["C5", "G5", "C2", 1, 1], ["B4", "E5", "C3", 0, 1], ["G4", "B4", "C2", 2, 1], ["E4", "G4", "C3", 0, 1],
      // Bar 2: Cmaj7 -> D5 cosmic soar
      ["C4", "G4", "C2", 1, 1], ["E4", "B4", "C3", 0, 1], ["G4", "C5", "C2", 2, 1], ["B4", "E5", "C3", 0, 1],
      ["D5", "G5", "C2", 1, 1], ["C5", "E5", "C3", 0, 1], ["B4", "D5", "C2", 2, 1], ["G4", "B4", "C3", 0, 1],
      // Bar 3: Am9 Nebula Drift (A3 - C4 - E4 - G4 - B4 - G4 - E4 - C4)
      ["A3", "E4", "A2", 1, 1], ["C4", "E4", "A2", 0, 1], ["E4", "A4", "E3", 2, 1], ["G4", "C5", "A2", 0, 1],
      ["B4", "E5", "A2", 1, 1], ["G4", "C5", "E3", 0, 1], ["E4", "A4", "A2", 2, 1], ["C4", "E4", "E3", 0, 1],
      // Bar 4: Fmaj7 Starlight Pad (F3 - A3 - C4 - E4 - A4 - E4 - C4 - A3)
      ["F3", "C4", "F2", 1, 1], ["A3", "C4", "C3", 0, 1], ["C4", "F4", "F2", 2, 1], ["E4", "A4", "C3", 0, 1],
      ["A4", "C5", "F2", 1, 1], ["E4", "A4", "C3", 0, 1], ["C4", "F4", "F2", 2, 1], ["A3", "C4", "C3", 0, 1],
      // Bar 5: G6/9 Pulsar Resolution
      ["G3", "D4", "G2", 1, 1], ["B3", "D4", "D3", 0, 1], ["D4", "G4", "G2", 2, 1], ["E4", "B4", "D3", 0, 1],
      ["G4", "D5", "G2", 1, 1], ["E4", "B4", "D3", 0, 1], ["D4", "G4", "G2", 2, 1], ["B3", "D4", "D3", 0, 1]
    ]
  },

  // 4. 2021 KITTY HAWK BEACH: Original Breezy 80s Coastal Synth-Wave!
  ocean_waltz: {
    label: "🌊 KITTY HAWK COASTAL WAVE",
    unitMs: 150,
    leadWave: "triangle",
    harmWave: "sine",
    steps: [
      ["E5", "G4", "C3", 1, 2], ["G5", "B4", "G3", 0, 1], ["A5", "C5", "C3", 2, 2], ["G5", "B4", "G3", 0, 1],
      ["E5", "G4", "A2", 1, 2], ["D5", "F4", "E3", 0, 1], ["C5", "E4", "A2", 2, 3],
      ["D5", "F4", "F2", 1, 2], ["E5", "G4", "C3", 0, 1], ["G5", "B4", "F2", 2, 2], ["E5", "G4", "C3", 0, 1],
      ["D5", "F4", "G2", 1, 3], ["B4", "D4", "D3", 2, 3],
      ["E5", "G4", "C3", 1, 2], ["G5", "B4", "G3", 0, 1], ["C6", "E5", "A2", 2, 2], ["B5", "D5", "E3", 0, 1],
      ["A5", "C5", "F2", 1, 2], ["G5", "B4", "C3", 0, 1], ["E5", "G4", "G2", 2, 2], ["D5", "F4", "G2", 0, 1],
      ["C5", "E4", "C3", 1, 4], ["_",  "_",  "G2", 0, 2]
    ]
  },
  // 5. JINNY & JOONIE CAT SCENES: Bouncy Ragtime / Yoshi-Style Kitty Playtime!
  kitty_ragtime: {
    label: "🐾 JINNY & JOONIE RAGTIME",
    unitMs: 130,
    leadWave: "square",
    harmWave: "triangle",
    steps: [
      ["G5", "E5", "C3", 1, 1], ["E5", "C5", "G3", 2, 1], ["C5", "G4", "E3", 1, 1], ["D5", "B4", "G3", 2, 1],
      ["E5", "C5", "C3", 1, 1], ["G5", "E5", "G3", 2, 1], ["E5", "C5", "C3", 1, 2],
      ["A5", "F5", "F3", 1, 1], ["F5", "D5", "C4", 2, 1], ["D5", "B4", "G3", 1, 1], ["B4", "G4", "D3", 2, 1],
      ["C5", "E4", "C3", 1, 1], ["E5", "G4", "G3", 2, 1], ["G5", "C5", "C3", 1, 2],
      ["A5", "F5", "F3", 1, 1], ["Ab5","F5", "F3", 2, 1], ["G5", "E5", "C3", 1, 1], ["E5", "C5", "A3", 2, 1],
      ["D5", "Fs4","D3", 1, 1], ["E5", "G4", "G3", 2, 1], ["G5", "B4", "G2", 1, 2],
      ["C6", "E5", "C3", 1, 1], ["G5", "E5", "G3", 2, 1], ["E5", "C5", "E3", 1, 1], ["D5", "B4", "G3", 2, 1],
      ["C5", "E4", "C3", 1, 2], ["_",  "_",  "G2", 2, 2]
    ]
  },

  // 6. 2022 SWEET BILLIE & STARLIGHT OBSERVATORY: Celestial Music-Box Lullaby!
  starlight_musicbox: {
    label: "🌟 BILLIE'S STARLIGHT LULLABY",
    unitMs: 240,
    leadWave: "sine",
    harmWave: "triangle",
    steps: [
      // Gentle Twinkle / Rosalina Observatory celestial chimes (no drums)
      ["C5", "E4", "C3", 0, 2], ["C5", "G4", "G3", 0, 2],
      ["G5", "B4", "E3", 0, 2], ["G5", "D5", "G3", 0, 2],
      ["A5", "C5", "F3", 0, 2], ["A5", "F5", "C4", 0, 2],
      ["G5", "E5", "C3", 0, 3], ["_",  "G4", "G3", 0, 1],
      ["F5", "A4", "D3", 0, 2], ["F5", "C5", "A3", 0, 2],
      ["E5", "G4", "C3", 0, 2], ["E5", "C5", "G3", 0, 2],
      ["D5", "F4", "G2", 0, 2], ["G5", "B4", "B2", 0, 2],
      ["C5", "E4", "C3", 0, 4]
    ]
  },

  // 7. 2023 SOUTH KOREA: Neon Seoul Pentatonic Synth-Pop Arcade!
  seoul_pentatonic: {
    label: "🇰🇷 SEOUL NEON ARCADE",
    unitMs: 125,
    leadWave: "sawtooth",
    harmWave: "square",
    steps: [
      ["A5", "E5", "A2", 1, 1], ["G5", "D5", "A3", 2, 1], ["E5", "C5", "A2", 1, 1], ["D5", "A4", "E3", 2, 1],
      ["E5", "C5", "F2", 1, 2], ["G5", "D5", "F3", 2, 1], ["A5", "E5", "G2", 1, 1],
      ["C6", "G5", "C3", 1, 2], ["A5", "E5", "C4", 2, 1], ["G5", "D5", "G2", 1, 1],
      ["E5", "B4", "E3", 1, 2], ["D5", "G4", "E2", 2, 2],
      ["C5", "A4", "F2", 1, 1], ["D5", "B4", "F3", 2, 1], ["E5", "C5", "G2", 1, 1], ["G5", "D5", "G3", 2, 1],
      ["A5", "E5", "A2", 1, 2], ["E5", "C5", "E3", 2, 1], ["G5", "D5", "G3", 1, 1],
      ["A5", "E5", "A2", 1, 3], ["_",  "_",  "E2", 2, 1]
    ]
  },

  // 8. 2024 TOMMY "CHOO CHOO": Thomas the Tank Engine Cheeky Locomotive March!
  thomas_locomotive: {
    label: "🚂 CHOO-CHOO LOCOMOTIVE MARCH",
    unitMs: 115,
    leadWave: "square",
    harmWave: "sawtooth",
    steps: [
      // Cheeky Thomas-style syncopated brass melody + chugga-chugga steam beat (3)
      ["G4", "B3", "C3", 1, 1], ["A4", "C4", "G2", 3, 1], ["B4", "D4", "C3", 3, 1], ["C5", "E4", "G2", 3, 2],
      ["D5", "F4", "C3", 1, 1], ["E5", "G4", "G2", 3, 2],
      ["Cs5","F4", "Cs3",1, 2], ["D5", "Fs4","D3", 3, 2], ["G5", "B4", "G2", 1, 4],
      ["G4", "B3", "C3", 1, 1], ["A4", "C4", "G2", 3, 1], ["B4", "D4", "C3", 3, 1], ["C5", "E4", "G2", 3, 2],
      ["D5", "F4", "F3", 1, 1], ["E5", "G4", "C3", 3, 2],
      ["F5", "A4", "D3", 1, 2], ["D5", "B4", "G2", 3, 2], ["C5", "E4", "C3", 1, 4]
    ]
  },

  // 9. MULTIVERSE CAT KINGDOM: Royal Baroque Castle Fanfare!
  castle_minuet: {
    label: "👑 CASTLE PASTA-LOT MINUET",
    unitMs: 165,
    leadWave: "sawtooth",
    harmWave: "triangle",
    steps: [
      ["A4", "C4", "A2", 1, 2], ["E5", "A4", "E3", 2, 1], ["D5", "B4", "E3", 0, 1], ["C5", "A4", "A2", 1, 2],
      ["B4", "G4", "E2", 1, 2], ["E5", "Ab4","E3", 2, 1], ["D5", "B4", "E3", 0, 1], ["B4", "Ab4","E2", 1, 2],
      ["C5", "A4", "A2", 1, 1], ["D5", "B4", "B2", 0, 1], ["E5", "C5", "C3", 2, 1], ["F5", "D5", "D3", 0, 1],
      ["E5", "C5", "E3", 1, 2], ["D5", "B4", "E2", 2, 2], ["A4", "Cs4","A2", 1, 4]
    ]
  },

  // 10. YEAR 2076 GOLDEN YEARS: Warm 8-Bit "Auld Lang Syne" Soulmate Medley!
  auld_lang_syne: {
    label: "⏳ 2076 GOLDEN ANNIVERSARY",
    unitMs: 210,
    leadWave: "triangle",
    harmWave: "sine",
    steps: [
      ["G4", "B3", "C3", 1, 1], ["C5", "E4", "C3", 0, 3], ["C5", "E4", "G3", 2, 1], ["E5", "G4", "C3", 1, 2],
      ["D5", "F4", "G2", 1, 3], ["C5", "E4", "G3", 2, 1], ["D5", "F4", "B2", 1, 2],
      ["E5", "G4", "C3", 1, 1], ["C5", "E4", "E3", 0, 1], ["E5", "G4", "A3", 2, 2], ["G5", "C5", "E3", 1, 2],
      ["A5", "C5", "F3", 1, 4],
      ["A5", "F5", "F3", 1, 1], ["G5", "E5", "C3", 0, 3], ["E5", "C5", "G3", 2, 1], ["C5", "A4", "A2", 1, 2],
      ["D5", "F4", "D3", 1, 3], ["C5", "E4", "G3", 2, 1], ["D5", "F4", "G2", 1, 2],
      ["E5", "G4", "C3", 1, 1], ["D5", "F4", "F3", 0, 1], ["C5", "E4", "A2", 2, 2], ["A4", "C4", "F2", 1, 2],
      ["G4", "B3", "G2", 1, 2], ["C5", "E4", "C3", 1, 4]
    ]
  },

  // 11. 2025 DISNEY WORLD: "When You Wish Upon a Star" 8-Bit Castle Chimes & Pixie Dust!
  disney_wishes: {
    label: "🏰 8-BIT MAGIC KINGDOM WISHES",
    unitMs: 185,
    leadWave: "triangle",
    harmWave: "sine",
    steps: [
      // "When you wish up-on a star..." (G4 -> G5 -> F5 -> E5 -> D5 -> B4 -> D5 -> A5)
      ["G4", "B3", "C3", 1, 2], ["G5", "B4", "E3", 0, 2], ["F5", "A4", "F3", 2, 2], ["E5", "G4", "C3", 0, 2],
      ["Cs5","E4", "A2", 1, 2], ["D5", "F4", "D3", 0, 2], ["A5", "C5", "G2", 2, 3], ["_",  "F4", "G3", 0, 1],
      // "Makes no dif-ference who you are..." (B4 -> B5 -> A5 -> G5 -> Fs5 -> G5 -> C6)
      ["B4", "D4", "G2", 1, 2], ["B5", "D5", "B2", 0, 2], ["A5", "C5", "C3", 2, 2], ["G5", "B4", "Cs3",0, 2],
      ["Fs5","A4", "D3", 1, 2], ["G5", "B4", "G3", 0, 2], ["C6", "E5", "C3", 2, 3], ["_",  "G4", "E3", 0, 1],
      // Magical Pixie-Dust Arpeggio Bridge over Cinderella Castle
      ["E5", "C5", "F2", 1, 2], ["F5", "D5", "F3", 0, 2], ["G5", "E5", "E2", 2, 2], ["E5", "C5", "A2", 0, 2],
      ["D5", "A4", "D3", 1, 2], ["E5", "B4", "G2", 0, 2], ["C5", "G4", "C3", 2, 3], ["G5", "E5", "G3", 0, 1]
    ]
  }
};
class RetroAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.enabled = true;      // SFX enabled
    this.musicEnabled = true; // Background chiptune music enabled
    this.currentTrackName = "happy_birthday";
    this.bgmTimeout = null;
    this.stepIndex = 0;
    this.isPlayingSong = false;
    this.isPageHidden = false;
    this.songTimeouts = [];
    this.bindLifecycleEvents();
  }

  getOutNode() {
    return this.masterGain || (this.ctx ? this.ctx.destination : null);
  }

  bindLifecycleEvents() {
    const handleHide = () => {
      this.isPageHidden = true;
      this.stopMusicLoop();
      this.stopSong();
      if (this.masterGain && this.ctx) {
        try {
          this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
        } catch (e) {}
      }
      if (this.ctx && this.ctx.state === "running") {
        this.ctx.suspend().catch(() => {});
      }
    };

    const handleShow = () => {
      if (document.hidden) return;
      this.isPageHidden = false;
      if (this.masterGain && this.ctx) {
        try {
          this.masterGain.gain.setValueAtTime(1, this.ctx.currentTime);
        } catch (e) {}
      }
      if (this.ctx && this.ctx.state === "suspended" && (this.musicEnabled || this.enabled)) {
        this.ctx.resume().catch(() => {});
      }
      if (this.musicEnabled && !this.bgmTimeout && !this.isPlayingSong && this.ctx) {
        this.startMusic(this.currentTrackName);
      }
    };

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) handleHide();
      else handleShow();
    });
    window.addEventListener("pagehide", handleHide);
    document.addEventListener("freeze", handleHide);
    // Unconditionally mute & suspend on window blur (locking phone screen or switching apps)
    window.addEventListener("blur", handleHide);
    window.addEventListener("focus", handleShow);
  }

  init() {
    if (document.hidden) return;
    this.isPageHidden = false;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(1, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx) {
      if (this.masterGain) {
        try {
          this.masterGain.gain.setValueAtTime(1, this.ctx.currentTime);
        } catch (e) {}
      }
      if (this.ctx.state === "suspended") {
        try {
          const buf = this.ctx.createBuffer(1, 1, 22050);
          const src = this.ctx.createBufferSource();
          src.buffer = buf;
          src.connect(this.getOutNode());
          src.start(0);
        } catch (e) {}
        this.ctx.resume().then(() => {
          if (this.musicEnabled && !this.bgmTimeout && !this.isPlayingSong && !this.isPageHidden) {
            this.startMusic(this.currentTrackName);
          }
        }).catch(() => {});
      }
      if (this.musicEnabled && !this.bgmTimeout && !this.isPlayingSong) {
        this.startMusic(this.currentTrackName);
      }
    }
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.init();
      this.startMusic(this.currentTrackName);
    } else {
      this.stopMusicLoop();
      this.stopSong();
    }
    return this.musicEnabled;
  }

  stopMusicLoop() {
    if (this.bgmTimeout) {
      clearTimeout(this.bgmTimeout);
      this.bgmTimeout = null;
    }
  }

  // Plays an 80s Sci-Fi Cosmic Synth Shimmer when shifting between timeline zones!
  playPipeTransition() {
    if (!this.enabled || !this.ctx) return;
    const freqs = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25];
    freqs.forEach((f, idx) => {
      setTimeout(() => {
        this.playToneRaw(f, 0.06, "sine", 0.04);
        this.playToneRaw(f * 1.5, 0.06, "triangle", 0.025);
      }, idx * 35);
    });
  }

  setMusicTrack(trackName, withPipeTransition = true) {
    if (!window.ZONE_SOUNDTRACKS[trackName]) trackName = "happy_birthday";
    const changed = this.currentTrackName !== trackName;
    this.currentTrackName = trackName;

    const trackObj = window.ZONE_SOUNDTRACKS[trackName];
    const badgeEl = document.getElementById("nowPlayingBadge");
    if (badgeEl && trackObj) {
      badgeEl.textContent = trackObj.label;
    }

    if (!changed && this.bgmTimeout) return;
    this.stepIndex = 0;

    if (this.musicEnabled && this.ctx && !this.isPlayingSong) {
      if (changed && withPipeTransition) {
        this.stopMusicLoop();
        this.playPipeTransition();
        this.bgmTimeout = setTimeout(() => {
          this.startMusic(trackName);
        }, 290);
      } else {
        this.startMusic(trackName);
      }
    }
  }

  startMusic(trackName) {
    this.stopMusicLoop();
    if (!this.musicEnabled) return;
    const track = window.ZONE_SOUNDTRACKS[trackName] || window.ZONE_SOUNDTRACKS.happy_birthday;
    this.currentTrackName = trackName;

    const scheduleNext = () => {
      if (!this.musicEnabled || this.isPageHidden || document.hidden) return;
      if (typeof document.hasFocus === "function" && !document.hasFocus()) {
        this.isPageHidden = true;
        this.stopMusicLoop();
        if (this.ctx && this.ctx.state === "running") this.ctx.suspend().catch(() => {});
        return;
      }
      if (this.isPlayingSong || !this.ctx || this.ctx.state !== "running") {
        this.bgmTimeout = setTimeout(scheduleNext, 250);
        return;
      }
      const step = track.steps[this.stepIndex % track.steps.length];
      this.stepIndex++;
      const [leadName, harmName, bassName, drumType, beats] = step;
      const durMs = (beats || 1) * track.unitMs;
      const durSec = (durMs / 1000) * 0.88;

      if (leadName && N[leadName] > 0) {
        this.playToneRaw(N[leadName], durSec, track.leadWave || "square", 0.032);
      }
      if (harmName && N[harmName] > 0) {
        this.playToneRaw(N[harmName], durSec * 0.9, track.harmWave || "triangle", 0.022);
      }
      if (bassName && N[bassName] > 0) {
        this.playToneRaw(N[bassName], durSec * 0.95, "triangle", 0.048);
      }
      if (drumType === 1) {
        this.playDrumKick();
      } else if (drumType === 2) {
        this.playToneRaw(1400, 0.024, "sawtooth", 0.015);
      } else if (drumType === 3) {
        this.playSteamChug();
      }

      this.bgmTimeout = setTimeout(scheduleNext, durMs);
    };

    scheduleNext();
  }

  playToneRaw(freq, duration, type, volume) {
    if (!this.ctx || this.isPageHidden || document.hidden) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + duration);
    osc.connect(gain);
    gain.connect(this.getOutNode());
    osc.start(now);
    osc.stop(now + duration);
  }

  playDrumKick() {
    if (!this.ctx || this.isPageHidden || document.hidden) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(135, now);
    osc.frequency.exponentialRampToValueAtTime(36, now + 0.065);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc.connect(gain);
    gain.connect(this.getOutNode());
    osc.start(now);
    osc.stop(now + 0.075);
  }

  playSteamChug() {
    if (!this.ctx || this.isPageHidden || document.hidden) return;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.045);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.028, this.ctx.currentTime);
    noise.connect(gain);
    gain.connect(this.getOutNode());
    noise.start();
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stopSong();
    } else {
      this.init();
      this.playBlip(660, 0.08, 'square');
    }
    return this.enabled;
  }

  playBlip(freq = 440, duration = 0.06, type = 'square', volume = 0.08) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.getOutNode());

    osc.start(now);
    osc.stop(now + duration);
  }

  // Soft typewriter key beep
  playTypeChar(char) {
    if (!this.enabled || char === ' ' || char === '\n') return;
    const base = 360 + (char.charCodeAt(0) % 7) * 28;
    this.playBlip(base, 0.025, 'square', 0.03);
  }

  // Button hover & click
  playHover() {
    this.playBlip(520, 0.03, 'triangle', 0.04);
  }

  playSelect() {
    if (!this.enabled) return;
    this.init();
    this.playBlip(523.25, 0.06, 'square', 0.08);
    setTimeout(() => this.playBlip(659.25, 0.09, 'square', 0.08), 55);
  }

  // Time warp sound when changing eras
  playTimeWarp() {
    if (!this.enabled) return;
    this.init();
    const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      setTimeout(() => {
        this.playBlip(n, 0.07, 'sawtooth', 0.06);
      }, idx * 42);
    });
  }

  // Item acquired fanfare
  playItemGet() {
    if (!this.enabled) return;
    this.init();
    const melody = [
      { f: 523.25, d: 0.08, t: 0 },
      { f: 659.25, d: 0.08, t: 85 },
      { f: 783.99, d: 0.08, t: 170 },
      { f: 1046.5, d: 0.22, t: 255 }
    ];
    melody.forEach(m => {
      setTimeout(() => this.playBlip(m.f, m.d, 'square', 0.09), m.t);
    });
  }

  // Cute synthesized cat meow!
  playCatMeow(pitchMultiplier = 1.0) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520 * pitchMultiplier, now);
    osc.frequency.linearRampToValueAtTime(880 * pitchMultiplier, now + 0.12);
    osc.frequency.linearRampToValueAtTime(480 * pitchMultiplier, now + 0.35);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.11, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);

    osc.connect(gain);
    gain.connect(this.getOutNode());

    osc.start(now);
    osc.stop(now + 0.37);
  }

  // Special "CHOO CHOO!" train whistle for Tommy (Thomas the Tank Engine!)
  playChooChoo() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const playBlast = (delay, dur) => {
      setTimeout(() => {
        if (!this.enabled || !this.ctx) return;
        // Chord whistle (G4 + B4 + D5)
        [392.0, 493.88, 587.33].forEach(freq => {
          this.playBlip(freq, dur, 'sawtooth', 0.055);
        });
      }, delay);
    };

    playBlast(0, 0.22);
    playBlast(270, 0.35);
  }

  // 8-Bit "Happy Birthday to Rebecca" Chiptune Fanfare
  playBirthdaySong() {
    if (!this.enabled) return;
    this.init();
    this.stopSong();
    this.isPlayingSong = true;

    // Notes in Hz
    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23,
          G4 = 392.00, A4 = 440.00, Bb4 = 466.16, C5 = 523.25;

    const sequence = [
      // Happy birthday to you
      { f: C4, d: 0.22 }, { f: C4, d: 0.14 }, { f: D4, d: 0.36 },
      { f: C4, d: 0.36 }, { f: F4, d: 0.36 }, { f: E4, d: 0.65 },
      // Happy birthday to you
      { f: C4, d: 0.22 }, { f: C4, d: 0.14 }, { f: D4, d: 0.36 },
      { f: C4, d: 0.36 }, { f: G4, d: 0.36 }, { f: F4, d: 0.65 },
      // Happy birthday dear Rebecca!
      { f: C4, d: 0.22 }, { f: C4, d: 0.14 }, { f: C5, d: 0.36 },
      { f: A4, d: 0.36 }, { f: F4, d: 0.36 }, { f: E4, d: 0.36 }, { f: D4, d: 0.55 },
      // Happy birthday to you!
      { f: Bb4, d: 0.22 }, { f: Bb4, d: 0.14 }, { f: A4, d: 0.36 },
      { f: F4, d: 0.36 }, { f: G4, d: 0.36 }, { f: F4, d: 0.75 }
    ];

    let elapsed = 0;
    sequence.forEach(note => {
      const id = setTimeout(() => {
        if (this.enabled) {
          this.playBlip(note.f, note.d * 0.9, 'square', 0.08);
          this.playBlip(note.f / 2, note.d * 0.9, 'triangle', 0.05);
        }
      }, elapsed * 1000);
      this.songTimeouts.push(id);
      elapsed += note.d + 0.04;
    });

    const endId = setTimeout(() => {
      this.isPlayingSong = false;
    }, (elapsed + 0.2) * 1000);
    this.songTimeouts.push(endId);
  }

  stopSong() {
    this.songTimeouts.forEach(id => clearTimeout(id));
    this.songTimeouts = [];
    this.isPlayingSong = false;
  }
}

window.retroAudio = new RetroAudioEngine();
