// ============================================================
// Firebase Configuration
// ============================================================
// INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project (or use an existing one)
// 3. Go to Project Settings > General > Your Apps > Web App
// 4. Register a new web app and copy the config object below
// 5. Replace the placeholder values with your actual Firebase config
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyAJfnkX0Dd2IYTiMa6MBxX-hXFegonlkC0",
  authDomain: "singing-competition-41788.firebaseapp.com",
  projectId: "singing-competition-41788",
  storageBucket: "singing-competition-41788.firebasestorage.app",
  messagingSenderId: "722997098726",
  appId: "1:722997098726:web:243a59e57bb4e3d1836327",
  measurementId: "G-XRCZ0836FG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// ============================================================
// Helper: Check if Firebase is configured
// ============================================================
function isFirebaseConfigured() {
  return firebaseConfig.apiKey !== "YOUR_API_KEY" && firebaseConfig.projectId !== "YOUR_PROJECT_ID";
}

// ============================================================
// Firestore Helpers
// ============================================================
const FieldValue = firebase.firestore.FieldValue;
const Timestamp = firebase.firestore.Timestamp;

// Collection references
const eventsRef = db.collection('events');
const settingsRef = db.collection('settings').doc('competition');
const contestantsRef = db.collection('contestants');
const judgesRef = db.collection('judges');
const judgeScoresRef = db.collection('judgeScores');
const audienceVotesRef = db.collection('audienceVotes');
const resultsRef = db.collection('results');
const usersRef = db.collection('users');
const registrationsRef = db.collection('registrations');
const competitionsHistoryRef = db.collection('competitionsHistory');

// ============================================================
// University & Department Metadata
// ============================================================
const DEPARTMENT_INFO = {
  university: "Mandsaur University",
  department: "Department of Computer Science and Applications",
  shortName: "CSA — Mandsaur University",
  portalTitle: "CSA Events & Competitions Portal",
  campusLocation: "SH-31, Mhow-Neemuch Bypass Road, Mandsaur (M.P.) - 458001",
  accreditations: ["IQAC Approved", "Institution's Innovation Council (IIC)"],
  contactEmail: "csa.events@meu.edu.in",
  contactPhone: "+91 98260 12345",
  logos: {
    universityLogo: "assets/logos/university-logo.png",
    whiteLogo: "assets/logos/mu-logo-white.png",
    taglineLogo: "assets/logos/mu-logo-tagline.png",
    iqac: "assets/logos/iqac-emblem.png",
    iic: "assets/logos/iic-logo.png",
    building: "assets/logos/mu-building.jpg",
    crest: "assets/logos/mu-logo-crest.jpg"
  }
};

