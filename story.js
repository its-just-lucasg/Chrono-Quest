// ============================================================================
// REBECCA'S CHRONO-QUEST — STORY, CAT-DEX, ITEMS & MULTIVERSE ENDINGS
// ============================================================================

window.DEFAULT_GAME_CONFIG = {
  wifeName: "Rebecca",
  husbandName: "Lucas",
  favDrink: "Coffee",
  favFood: "Pasta",
  birthdayNote: `Dearest Rebecca,

Happy Birthday to my favorite person in every timeline, universe, and dimension.

From the wind-swept beach in Kitty Hawk in 2021 and bringing home Jinny & Joonie, to welcoming sweet Billie in 2022, exploring cafes shopping in South Korea in 2023, adopting our crazy zooming Thomas the Tank Engine ("Choo Choo!") Tommy in 2024, DISNEY IN 2025, and celebrating 5 amazing years in Cancun—every single memory with you is my new favorite adventure.

I hope your day is filled with the best coffee, delicious food, Joonie cuddles, Jinny food-begging screams, Tommy zoomies and playtime, and all the love in the world.

I love you forever and always,
— Lucas (And the boos)❤️🐾`
};

window.CAT_DEX_DATA = [
  {
    id: "jinny",
    name: "JINNY",
    icon: "🧡",
    photoKey: "jinny_portrait",
    joined: "Class of 2021",
    title: "Grandmaster Gourmand & Foos Muncher",
    specialMove: "SONIC FOOD SCREAM",
    bio: "Adopted in 2021 alongside Joonie! Jinny is 100% food-motivated and loses his mind the millisecond someone moves toward the kitchen or opens a food can. Will trade loyalty for a single treat."
  },
  {
    id: "joonie",
    name: "JOONIE",
    icon: "🤍",
    photoKey: "joonie_portrait",
    joined: "Class of 2021",
    title: "Supreme Cuddle Bug of the Crusty Eyes",
    specialMove: "ORGAN CRUSH",
    bio: "Adopted in 2021! Joonie is the ultimate professional snuggler. Always has cute little dirty eyes that need wiping, and refuses to let Rebecca get up once he settles in for cuddles."
  },
  {
    id: "billie",
    name: "BILLIE",
    icon: "🌟",
    photoKey: "billie_portrait",
    joined: "2022 – Forever Our Star",
    title: "Celestial Guardian of the Timeline",
    specialMove: "STARLIGHT PURR BLESSING",
    bio: "Joined the family in 2022 and forever in our hearts since 2024. In the Chrono-Verse, Billie watches over every timeline from the Starlight Constellation, guiding Rebecca and Lucas with warm golden purrs."
  },
  {
    id: "tommy",
    name: "TOMMY (AKA 'CHOO CHOO')",
    icon: "🚂",
    photoKey: "tommy_portrait",
    joined: "Class of 2024",
    title: "Thomas the Tank Engine // Choochiecado",
    specialMove: "DROOL BLAST",
    bio: "Adopted in 2024! A chaotic, high-voltage bundle of pure energy. Officially nicknamed 'Thomas the Tank Engine'—or simply 'Choo Choo'—because train. "
  }
];

window.PHOTO_SCRAPBOOK_LIST = [
  { key: "kitty_hawk", title: "2021 // KITTY HAWK BEACH", sub: "Rebecca & Lucas on the Outer Banks shore" },
  { key: "jinny_joonie_adoption", title: "2021 // JINNY & JOONIE ADOPTION", sub: "Two tiny orange-and-white cuddle kittens!" },
  { key: "billie_adoption", title: "2022 // WELCOMING SWEET BILLIE", sub: "Rebecca holding baby calico Billie" },
  { key: "billie_portrait", title: "FOREVER OUR STAR // BILLIE", sub: "Guardian of the Starlight Constellation" },
  { key: "korea", title: "2023 // SOUTH KOREA ADVENTURE", sub: "Gyeongbokgung Palace & Namsan Seoul Tower" },
  { key: "tommy_adoption", title: "2024 // BABY TOMMY ADOPTION DAY", sub: "Before he reached full Choo-Choo speed!" },
  { key: "tommy_portrait", title: "2024 // THOMAS THE TANK ENGINE", sub: "Tommy ('Choo Choo!') Surveying His Kingdom" },
  { key: "jinny_portrait", title: "PARTY MEMBER // JINNY", sub: "Waiting patiently (or not) for his next snack" },
  { key: "joonie_portrait", title: "PARTY MEMBER // JOONIE", sub: "Cuddle bug with his a feather toy" },
  { key: "disney", title: "2025 // DISNEY WORLD MAGIC", sub: "Main Street lights, Cinderella Castle & holiday magic!" },
  { key: "cancun", title: "2026 // CANCUN 5-YEAR ANNIVERSARY", sub: "Celebrating 5 amazing years together!" }
];
window.ITEMS_CATALOG = {
  iced_coffee: {
    name: "Guatemala Antigua Coffee",
    icon: "☕",
    desc: "Brewed to perfection. Restores 100% energy across all timelines."
  },
  jinny_treats: {
    name: "Jinny's Emergency Foos",
    icon: "🐟",
    desc: "Shake this bag to summon Jinny from anywhere in the space-time continuum."
  },
  joonie_tissue: {
    name: "Soft Eye-Wipe Hankie",
    icon: "🧻",
    desc: "Specially crafted for wiping Joonie's cute dirty eyes before cuddle time."
  },
  kitty_hawk_shell: {
    name: "2021 Kitty Hawk Seashell",
    icon: "🐚",
    desc: "Hums with the ocean breeze of the Outer Banks and early adventures."
  },
  billie_star_charm: {
    name: "Billie's Starlight Charm",
    icon: "🌟",
    desc: "A warm, glowing golden star gifted by sweet Billie. Unlocks celestial paths."
  },
  seoul_tmoney: {
    name: "2023 Seoul Cafe Pass",
    icon: "🧋",
    desc: "VIP pass to every aesthetic cafe in South Korea."
  },
  choo_choo_whistle: {
    name: "Golden Choo-Choo Whistle",
    icon: "🚂",
    desc: "Summons Thomas the Tank Engine at maximum zoomie velocity!"
  },
  golden_pasta_fork: {
    name: "Legendary Pasta Fork",
    icon: "🍝",
    desc: "Twirls the most incredible pasta in the multiverse."
  },
  disney_ears: {
    name: "2025 Magic Kingdom Castle Pin",
    icon: "🏰",
    desc: "Sparkles with Main Street holiday lights, fireworks, and 2025 Disney World magic."
  },
  cancun_vip_band: {
    name: "2026 Cancun Sun Stone",
    icon: "🏖️",
    desc: "Radiates turquoise Caribbean sunshine and 5 years of love."
  }
};

