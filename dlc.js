// ============================================================================
// REBECCA'S CHRONO-QUEST — EXPANSION CARTRIDGES / DLC REGISTRY
// ============================================================================
// HOW TO ADD CHRISTMAS 2026 OR FUTURE DLC:
// 1. Change `unlocked: false` to `unlocked: true` on the expansion below
// 2. Set `startNode: "christmas_2026_start"` and add your new nodes to story.js
// 3. Commit & push to GitHub — Rebecca's Android app will update automatically!

window.DLC_EXPANSIONS = [
  {
    id: "base_birthday_2026",
    title: "CARTRIDGE 01 // THE BIRTHDAY CHRONO-QUEST",
    badge: "✅ INSTALLED & ACTIVE",
    unlocked: true,
    releaseDate: "2026 Birthday Edition",
    icon: "🎂",
    description:
      "The original time-travel adventure through 2021 Kitty Hawk, Jinny & Joonie's adoption, 2022 Sweet Billie, 2023 South Korea, 2024 Tommy ('Choo Choo!'), 2025 Disney World, and your 2026 5-Year Anniversary in Cancun!"
  },
  {
    id: "dlc_christmas_2026",
    title: "🔒 MYSTERY DLC: COMING CHRISTMAS 2026...",
    badge: "🎄 LOCKED EXPANSION",
    unlocked: false,
    releaseDate: "December 2026",
    icon: "🎄",
    description:
      "A cozy winter holiday expansion cartridge! Features twinkling Christmas lights, peppermint coffee, festive pasta, and a brand-new holiday quest with Lucas, Jinny, Joonie, Billie's Christmas Star, and Conductor Choo Choo! Automatically unlocks via update in December 2026."
  },
  {
    id: "dlc_future_slot",
    title: "🔒 MYSTERY EXPANSION SLOT #3",
    badge: "🪐 FUTURE DLC",
    unlocked: false,
    releaseDate: "TBA",
    icon: "🚀",
    description:
      "Reserved for future birthdays, anniversaries, and new real-life vacation memories!"
  }
];