// ============================================================
// Department Competitions & Events Baseline Data
// (Instantly available in 0ms to eliminate visual loading glitch)
// ============================================================
const PRESEEDED_EVENTS = [
  {
    id: "poster-making-competition",
    title: "Poster Making Competition",
    nature: "COMPETITION",
    category: "General",
    categoryBadge: "🏆 General & Creative",
    shortTagline: "Think Secure. Save Energy. Design a Better Tomorrow",
    description: "Official Poster Making Competition organized by the Department of Computer Science & Applications. Open for student innovators and artists to express ideas on cybersecurity, energy conservation, and sustainable tech.",
    date: "2026-10-15",
    displayDate: "15-10-2026",
    time: "01:30 PM – 02:30 PM",
    venue: "LT-04, Mandsaur University",
    eligibility: "Students Only",
    evaluationMode: "JUDGES_ONLY",
    type: "Solo",
    minTeamSize: 1,
    maxTeamSize: 1,
    posterUrl: "assets/posters/poster-making-competition.png",
    status: "REGISTRATION_OPEN",
    rules: [
      "Rule 1: Bring valid Student College ID.",
      "Rule 2: Drawing sheets/charts will be provided; bring your own colors and pencils.",
      "Rule 3: Time limit is strictly 60 minutes.",
      "Rule 4: Decision of faculty jury will be final."
    ],
    coordinators: [
      { name: "Faculty Coordinator", role: "Faculty Coordinator", type: "faculty", phone: "+91 98260 12345", designation: "Faculty, CSA", whatsapp: "9826012345" }
    ],
    formFields: [
      { id: "q_name", label: "Full Name", type: "text", required: true, placeholder: "Enter your full name", options: "" },
      { id: "q_scholar", label: "Scholar / Roll Number", type: "text", required: true, placeholder: "e.g. 21BCA042 / 23MCA015", options: "" },
      { id: "q_dept", label: "Program & Semester / Year", type: "text", required: true, placeholder: "e.g. BCA 3rd Year / MCA 1st Year", options: "" },
      { id: "q_phone", label: "WhatsApp Mobile Number", type: "tel", required: true, placeholder: "e.g. 9826012345", options: "" },
      { id: "q_email", label: "Email Address", type: "email", required: true, placeholder: "e.g. student@meu.edu.in", options: "" },
      { id: "q_theme", label: "Selected Theme", type: "select", required: true, placeholder: "Choose theme...", options: "Cyber Security Awareness, World Energy Saving Day, Smart Campus & Innovation, Open Theme / Student Choice" },
      { id: "q_medium", label: "Medium / Artwork Tools", type: "select", required: true, placeholder: "Choose medium...", options: "Physical Chart / Poster (Handmade Drawing / Painting), Mixed Media / Sketching" },
      { id: "q_tools", label: "Materials / Colors Used", type: "text", required: false, placeholder: "e.g. Water colors, sketch pens, acrylic", options: "" }
    ]
  },
  {
    id: "nukkad-natak-2026",
    title: "Nukkad Natak — Cyber Security & Social Awareness",
    nature: "SHOWCASE",
    category: "Cultural & Awareness",
    categoryBadge: "🎭 Street Play & Awareness",
    shortTagline: "Street Play & Mass Public Awareness",
    description: "High-impact street play performance raising consciousness on cyber security hygiene, online fraud prevention, and responsible digital citizenship on campus.",
    date: "2026-10-20",
    displayDate: "20-10-2026",
    time: "11:00 AM – 01:00 PM",
    venue: "Central Courtyard / Campus Amphitheater, Mandsaur University",
    eligibility: "Both Students & Faculty",
    evaluationMode: "SHOWCASE_ONLY",
    type: "Team",
    minTeamSize: 4,
    maxTeamSize: 12,
    posterUrl: "assets/posters/nukkad-natak-cybersecurity.jpg",
    status: "REGISTRATION_OPEN",
    rules: [
      "Rule 1: Performance time duration: 10 – 15 minutes.",
      "Rule 2: Props like dholak, dafli, banners, and dupattas are permitted.",
      "Rule 3: Decorum, academic discipline, and ethical language must be maintained."
    ],
    coordinators: [
      { name: "Faculty Coordinator", role: "Faculty Coordinator", type: "faculty", phone: "+91 98260 12345", designation: "Faculty, CSA", whatsapp: "9826012345" }
    ],
    formFields: [
      { id: "q_team_name", label: "Troupe / Squad Name", type: "text", required: true, placeholder: "e.g. Cyber Jagrukta Natak Dal", options: "" },
      { id: "q_lead_name", label: "Lead Coordinator / Director Name", type: "text", required: true, placeholder: "Full Name", options: "" },
      { id: "q_category", label: "Troupe Category", type: "select", required: true, placeholder: "Select category...", options: "Student Troupe (UG/PG), Faculty & Staff Team, Combined Student-Faculty Troupe" },
      { id: "q_scholar", label: "Lead Scholar No / Employee ID", type: "text", required: true, placeholder: "e.g. 21BCA050 / EMP-CSA-102", options: "" },
      { id: "q_dept", label: "Department / Program", type: "text", required: true, placeholder: "e.g. Computer Science & Applications", options: "" },
      { id: "q_phone", label: "Lead WhatsApp Mobile Number", type: "tel", required: true, placeholder: "e.g. 9826012345", options: "" },
      { id: "q_email", label: "Email Address", type: "email", required: true, placeholder: "e.g. leader@meu.edu.in", options: "" },
      { id: "q_members", label: "Actors & Troupe Members (Names & IDs)", type: "textarea", required: true, placeholder: "List all performers with their scholar numbers...", options: "" },
      { id: "q_props", label: "Props & Instruments Used", type: "text", required: false, placeholder: "e.g. Dholak, Daffli, Megaphone, Placards", options: "" }
    ]
  },
  {
    id: "csa-tech-summit-keynote-2026",
    title: "CSA Department Tech Summit & Keynote Session",
    nature: "INVITATION",
    category: "Technical",
    categoryBadge: "🎟️ Open Invitation & Keynote",
    shortTagline: "Grand Department Keynote & Project Showcase • Open RSVP for Audience & Guests",
    description: "Join us for the grand keynote session and technical exhibition of CSA Department Events 2026. Featuring guest speakers on AI breakthroughs, live tech project demos, and awards. No stage performance required—all students, faculty members, and guests are cordially invited to attend as our audience.",
    date: "2026-10-14",
    displayDate: "14-10-2026",
    time: "10:00 AM – 11:30 AM",
    venue: "Main University Auditorium, Mandsaur University",
    eligibility: "Both Students & Faculty",
    evaluationMode: "SHOWCASE_ONLY",
    type: "Solo",
    minTeamSize: 1,
    maxTeamSize: 1,
    posterUrl: "",
    status: "REGISTRATION_OPEN",
    rules: [
      "Rule 1: Open for all university students, faculty members, and invited dignitaries.",
      "Rule 2: Please take your seats 10 minutes prior to session commencement.",
      "Rule 3: Show your digital RSVP Entry Pass at the auditorium entrance."
    ],
    coordinators: [
      { name: "Faculty Convener", role: "Faculty Coordinator", type: "faculty", phone: "+91 98260 12345", designation: "Faculty, CSA", whatsapp: "9826012345" }
    ],
    formFields: [
      { id: "q_name", label: "Guest / Attendee Full Name", type: "text", required: true, placeholder: "Enter your full name", options: "" },
      { id: "q_role", label: "Attendee Designation / Category", type: "select", required: true, placeholder: "Select role...", options: "Student (Audience & Enthusiast), Faculty / Staff Member, University Dignitary / Head, Invited Guest / Alumni" },
      { id: "q_dept", label: "Department / Program / Organization", type: "text", required: true, placeholder: "e.g. Dept of CSA / BCA 2nd Year", options: "" },
      { id: "q_phone", label: "WhatsApp Mobile Number", type: "tel", required: true, placeholder: "For receiving digital entry pass", options: "" },
      { id: "q_email", label: "Email Address", type: "email", required: true, placeholder: "For calendar invite", options: "" },
      { id: "q_rsvp", label: "RSVP Attendance Confirmation", type: "select", required: true, placeholder: "Confirm attendance...", options: "Yes, I will definitely attend in person!, Tentative (Subject to lecture schedule), Attending with fellow classmates/colleagues" },
      { id: "q_guests", label: "Number of Seats Needed", type: "number", required: true, placeholder: "1", options: "" },
      { id: "q_notes", label: "Queries / Special Seating Note", type: "textarea", required: false, placeholder: "Any accessibility request or note for the host department...", options: "" }
    ]
  }
];