window.ENDINGS_CATALOG = {
  ending_true: {
    id: "ending_true",
    title: "ENDING 1: THE ULTIMATE BIRTHDAY FEAST (TRUE ENDING)",
    badge: "💖 TRUE TIMELINE",
    summary: "Returned home with memories from 2021–2026 for Lucas's surprise pasta & coffee birthday banquet with all the cats!"
  },
  ending_starlight: {
    id: "ending_starlight",
    title: "ENDING 2: BILLIE'S GOLDEN CONSTELLATION (SECRET ENDING)",
    badge: "🌟 SECRET STAR",
    summary: "Unlocked the secret rooftop observatory where Billie's starlight blesses the whole family across time."
  },
  ending_cat_empress: {
    id: "ending_cat_empress",
    title: "ENDING 3: EMPRESS OF THE FELINE REALM",
    badge: "👑 CAT KINGDOM",
    summary: "Ruled the Royal Cat Dimension alongside Lucas, Lord Jinny, Sir Joonie, and the Royal Choo-Choo Express!"
  },
  ending_seoul_cafe: {
    id: "ending_seoul_cafe",
    title: "ENDING 4: SEOUL COFFEE & PASTA MOGULS",
    badge: "🇰🇷 SEOUL LEGENDS",
    summary: "Opened the world's happiest Cat, Coffee & Pasta Cafe in South Korea!"
  },
  ending_cancun_forever: {
    id: "ending_cancun_forever",
    title: "ENDING 5: ENDLESS CANCUN SUNSET LOOP",
    badge: "🏝️ PARADISE LOOP",
    summary: "Put the 2026 Cancun 5-Year Anniversary beach paradise on an infinite cozy time-loop!"
  },
  ending_choo_choo_galaxy: {
    id: "ending_choo_choo_galaxy",
    title: "ENDING 6: ABOARD THE INTERGALACTIC CHOO-CHOO EXPRESS",
    badge: "🚂 COSMIC ZOOMIES",
    summary: "Rode Tommy the Tank Engine's Cosmic Train across the Milky Way!"
  },
  ending_2076_golden: {
    id: "ending_2076_golden",
    title: "ENDING 7: 2076 — FIFTY YEARS OF COFFEE & LOVE",
    badge: "⏳ FUTURE SOULMATES",
    summary: "Visited the year 2076 and saw Rebecca & Lucas still laughing at the same inside jokes 50 years later."
  },
  ending_disney_magic: {
    id: "ending_disney_magic",
    title: "ENDING 8: ROYAL VIPS OF CINDERELLA CASTLE",
    badge: "🏰 DISNEY ROYALTY",
    summary: "Unlocked the Cinderella Castle Dream Suite at Disney World with unlimited Lightning Lanes, Main Street coffee, and nightly fireworks!"
  }
};