// ============================================================
// Multi-Event Helper Functions
// ============================================================

const CSA_EVENTS_CACHE_VERSION = 'v2026_csa_04';

// Synchronously read cached events to eliminate ANY visual flash / glitch
function getCachedEventsSync() {
  try {
    const currentVer = localStorage.getItem('csa_cache_ver');
    if (currentVer !== CSA_EVENTS_CACHE_VERSION) {
      // Clean up any stale/deleted event caches from previous app versions
      localStorage.removeItem('csa_cached_events');
      localStorage.removeItem('dcsa_cached_events');
      localStorage.removeItem('selected_event_id');
      localStorage.setItem('csa_cache_ver', CSA_EVENTS_CACHE_VERSION);
      localStorage.setItem('csa_cached_events', JSON.stringify(PRESEEDED_EVENTS));
      return PRESEEDED_EVENTS;
    }

    const raw = localStorage.getItem('csa_cached_events');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return PRESEEDED_EVENTS;
}

// Get all active events from Firestore with instant local caching
async function fetchAllEvents() {
  const cached = getCachedEventsSync();
  try {
    const snapshot = await eventsRef.get();
    if (!snapshot.empty) {
      const events = [];
      snapshot.forEach(doc => {
        events.push({ id: doc.id, ...doc.data() });
      });
      try {
        localStorage.setItem('csa_cache_ver', CSA_EVENTS_CACHE_VERSION);
        localStorage.setItem('csa_cached_events', JSON.stringify(events));
      } catch (e) {}
      return events;
    } else {
      // If Firestore is empty, seed with PRESEEDED_EVENTS
      try {
        localStorage.setItem('csa_cache_ver', CSA_EVENTS_CACHE_VERSION);
        localStorage.setItem('csa_cached_events', JSON.stringify(PRESEEDED_EVENTS));
      } catch (e) {}
      return PRESEEDED_EVENTS;
    }
  } catch (err) {
    console.warn('Events fetch error:', err);
    if (cached.length > 0) return cached;
    return PRESEEDED_EVENTS;
  }
}

// Get single event by ID
async function fetchEventById(eventId) {
  if (!eventId) return null;
  try {
    const doc = await eventsRef.doc(eventId).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    }
  } catch (err) {
    console.warn(`Error fetching event ${eventId}:`, err);
  }
  return null;
}

// Extract eventId from URL query (?event=xyz) or fallback
function getEventIdFromUrl(allowStoredFallback = false) {
  const urlParams = new URLSearchParams(window.location.search);
  const paramEvent = urlParams.get('event') || urlParams.get('eventId');
  if (paramEvent) return paramEvent;
  if (allowStoredFallback) {
    return localStorage.getItem('selected_event_id') || null;
  }
  return null;
}

// Set active event in localStorage
function setActiveEventId(eventId) {
  localStorage.setItem('selected_event_id', eventId);
}

// ============================================================
// Competition States
// ============================================================
const CompetitionState = {
  SETUP: 'SETUP',
  JUDGING_OPEN: 'JUDGING_OPEN',
  JUDGING_CLOSED: 'JUDGING_CLOSED',
  VOTING_OPEN: 'VOTING_OPEN',
  VOTING_CLOSED: 'VOTING_CLOSED',
  RESULTS_CALCULATED: 'RESULTS_CALCULATED',
  RESULTS_REVEAL: 'RESULTS_REVEAL',
  COMPLETE: 'COMPLETE'
};

// Default scoring criteria
const DEFAULT_CRITERIA = [
  { name: "Pitch / Sur Accuracy", maxScore: 25 },
  { name: "Rhythm / Taal", maxScore: 20 },
  { name: "Voice Quality", maxScore: 20 },
  { name: "Expression & Emotion", maxScore: 15 },
  { name: "Song Difficulty", maxScore: 10 },
  { name: "Stage Presence", maxScore: 10 }
];

// Default competition settings
const DEFAULT_SETTINGS = {
  competitionName: "Department of Computer Science & Applications Competitions",
  competitionEdition: "CSA Department Events & Competitions 2026",
  competitionDate: "2026-10-25",
  state: CompetitionState.SETUP,
  registrationOpen: true,
  registrationDeadline: "2026-10-28T23:59",
  currentPerformance: 0,
  currentContestantId: '',
  votingStartTime: null,
  votingEndTime: null,
  votingDurationMinutes: 5,
  judgeWeight: 80,
  audienceWeight: 20,
  allowScoreEditing: true,
  scoresLocked: false,
  testMode: false,
  revealPosition: 0,
  totalVotes: 0,
  authMethod: 'google',
  scoringCriteria: DEFAULT_CRITERIA
};

// ============================================================
// Global Helper: Safe HTML Escaping
// ============================================================
if (typeof window.escapeHtml !== 'function') {
  window.escapeHtml = function(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };
}

// ============================================================
// Global Helper: Robust Dropdown Options Parser
// Supports newline-separated, comma-separated, semicolon-separated,
// array-based inputs, and auto-heals theme questions.
// ============================================================
function parseDropdownOptions(raw, fieldLabel = '') {
  if (!raw && raw !== 0) {
    // If field is theme question and empty, default to both themes
    if (fieldLabel && fieldLabel.toLowerCase().includes('theme')) {
      return ['Cyber Security Awareness', 'World Energy Saving Day'];
    }
    return [];
  }

  let items = [];
  if (Array.isArray(raw)) {
    raw.forEach(item => {
      if (typeof item === 'string') {
        if (item.includes('\n') || item.includes('\r')) {
          items.push(...item.split(/[\r\n]+/));
        } else if (item.includes(';') && !item.includes('&')) {
          items.push(...item.split(';'));
        } else if (item.includes(',')) {
          items.push(...item.split(','));
        } else {
          items.push(item);
        }
      } else if (item !== null && item !== undefined) {
        items.push(String(item));
      }
    });
  } else if (typeof raw === 'string') {
    // Check if separated by newlines first
    if (raw.includes('\n') || raw.includes('\r')) {
      items = raw.split(/[\r\n]+/);
    } else if (raw.includes(';') && !raw.includes('&')) {
      items = raw.split(';');
    } else {
      items = raw.split(',');
    }
  } else {
    items = [String(raw)];
  }

  // Trim, strip leading bullets or numbering (e.g. "1.", "-", "•"), filter empty
  let result = items
    .map(s => String(s || '').trim())
    .map(s => s.replace(/^[•\-\*\d\.\)\s]+/, '').trim())
    .filter(Boolean);

  // If a single combined item was returned that still has newlines or commas
  if (result.length === 1 && (result[0].includes('\n') || result[0].includes(','))) {
    result = result[0].split(/[\r\n,]+/).map(s => s.trim()).filter(Boolean);
  }

  // Deduplicate while preserving order
  result = [...new Set(result)];

  // Theme auto-heal heuristic:
  // If the question is about "theme" (like Selected Theme) and only contains
  // "World Energy Saving Day" or "Cyber Security Awareness", ensure BOTH are available.
  const isTheme = (fieldLabel || '').toLowerCase().includes('theme');
  if (isTheme) {
    const hasCyber = result.some(r => r.toLowerCase().includes('cyber'));
    const hasEnergy = result.some(r => r.toLowerCase().includes('energy'));
    if (!hasCyber && hasEnergy) {
      result.unshift('Cyber Security Awareness');
    } else if (hasCyber && !hasEnergy) {
      result.push('World Energy Saving Day');
    }
  }

  return result;
}

window.parseDropdownOptions = parseDropdownOptions;
if (typeof module !== 'undefined' && module.exports) {
  module.exports.parseDropdownOptions = parseDropdownOptions;
}