window.STORY_NODES = {
  start: {
    title: "Prologue: Birthday Morning & The Chrono-Console",
    era: "2026 // BIRTHDAY MORNING",
    yearTag: "YR: 2026",
    location: "COZY KITCHEN",
    theme: "theme-birthday",
    sceneType: "morning_kitchen",
    caption: "Coffee is brewing, Jinny wants breakfast, Joonie wants cuddles, and Tommy goes CHOO CHOO!",
    coffee: 75,
    love: 100,
    text: `Happy Birthday, {wife}! 🎉

Sunlight streams into the kitchen along with the heavenly aroma of fresh {drink}. Before you can even take a sip, the morning chaos crew is in full swing:

• **Jinny** is doing his frantic screaming as if he hasn't been fed since the Jurassic period.
• **Joonie** is perched on the cat tree like a velcro cuddle bug, blinking at you with his signature 'pretend he has no idea what's going on' expression.
• **Tommy** is doing figure-eights around your ankles, hit tiny meow croaking as he begs for his servings.

Beside your mug sits a glowing retro box from **{husband}** labeled: **"THE CHRONO-CAT TIME DIAL — PRESS ANY ERA TO BEGIN A FLASHBACK."**`,
    choices: [
      {
        text: "☕ Gulp your fresh {drink} and inspect {husband}'s glowing Chrono-Dial",
        tag: "+COFFEE",
        hideIfItem: "iced_coffee",
        next: "kitchen_prep"
      },
      {
        text: "🐟 Give food-obsessed Jinny his boos foos before he dies",
        tag: "JINNY",
        hideIfItem: "jinny_treats",
        next: "feed_jinny"
      },
      {
        text: "🤍 Clean Joonie's dirty eyes and give him snuggles",
        tag: "JOONIE",
        hideIfItem: "joonie_tissue",
        next: "cuddle_joonie"
      },
      {
        text: "🚂 Blow an imaginary train whistle as Choo Choo drifts around the corner",
        tag: "CHOO CHOO!",
        sfx: "choochoo",
        hideIfItem: "choo_choo_whistle",
        next: "zoom_tommy"
      },
      {
        text: "⚡ Step up to the glowing Chrono-Dial and Time Jump!",
        tag: "TIME DIAL",
        checkBoosWarning: true,
        next: "chrono_hub"
      }
    ]
  },
  kitchen_prep: {
    title: "Powered by Morning Caffeine",
    era: "2026 // BIRTHDAY MORNING",
    yearTag: "YR: 2026",
    location: "HOME COFFEE BAR",
    theme: "theme-birthday",
    sceneType: "morning_kitchen",
    caption: "Caffeine Level: MAXIMUM! You pocket a travel iced coffee for the road.",
    coffee: 100,
    love: 100,
    giveItem: "iced_coffee",
    text: `You take a glorious sip of {drink} and pack an extra **Guatemala Antigua {drink}** into your Chrono-Pocket just in case the space-time continuum lacks good baristas.

{husband} walks in grinning with a birthday party hat slightly crooked on his head. "Happy Birthday, {wife}! I calibrated the Chrono-Dial to some great memories, and also a few wild alternate universes. Make sure you've checked on all the boos before we jump!"`,
    choices: [
      { text: "🐟 Give food-obsessed Jinny his boos foos before he eats the time machine", tag: "JINNY", hideIfItem: "jinny_treats", next: "feed_jinny" },
      { text: "🤍 Clean Joonie's dirty eyes and give him snuggles", tag: "JOONIE", hideIfItem: "joonie_tissue", next: "cuddle_joonie" },
      { text: "🚂 Check on Tommy ('Choo Choo!') drifting down the hallway", tag: "CHOO CHOO!", sfx: "choochoo", hideIfItem: "choo_choo_whistle", next: "zoom_tommy" },
      { text: "⚡ Step up to the glowing Chrono-Dial Hub!", tag: "TIME DIAL", checkBoosWarning: true, next: "chrono_hub" }
    ]
  },

  feed_jinny: {
    title: "Jinny's Feast of Champions (Boos Foos!)",
    era: "2026 // BIRTHDAY MORNING",
    yearTag: "YR: 2026",
    location: "THE FOOD BOWL ARENA",
    theme: "theme-birthday",
    sceneType: "cats_trio",
    photoKey: "jinny_portrait",
    caption: "Jinny inhales his boos foos at relativistic speeds!",
    coffee: 85,
    love: 100,
    giveItem: "jinny_treats",
    sfx: "meow",
    text: `The second your hand touches the food container, **Jinny** levitates three feet off the floor in pure food-motivated ecstasy for his **boos foos**!

*CRUNCH CRUNCH CRUNCH.*

Grateful for your service, Jinny nudges a spare pouch of **Jinny's Emergency Foos** into your bag. Something tells you having snacks on hand will unlock secret doors across the multiverse.`,
    choices: [
      { text: "☕ Gulp your fresh morning {drink}", tag: "+COFFEE", hideIfItem: "iced_coffee", next: "kitchen_prep" },
      { text: "🤍 Clean Joonie's dirty eyes and give him a cuddle", tag: "JOONIE", hideIfItem: "joonie_tissue", next: "cuddle_joonie" },
      { text: "🚂 Check on Tommy ('Choo Choo!') drifting down the hall", tag: "CHOO CHOO!", sfx: "choochoo", hideIfItem: "choo_choo_whistle", next: "zoom_tommy" },
      { text: "⚡ Activate the Chrono-Dial Time Machine!", tag: "TIME DIAL", checkBoosWarning: true, next: "chrono_hub" }
    ]
  },

  cuddle_joonie: {
    title: "Joonie's Cuddle Lockdown",
    era: "2026 // BIRTHDAY MORNING",
    yearTag: "YR: 2026",
    location: "THE COZY BED",
    theme: "theme-birthday",
    sceneType: "cats_trio",
    photoKey: "joonie_portrait",
    caption: "Joonie purrs and crushes your organs, but at least he has cute, clean eyes!",
    coffee: 85,
    love: 100,
    giveItem: "joonie_tissue",
    sfx: "meow",
    text: `You scoop up **Joonie**, who immediately melts into your arms like warm dough. You gently wipe his cute little dirty eyes with a **Soft Eye-Wipe Hankie** until he looks like a handsome prince.

Joonie rewards you with a level-99 headbutt that vibrates the Chrono-Dial on the table!`,
    choices: [
      { text: "☕ Gulp your fresh morning {drink}", tag: "+COFFEE", hideIfItem: "iced_coffee", next: "kitchen_prep" },
      { text: "🐟 Give food-obsessed Jinny his boos foos before he dies", tag: "JINNY", hideIfItem: "jinny_treats", next: "feed_jinny" },
      { text: "🚂 Check on Tommy ('Choo Choo!') probably hiding somewhere you will never find him", tag: "CHOO CHOO!", sfx: "choochoo", hideIfItem: "choo_choo_whistle", next: "zoom_tommy" },
      { text: "⚡ Step up to the glowing Chrono-Dial!", tag: "TIME DIAL", checkBoosWarning: true, next: "chrono_hub" }
    ]
  },

  zoom_tommy: {
    title: "All Aboard the Choo-Choo Express!",
    era: "2026 // BIRTHDAY MORNING",
    yearTag: "YR: 2026",
    location: "HALLWAY SPEEDWAY",
    theme: "theme-2024",
    sceneType: "tommy_train",
    photoKey: "tommy_portrait",
    caption: "CHOO CHOO! Thomas the Tank Engine has no brakes!",
    coffee: 90,
    love: 100,
    giveItem: "choo_choo_whistle",
    sfx: "choochoo",
    text: `*CHOO CHOO!* 🚂💨

**Tommy** comes drifting sideways around the hallway rug like a caffeinated locomotive! {husband} laughs: "Watch out, Tommy Wommy is on the express track!"
 
As Tommy zips past, he drops a shiny **Golden Choo-Choo Whistle** at your feet. With kinetic zoomie energy charging the room, the Chrono-Dial hums to life!`,
    choices: [
      { text: "☕ Gulp your fresh morning {drink}", tag: "+COFFEE", hideIfItem: "iced_coffee", next: "kitchen_prep" },
      { text: "🐟 Give food-obsessed Jinny his boos foos before he dies", tag: "JINNY", hideIfItem: "jinny_treats", next: "feed_jinny" },
      { text: "🤍 Clean Joonie's dirty eyes and give him snuggles", tag: "JOONIE", hideIfItem: "joonie_tissue", next: "cuddle_joonie" },
      { text: "⚡ Grab the Chrono-Dial and pick your first Time Jump!", tag: "TIME DIAL", checkBoosWarning: true, next: "chrono_hub" }
    ]
  },

  chrono_hub: {
    title: "The Chrono-Dial: Choose Your Era!",
    era: "NEXUS // SPACE-TIME HUB",
    yearTag: "ALL ERAS",
    location: "THE CHRONO-PORTAL",
    theme: "theme-birthday",
    sceneType: "time_portal",
    caption: "Neon holographic rings spin around you and Lucas. Which memory or universe calls to you?",
    coffee: 95,
    love: 100,
    sfx: "warp",
    text: `The retro CRT screen on the Chrono-Dial flashes in glowing pixel letters:
**"WELCOME, BIRTHDAY TRAVELER {wife} & CO-PILOT {husband}!"**

Holographic portals shimmer around the living room, each showing a different memory of your lives—plus a few chaotic alternate timelines. You can visit multiple eras to collect souvenirs before heading to your grand finale!`,
    choices: [
      { text: "🌊 JUMP TO 2021: Kitty Hawk Vacation & Baby Jinny + Joonie", tag: "2021", next: "era_2021_hub" },
      { text: "🌟 JUMP TO 2022: Golden Memories with Sweet Billie", tag: "2022", next: "era_2022_billie" },
      { text: "🇰🇷 JUMP TO 2023: South Korea Cafes, Street Food & Neon Nights", tag: "2023", next: "era_2023_korea" },
      { text: "🚂 JUMP TO 2024: Adopting Tommy ('Choo Choo!' Thomas the Tank Engine)", tag: "2024", next: "era_2024_tommy" },
      { text: "🏰 JUMP TO 2025: Magical Trip to Disney World!", tag: "2025", next: "era_2025_disney" },
      { text: "🏖️ JUMP TO 2026: 5-Year Anniversary in Sunny Cancun!", tag: "2026", next: "era_2026_cancun" },
      { text: "👑 MULTIVERSE PORTAL: Enter the Royal Cat & Pasta Dimension", tag: "ALT REALITY", next: "alt_cat_kingdom" },
      { text: "🎂 GRAND FINALE: Ready to head to your Birthday Celebration!", tag: "FINALE", next: "finale_hub" },
      { text: "🔒 MYSTERY DLC: COMING CHRISTMAS 2026...", tag: "🎄 DEC 2026", action: "open_dlc", next: "chrono_hub" }
    ]
  },
  // ==================== 2021 TIMELINE: KITTY HAWK & JINNY/JOONIE ====================
  era_2021_hub: {
    title: "2021: Coastal Winds & Two New Kittens",
    era: "2021 // OUTER BANKS & NEW PAWS",
    yearTag: "YR: 2021",
    location: "KITTY HAWK, NC",
    theme: "theme-2021",
    sceneType: "kitty_hawk",
    photoKey: "kitty_hawk",
    caption: "Ocean waves crash along Kitty Hawk as a vintage biplane glides across the dunes.",
    coffee: 85,
    love: 100,
    sfx: "warp",
    text: `*WHOOSH!* You and {husband} materialize in the year **2021**!

Salt air fills your lungs as you stand on the sandy dunes of **Kitty Hawk**. Waves roll onto the Outer Banks shore while seagulls circle overhead.

Your Chrono-Scanner also pings a second 2021 coordinate nearby: the unforgettable day two tiny furballs named **Jinny** and **Joonie** officially joined your family!`,
    choices: [
      { text: "🐚 Stroll the Kitty Hawk beach dunes with {husband} & iced {drink}", tag: "KITTY HAWK", next: "kitty_hawk_2021" },
      { text: "🐾 Visit 2021 Home: The day baby Jinny & Joonie arrived!", tag: "JINNY & JOONIE", next: "adopt_2021" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "HUB", next: "chrono_hub" }
    ]
  },

  kitty_hawk_2021: {
    title: "2021: Flight Over Kitty Hawk",
    era: "2021 // OUTER BANKS",
    yearTag: "YR: 2021",
    location: "KILL DEVIL HILLS & BEACH",
    theme: "theme-2021",
    sceneType: "kitty_hawk",
    photoKey: "kitty_hawk",
    caption: "You found the iridescent 2021 Kitty Hawk Seashell!",
    coffee: 95,
    love: 100,
    giveItem: "kitty_hawk_shell",
    text: `You and {husband} walk hand-in-hand along the Kitty Hawk shoreline, while the Atlantic breeze whips around you. Up on the dunes near the Wright Brothers monument, you spot a shimmering **2021 Kitty Hawk Seashell** half-buried in the sand.

"Crazy to think how many adventures were still ahead of us back in 2021," {husband} smiles, wrapping an arm around your shoulders. You pocket the seashell—it hums with warm coastal magic!`,
    choices: [
      { text: "🐾 Now check on 2021 baby Jinny & Joonie!", tag: "2021 CATS", next: "adopt_2021" },
      { text: "🇰🇷 Jump forward to 2023: South Korea!", tag: "2023", next: "era_2023_korea" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "HUB", next: "chrono_hub" }
    ]
  },

  adopt_2021: {
    title: "2021: Double Trouble — Jinny & Joonie Arrive!",
    era: "2021 // ADOPTION DAY",
    yearTag: "YR: 2021",
    location: "LIVING ROOM FLOOR",
    theme: "theme-2021",
    sceneType: "cats_trio",
    photoKey: "jinny_joonie_adoption",
    caption: "Baby Jinny is already hunting for snacks while baby Joonie climbs into your lap!",
    coffee: 90,
    love: 100,
    giveItem: "jinny_treats",
    sfx: "meow",
    text: `You peek into 2021 on the day **Jinny** and **Joonie** came home!

Even back then, their personalities were locked in at 100%:
• **Jinny** immediately sprints toward the kitchen sniffing for food like a tiny furry vacuum cleaner.
• **Joonie** toddles straight into your lap, looks up with his adorable slightly dirty nose, and glues himself to your sweater for a three-hour cuddle session.

Your heart melts all over again watching where your cat-parent journey began.`,
    choices: [
      { text: "🐚 Visit the 2021 Kitty Hawk beach dunes", tag: "KITTY HAWK", next: "kitty_hawk_2021" },
      { text: "🌟 Jump to 2022: Visit sweet Billie's Golden Memory", tag: "2022", next: "era_2022_billie" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "HUB", next: "chrono_hub" }
    ]
  },

  // ==================== 2022 TIMELINE: SWEET BILLIE ====================
  era_2022_billie: {
    title: "2022: Golden Sunbeams & Sweet Billie",
    era: "2022 // STARLIGHT SANCTUARY",
    yearTag: "YR: 2022",
    location: "SUNLIT WINDOW & STAR REALM",
    theme: "theme-2022",
    sceneType: "billie_star",
    photoKey: "billie_adoption",
    caption: "Billie purrs in a beam of warm golden starlight, forever part of your family.",
    coffee: 95,
    love: 100,
    giveItem: "billie_star_charm",
    sfx: "meow",
    text: `The Chrono-Dial glows with a gentle, warm amber light as you step into **2022**—the year sweet **Billie** joined your family alongside Jinny and Joonie.

In a cozy patch of golden afternoon sunlight, Billie looks up at you and {husband} with the sweetest, calmest eyes and gives a soft, loving chirp. As you stroke Billie's soft fur, the sunlight shimmers into a starry constellation overhead.

Billie nudges a glowing **Billie's Starlight Charm** into your hand—a reminder that Billie is always watching over your family across every year and every timeline. ❤️`,
    choices: [
      { text: "🌟 Follow Billie's starlight beam to the Secret Celestial Observatory", tag: "SECRET PATH", reqItem: "billie_star_charm", next: "ending_starlight_node" },
      { text: "🇰🇷 Jump to 2023: Explore South Korea with {husband}!", tag: "2023", next: "era_2023_korea" },
      { text: "🚂 Jump to 2024: Meet zooming Tommy ('Choo Choo!')", tag: "2024", next: "era_2024_tommy" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "HUB", next: "chrono_hub" }
    ]
  },
  // ==================== 2023 TIMELINE: SOUTH KOREA ====================
  era_2023_korea: {
    title: "2023: Neon Lights & Coffee in South Korea!",
    era: "2023 // SEOUL ADVENTURE",
    yearTag: "YR: 2023",
    location: "SEOUL, SOUTH KOREA",
    theme: "theme-2023",
    sceneType: "seoul_2023",
    photoKey: "korea",
    caption: "Namsan Tower glows over Seoul as cafe aromas and street food fill the night air!",
    coffee: 100,
    love: 100,
    giveItem: "seoul_tmoney",
    sfx: "warp",
    text: `*BEEP-BEEP!* Your Chrono-Dial flashes with neon pink and cyan as you and {husband} land in **2023 South Korea**!

From ancient palaces and bustling Myeongdong alleys to the most aesthetic coffee shops on Earth, Seoul is pure magic. You check your pocket and find a loaded **2023 Seoul Cafe Pass**!

"Alright {wife}," {husband} grins, holding up two iced lattes. "Where are we heading first on our Korean adventure?"`,
    choices: [
      { text: "☕ Hit an aesthetic Seoul rooftop cafe for signature {drink} & fusion {food}!", tag: "CAFE HOP", next: "korea_cafe_hop" },
      { text: "🏮 Explore the lively night markets & decide to open a permanent Seoul Cafe!", tag: "SEOUL DREAM", next: "ending_seoul_node" },
      { text: "🚂 Jump to 2024: The arrival of Tommy ('Choo Choo!')", tag: "2024", next: "era_2024_tommy" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "HUB", next: "chrono_hub" }
    ]
  },

  korea_cafe_hop: {
    title: "2023: The Legendary Seoul Cafe & Pasta Bistro",
    era: "2023 // HONGDAE & IKSEON-DONG",
    yearTag: "YR: 2023",
    location: "SEOUL ARTISAN BISTRO",
    theme: "theme-2023",
    sceneType: "seoul_2023",
    photoKey: "korea",
    caption: "Creamy gochujang-truffle pasta and world-class poured coffee!",
    coffee: 100,
    love: 100,
    giveItem: "golden_pasta_fork",
    text: `You and {husband} tuck into a hidden hanok courtyard cafe in Seoul. First comes the smoothest, richest {drink} you've ever tasted—followed by a steaming plate of artisanal Korean-Italian fusion {food}!

The chef is so impressed by your appreciation for elite {food} that he presents you with the **Legendary Pasta Fork**!`,
    choices: [
      { text: "🏖️ Fast-forward to 2026: Our 5-Year Anniversary in Cancun!", tag: "2026 CANCUN", next: "era_2026_cancun" },
      { text: "🚂 Jump to 2024: Adopting Tommy ('Choo Choo!')", tag: "2024", next: "era_2024_tommy" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "HUB", next: "chrono_hub" }
    ]
  },

  // ==================== 2024 TIMELINE: TOMMY ("CHOO CHOO!") ====================
  era_2024_tommy: {
    title: "2024: Enter Thomas the Tank Engine ('Choo Choo!')",
    era: "2024 // LOCOMOTIVE ADOPTION",
    yearTag: "YR: 2024",
    location: "THE ZOOMIE STATION",
    theme: "theme-2024",
    sceneType: "tommy_train",
    photoKey: "tommy_adoption",
    caption: "CHOO CHOO! Tommy zooms into your hearts!",
    coffee: 90,
    love: 100,
    giveItem: "choo_choo_whistle",
    sfx: "choochoo",
    text: `You arrive in **2024**—a year of deep love, honoring sweet **Billie's** memory in your hearts, and opening your home to a brand-new whirlwind of joy: **Tommy**!

Within approximately four seconds of arriving, Tommy reveals his true identity: **Thomas the Tank Engine**—affectionately known as **"Choo Choo"**!

*CHOO CHOO!* He ricochets off the sofa, sprints past Jinny's food bowl, leaps over cuddle-bug Joonie, and circles you and {husband} five times before skidding to a halt!`,
    choices: [
      { text: "🚂 Blow the Golden Choo-Choo Whistle and ride Tommy's Cosmic Zoomie Express!", tag: "CHOO CHOO!", sfx: "choochoo", next: "ending_choo_choo_node" },
      { text: "🏰 Jump to 2025: Magical Trip to Disney World!", tag: "2025 DISNEY", next: "era_2025_disney" },
      { text: "🏖️ Jump to 2026: Celebrate 5 Years together in Cancun!", tag: "2026 CANCUN", next: "era_2026_cancun" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "HUB", next: "chrono_hub" }
    ]
  },

  // ==================== 2025 TIMELINE: DISNEY WORLD ====================
  era_2025_disney: {
    title: "2025: Main Street Lights & Cinderella Castle Wishes!",
    era: "2025 // WALT DISNEY WORLD",
    yearTag: "YR: 2025",
    location: "MAGIC KINGDOM, FL",
    theme: "theme-2025",
    sceneType: "disney_castle",
    photoKey: "disney",
    caption: "Cinderella Castle glows blue and gold as holiday lights twinkle down Main Street U.S.A.!",
    coffee: 100,
    love: 100,
    giveItem: "disney_ears",
    sfx: "warp",
    text: `*PIXIE DUST WHOOSH!* ✨🏰

The Chrono-Dial shimmers with starlight blue and gold as you and **{husband}** step straight into **2025 Walt Disney World**!

Main Street U.S.A. is glowing with thousands of twinkling lights, festive wreaths, and a towering, sparkling holiday tree. Ahead of you, **Cinderella Castle** shines bright sapphire blue against the night sky!

You pocket a commemorative **2025 Magic Kingdom Castle Pin** as {husband} hands you an iced **{drink}** for a full day (and night!) of park-hopping magic.`,
    choices: [
      { text: "🍝 Park-hop to EPCOT & Magic Kingdom for rides, {drink}, and Italian {food}!", tag: "PARK HOP", next: "disney_park_hop" },
      { text: "🏰 Unlock the secret Cinderella Castle Dream Suite & rule the Magic Kingdom!", tag: "DISNEY ENDING", next: "ending_disney_node" },
      { text: "🏖️ Jump to 2026: Our 5-Year Anniversary in Sunny Cancun!", tag: "2026 CANCUN", next: "era_2026_cancun" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "HUB", next: "chrono_hub" }
    ]
  },

  disney_park_hop: {
    title: "2025: Fireworks, Rides & World Showcase Pasta!",
    era: "2025 // EPCOT & MAGIC KINGDOM",
    yearTag: "YR: 2025",
    location: "DISNEY WORLD PARKS",
    theme: "theme-2025",
    sceneType: "disney_castle",
    photoKey: "disney",
    caption: "Zero wait times, world-class pasta in the Italy Pavilion, and fireworks over the castle!",
    coffee: 100,
    love: 100,
    text: `You and **{husband}** have the ultimate Disney day! Every ride you walk up to magically has a 0-minute wait, your afternoon Margarita and Ottowa Apple hits the spot, and dinner at the Italy Pavilion serves up a legendary plate of handmade **{food}**!

As night falls, you stand together in front of Cinderella Castle watching the sky explode with 8-bit fireworks while the music swells around you.`,
    choices: [
      { text: "🏰 Stay in the Cinderella Castle Dream Suite forever (Unlock Ending 8!)", tag: "DISNEY ENDING", next: "ending_disney_node" },
      { text: "🏖️ Jump ahead to 2026: 5-Year Anniversary in Cancun!", tag: "2026 CANCUN", next: "era_2026_cancun" },
      { text: "🎂 Head to the Grand Birthday Finale!", tag: "FINALE", next: "finale_hub" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "HUB", next: "chrono_hub" }
    ]
  },

  // ==================== 2026 TIMELINE: CANCUN 5-YEAR ANNIVERSARY ====================
  era_2026_cancun: {
    title: "2026: 5-Year Anniversary in Sunny Cancun!",
    era: "2026 // 5-YEAR ANNIVERSARY",
    yearTag: "YR: 2026",
    location: "CANCUN BEACH RESORT",
    theme: "theme-2026",
    sceneType: "cancun_beach",
    photoKey: "cancun",
    caption: "Turquoise Caribbean waves, oceanfront lunch, unlimited drinks, and 5 incredible years!",
    coffee: 100,
    love: 100,
    giveItem: "cancun_vip_band",
    sfx: "warp",
    text: `Warm tropical breezes greet you as you step onto the white-sand beaches of **Cancun** for your **2026 5-Year Anniversary**! 🌴🌊

The turquoise Caribbean water sparkles in the sun. A private cabana awaits with iced {drink}s and a candlelit seaside {food} dinner for two.

{husband} raises his glass to yours: "Five years of adventures, four unforgettable cats, and a million laughs. Happy Anniversary and Happy Birthday, {wife}!" You receive the **2026 Cancun Sun Stone**!`,
    choices: [
      { text: "🏝️ Lock the Chrono-Dial to stay on this Cancun beach sunset forever!", tag: "ENDLESS BEACH", next: "ending_cancun_node" },
      { text: "⏳ Peek 50 years into the future: Visit Year 2076 together!", tag: "YR 2076", next: "ending_2076_node" },
      { text: "🎂 Bring your Cancun glow back for the Grand Birthday Finale!", tag: "FINALE", next: "finale_hub" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "HUB", next: "chrono_hub" }
    ]
  },
  // ==================== MULTIVERSE: THE ROYAL CAT KINGDOM ====================
  alt_cat_kingdom: {
    title: "Dimension X-99: The Royal Kingdom of Cats-Alot",
    era: "MULTIVERSE // FELINE EMPIRE",
    yearTag: "DIM: CAT-99",
    location: "CASTLE PASTA-LOT",
    theme: "theme-multiverse",
    sceneType: "cat_kingdom",
    caption: "Lord Jinny demands pasta, Sir Joonie demands cuddles, and the Royal Choo-Choo guards the moat!",
    coffee: 95,
    love: 100,
    sfx: "meow",
    text: `You and {husband} step through a purple multiverse rift into **Castle Pasta-Lot**, a fantasy kingdom ruled entirely by your cats!

• **Emperor Jinny the Ravenous** sits upon a throne of golden foos, banging a tiny spoon: *"BRING FORTH THE ROYAL {food}!"*
• **Duke Joonie of the Crusty Eyes** lounges on a velvet pillow waiting for his royal eye cleaning and lap cuddles.
• Around the castle battlements runs a literal steam locomotive driven by **Conductor Tommy ("CHOO CHOO!")**, while **Star-Guardian Billie's** banner shines brightly over the castle towers!`,
    choices: [
      { text: "👑 Accept the Crown & rule the Cat Kingdom forever with {husband}!", tag: "ENDING", next: "ending_cat_empress_node" },
      { text: "🍝 Present the Legendary Pasta Fork & Jinny's Treats items for a Royal Blessing!", tag: "SECRET ITEM", reqItem: "golden_pasta_fork", next: "finale_hub" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "HUB", next: "chrono_hub" }
    ]
  },

  // ==================== GRAND FINALE HUB ====================
  finale_hub: {
    title: "Return to 2026: The Birthday Surprise Awaits!",
    era: "2026 // BIRTHDAY EVENING",
    yearTag: "YR: 2026",
    location: "CANDLELIT DINING ROOM",
    theme: "theme-birthday",
    sceneType: "birthday_finale",
    caption: "Fairy lights twinkle as Lucas, Jinny, Joonie & Tommy welcome you back to the present!",
    coffee: 100,
    love: 100,
    text: `You step out of the Chrono-Portal back into the present evening. The whole house is decorated with twinkling lights and souvenirs from Kitty Hawk, South Korea, and Cancun and more!

{husband} stands beside a table loaded with gifts, and a glowing birthday cake.

• **Jinny** is staring hypnotically at the cake.
• **Joonie** is stealing your seat.
• **Tommy ("Choo Choo!")** does a celebratory victory lap around the table while a warm golden star twinkles outside the window for **Billie**.`,
    choices: [
      { text: "💖 Blow out your candles & unlock the TRUE BIRTHDAY ENDING!", tag: "TRUE ENDING", next: "ending_true_node" },
      { text: "🌟 Hold up Billie's Starlight Charm toward the night sky first", tag: "STAR ENDING", reqItem: "billie_star_charm", next: "ending_starlight_node" },
      { text: "⚡ Wait—jump back to the Chrono-Dial to explore more eras first!", tag: "EXPLORE", next: "chrono_hub" }
    ]
  },

  // ==================== ALL 7 UNLOCKABLE ENDINGS ====================
  ending_true_node: {
    title: "ENDING 1: The True Soulmate & Birthday Banquet Timeline!",
    era: "2026 // BEST BIRTHDAY EVER",
    yearTag: "ENDING 1/7",
    location: "HOME WITH LUCAS & THE CATS",
    theme: "theme-birthday",
    sceneType: "birthday_finale",
    caption: "HAPPY BIRTHDAY REBECCA! Unlocked: True Birthday Finale!",
    coffee: 100,
    love: 100,
    isEnding: true,
    endingId: "ending_true",
    sfx: "birthday",
    text: `🎉 **HAPPY BIRTHDAY, {wife}!** 🎉

You blow out the candles as 8-bit confetti rains down! You and **{husband}** feast on the most incredible **{food}** and toast while reliving the memories you visited.

**Jinny** gets a special birthday treat (and immediately asks for seconds), **Joonie** curls up in your lap for the ultimate birthday cuddle, **Tommy ("Choo Choo!")** falls asleep mid-zoomie like a parked locomotive, and **Billie's** star shines warm and bright outside your window.

No matter what year or universe the Chrono-Dial lands on, the best timeline in the multiverse is right here with you.`,
    choices: [
      { text: "💌 Open {husband}'s Personal Birthday Letter", tag: "LOVE NOTE", action: "open_card", next: "ending_true_node" },
      { text: "⚡ Rewind to the Chrono-Dial Hub to hunt for the other 6 Endings!", tag: "REPLAY HUB", next: "chrono_hub" }
    ]
  },
  ending_starlight_node: {
    title: "ENDING 2: Billie's Golden Constellation (Secret Starlight Ending)",
    era: "CELESTIAL REALM // FOREVER IN OUR HEARTS",
    yearTag: "ENDING 2/7",
    location: "STARLIGHT OBSERVATORY",
    theme: "theme-2022",
    sceneType: "billie_star",
    photoKey: "billie_portrait",
    caption: "Billie's golden constellation illuminates your whole family across space and time.",
    coffee: 100,
    love: 100,
    isEnding: true,
    endingId: "ending_starlight",
    sfx: "birthday",
    text: `🌟 **SECRET ENDING UNLOCKED: BILLIE'S GOLDEN CONSTELLATION** 🌟

Holding up **Billie's Starlight Charm**, a stairway of warm golden light shimmers into view, leading you, **{husband}**, **Jinny**, **Joonie**, and **Tommy** up to a cozy celestial rooftop observatory.

Above you, the stars arrange themselves into a glowing constellation of sweet **Billie**. A warm golden breeze wraps around all of you like a familiar purr—reminding you that the love you shared in 2022–2024 is woven permanently into the stars, watching over every birthday and anniversary to come.`,
    choices: [
      { text: "💌 Read {husband}'s Birthday Letter", tag: "LOVE NOTE", action: "open_card", next: "ending_starlight_node" },
      { text: "⚡ Return to the Chrono-Dial Hub to explore more paths", tag: "REPLAY HUB", next: "chrono_hub" }
    ]
  },

  ending_cat_empress_node: {
    title: "ENDING 3: Empress Rebecca of the Feline Realm!",
    era: "DIMENSION CAT-99 // ROYAL REIGN",
    yearTag: "ENDING 3/7",
    location: "THRONE ROOM OF PASTA-LOT",
    theme: "theme-multiverse",
    sceneType: "cat_kingdom",
    caption: "All hail Empress Rebecca, Consort Lucas, and the Royal Feline Court!",
    coffee: 100,
    love: 100,
    isEnding: true,
    endingId: "ending_cat_empress",
    sfx: "birthday",
    text: `👑 **ENDING 3 UNLOCKED: EMPRESS OF THE FELINE REALM!** 👑

You accept the jeweled Crown of Cats-Alot alongside **{husband}**! Your first royal decrees are legendary:
1. Unlimited bottomless **{drink}** fountains in every courtyard.
2. Daily royal banquets of fresh **{food}** (with a dedicated tribute bowl for **Lord Jinny** so he never screams at 4 AM again).
3. Mandatory afternoon royal lap-naps with **Duke Joonie** (complete with a royal cleaning attendant - he dirty).
4. A kingdom-wide high-speed railway operated exclusively by **Sir Thomas the Tank Engine ("CHOO CHOO!")**!`,
    choices: [
      { text: "💌 Read {husband}'s Birthday Letter", tag: "LOVE NOTE", action: "open_card", next: "ending_cat_empress_node" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "REPLAY HUB", next: "chrono_hub" }
    ]
  },

  ending_seoul_node: {
    title: "ENDING 4: Seoul Coffee, Pasta & Cat Cafe Moguls!",
    era: "2023-ALT // SEOUL DREAM LIFE",
    yearTag: "ENDING 4/7",
    location: "HONGDAE, SOUTH KOREA",
    theme: "theme-2023",
    sceneType: "seoul_2023",
    photoKey: "korea",
    caption: "Your Seoul cafe has a 5-star Michelin rating and a 3-block line out the door!",
    coffee: 100,
    love: 100,
    isEnding: true,
    endingId: "ending_seoul_cafe",
    sfx: "birthday",
    text: `🇰🇷 **ENDING 4 UNLOCKED: SEOUL COFFEE & PASTA MOGULS!** 🇰🇷

Inspired by your 2023 trip to **South Korea**, you and **{husband}** open Seoul's hottest spot: **"Café Chooch"**!

You serve world-class pour-over **{drink}**.. **Jinny** is the Chief Quality Control Officer (sampling every cup), **Joonie** greets guests from a velvet cushion with his cute meow, and **Tommy** zooms between tables delivering espresso shots like a bullet train!`,
    choices: [
      { text: "💌 Read {husband}'s Birthday Letter", tag: "LOVE NOTE", action: "open_card", next: "ending_seoul_node" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "REPLAY HUB", next: "chrono_hub" }
    ]
  },
  ending_cancun_node: {
    title: "ENDING 5: The Endless Cancun Sunset Time-Loop!",
    era: "2026 // INFINITE PARADISE",
    yearTag: "ENDING 5/7",
    location: "CANCUN CARIBBEAN SHORE",
    theme: "theme-2026",
    sceneType: "cancun_beach",
    photoKey: "cancun",
    caption: "78 degrees, ocean breeze, and zero alarm clocks forever!",
    coffee: 100,
    love: 100,
    isEnding: true,
    endingId: "ending_cancun_forever",
    sfx: "birthday",
    text: `🏝️ **ENDING 5 UNLOCKED: ENDLESS CANCUN SUNSET LOOP!** 🏝️

Why leave paradise? You press the **LOCK TIMELINE** button right in the middle of your **2026 5-Year Anniversary in Cancun**!

Now every day is a permanent golden-hour beach day with **{husband}**—complete with turquoise waves, and VIP cabanas where Jinny, Joonie, and Tommy lounge in tiny sunglasses.`,
    choices: [
      { text: "💌 Read {husband}'s Birthday Letter", tag: "LOVE NOTE", action: "open_card", next: "ending_cancun_node" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "REPLAY HUB", next: "chrono_hub" }
    ]
  },

  ending_choo_choo_node: {
    title: "ENDING 6: Aboard the Intergalactic Choo-Choo Express!",
    era: "YEAR 3026 // GALACTIC RAILS",
    yearTag: "ENDING 6/7",
    location: "STARSHIP THOMAS THE TANK ENGINE",
    theme: "theme-2024",
    sceneType: "tommy_train",
    photoKey: "tommy_portrait",
    caption: "CHOO CHOO! Tommy's zoomies break the light-speed barrier across the Milky Way!",
    coffee: 100,
    love: 100,
    isEnding: true,
    endingId: "ending_choo_choo_galaxy",
    sfx: "choochoo",
    text: `🚂 **ENDING 6 UNLOCKED: THE INTERGALACTIC CHOO-CHOO EXPRESS!** 🚂

You blow the **Golden Choo-Choo Whistle** and **Tommy**—in full *Thomas the Tank Engine* mode—accelerates past Mach-2, launching a glowing retro train straight into the cosmos!

You, **{husband}**, **Jinny**, and **Joonie** ride in the luxury dining car sipping zero-gravity **{drink}** and eating starlight **{food}** while Tommy happily shouts *"CHOO CHOO!"* across the galaxy!`,
    choices: [
      { text: "💌 Read {husband}'s Birthday Letter", tag: "LOVE NOTE", action: "open_card", next: "ending_choo_choo_node" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "REPLAY HUB", next: "chrono_hub" }
    ]
  },

  ending_2076_node: {
    title: "ENDING 7: Year 2076 — Fifty Years of Coffee, Pasta & Love",
    era: "2076 // 55-YEAR ANNIVERSARY",
    yearTag: "ENDING 7/7",
    location: "FUTURE PORCH SWING",
    theme: "theme-birthday",
    sceneType: "future_2076",
    caption: "Fifty years in the future, and you two are still each other's favorite adventure.",
    coffee: 100,
    love: 100,
    isEnding: true,
    endingId: "ending_2076_golden",
    sfx: "birthday",
    text: `⏳ **ENDING 7 UNLOCKED: 2076 — FIFTY YEARS OF COFFEE & LOVE!** ⏳

You turn the Chrono-Dial fifty years into the future to **2076**. On a sunlit wraparound porch overlooking the water sit future **{wife}** and **{husband}**, clinking mugs of morning **{drink}**.

Framed holo-photos line the wall: **2021 Kitty Hawk**, **2023 South Korea**, **2026 Cancun**, and portraits of **Jinny**, **Joonie**, **Billie**, and **Tommy ("Choo Choo!")** and all the other kitties you welcomed into your life. Even fifty years later, {husband} is still making you laugh at the exact same inside jokes. ❤️`,
    choices: [
      { text: "💌 Read {husband}'s Birthday Letter", tag: "LOVE NOTE", action: "open_card", next: "ending_2076_node" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "REPLAY HUB", next: "chrono_hub" }
    ]
  },

  ending_disney_node: {
    title: "ENDING 8: Royal VIPs of Cinderella Castle!",
    era: "2025 // MAGIC KINGDOM ROYALTY",
    yearTag: "ENDING 8/8",
    location: "CINDERELLA CASTLE DREAM SUITE",
    theme: "theme-2025",
    sceneType: "disney_castle",
    photoKey: "disney",
    caption: "You unlocked the secret Cinderella Castle Dream Suite with nightly fireworks!",
    coffee: 100,
    love: 100,
    isEnding: true,
    endingId: "ending_disney_magic",
    sfx: "birthday",
    text: `🏰 **ENDING 8 UNLOCKED: ROYAL VIPS OF CINDERELLA CASTLE!** 🏰

Using your **2025 Magic Kingdom Castle Pin**, a hidden golden elevator whisks you and **{husband}** straight up into the legendary **Cinderella Castle Dream Suite**!

You are officially crowned Forever VIPs of Disney World:
• Unlimited walk-on access to every ride in every park.
• Private Main Street **{drink}** & Italian Pavilion **{food}** room service delivered to your castle balcony.
• **Jinny** is appointed Royal Taste-Tester of all Disney snacks, **Joonie** gets a velvet royal pillow in the castle window, and **Tommy ("Choo Choo!")** is named Grand Marshal of the Walt Disney World Railroad!`,
    choices: [
      { text: "💌 Read {husband}'s Birthday Letter", tag: "LOVE NOTE", action: "open_card", next: "ending_disney_node" },
      { text: "⚡ Return to the Chrono-Dial Hub", tag: "REPLAY HUB", next: "chrono_hub" }
    ]
  }
};
