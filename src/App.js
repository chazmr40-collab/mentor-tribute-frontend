import React, { useEffect, useMemo, useRef, useState } from "react";


export default function App() {
  // -----------------------------
  // Mentor Tribute (demo)
  // -----------------------------
  const [letterAuthor, setLetterAuthor] = useState("");
  const letterDate = useMemo(() => new Date().toLocaleDateString(), []);
  const [mentors, setMentors] = useState([
    { label: "Mentor #1", firstName: "", lastName: "", role: "", note: "" },
    { label: "Mentor #2", firstName: "", lastName: "", role: "", note: "" },
    { label: "Mentor #3", firstName: "", lastName: "", role: "", note: "" },
  ]);

  const wisdomQuotes = useMemo(
    () => [
      "A good mentor doesn't create followers — they create builders.",
      "Skill is taught. Character is caught.",
      "The best lessons are the ones that make you braver.",
      "We honor mentors by becoming mentors.",
    ],
    []
  );

  const saveMentorsLocal = () => {
    try {
      const payload = { letterAuthor, mentors };
      localStorage.setItem("mentor_tribute_demo", JSON.stringify(payload));
      alert("Saved (demo) to this browser.");
    } catch (e) {
      alert("Save failed (demo).");
    }
  };

  const loadMentorsLocal = () => {
    try {
      const raw = localStorage.getItem("mentor_tribute_demo");
      if (!raw) return alert("Nothing saved yet (demo).");
      const payload = JSON.parse(raw);
      setLetterAuthor(payload.letterAuthor || "");
      setMentors(payload.mentors || mentors);
      alert("Loaded (demo).");
    } catch (e) {
      alert("Load failed (demo).");
    }
  };

  // -----------------------------
  // Scheduler (Wizard)
  // -----------------------------
  const [schedulerStep, setSchedulerStep] = useState(1);
  const [schedLastSaved, setSchedLastSaved] = useState("");
  // Demo mode (privacy): block real names
const [demoOnly, setDemoOnly] = useState(true);

// Used to auto-scroll the scheduler to top when switching steps
const schedulerTopRef = useRef(null);
// Used to auto-focus the first input in Step 2
const step2FirstFieldRef = useRef(null)
useEffect(() => {
  if (!schedulerTopRef.current) return;

  // Scroll scheduler header into view
  schedulerTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  // If Step 2, focus the first field after the scroll/layout settles
  if (schedulerStep === 2) {
    const t = setTimeout(() => {
      step2FirstFieldRef.current?.focus();
    }, 150);

    return () => clearTimeout(t);
  }
}, [schedulerStep]);


useEffect(() => {
  try {
    const raw = localStorage.getItem(SCHED_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    setSchedLastSaved(parsed?.savedAt || "");
  } catch {
    // ignore
  }
}, []);

  // Step 1 — Patient & Safety
  const [schedCallbackName, setSchedCallbackName] = useState("");
  const [schedCallbackPhone, setSchedCallbackPhone] = useState("");
  const [schedOrderingProvider, setSchedOrderingProvider] = useState("");

  const [schedPatientName, setSchedPatientName] = useState("");
// Used to auto-scroll the scheduler to top when switching steps

  // Demo mode rule: patient name must start with DEMO or TEST

  const [schedDob, setSchedDob] = useState("");
  const [schedMrn, setSchedMrn] = useState("");
  const [schedSex, setSchedSex] = useState("Unknown");
 
  const demoNameOk = useMemo(() => {
  if (!demoOnly) return true;
  return /^(demo|test)\b/i.test((schedPatientName || "").trim());
  }, [demoOnly, schedPatientName]);

  const [schedHeight, setSchedHeight] = useState("");
  const [schedWeight, setSchedWeight] = useState("");

  const [schedAllergies, setSchedAllergies] = useState("");
  const [schedPregnant, setSchedPregnant] = useState("No");
  const [schedSedation, setSchedSedation] = useState("No");
  const [schedClaustro, setSchedClaustro] = useState("No");

  const [schedMobility, setSchedMobility] = useState("Ambulatory");
  const [schedInterpreter, setSchedInterpreter] = useState("No");
  const [schedLocationPref, setSchedLocationPref] = useState("");

  const [schedContrastPlanned, setSchedContrastPlanned] = useState("Unknown");
  const [schedCreatinineKnown, setSchedCreatinineKnown] = useState("Unknown");
  const [schedEgfr, setSchedEgfr] = useState("");
  const [schedDiabeticMeds, setSchedDiabeticMeds] = useState("Unknown");

  const [schedMetalRisk, setSchedMetalRisk] = useState("Unknown");
  const [schedImplantType, setSchedImplantType] = useState("");
  const [schedImplantMakeModel, setSchedImplantMakeModel] = useState("");
  const [schedImplantCard, setSchedImplantCard] = useState("Unknown");

  // Step 2 — Exam & Diagnosis
  const [schedModality, setSchedModality] = useState("MRI");
  const [schedRegion, setSchedRegion] = useState("");
  const [selectedSchedulerExam, setSelectedSchedulerExam] = useState("");
  const [schedExamText, setSchedExamText] = useState("");
  const [schedCpt, setSchedCpt] = useState("");
  const [schedIcd, setSchedIcd] = useState("");
  const [schedIndication, setSchedIndication] = useState("");

  // Step 3 — RIS Strip fields
  const [schedPriority, setSchedPriority] = useState("Routine");
  const [schedStatus, setSchedStatus] = useState("Ready to Schedule");

  const resetScheduler = () => {
    setSchedulerStep(1);

    setSchedCallbackName("");
    setSchedCallbackPhone("");
    setSchedOrderingProvider("");

    setSchedPatientName("");
    setSchedDob("");
    setSchedMrn("");
    setSchedSex("Unknown");
    setSchedHeight("");
    setSchedWeight("");

    setSchedAllergies("");
    setSchedPregnant("No");
    setSchedSedation("No");
    setSchedClaustro("No");

    setSchedMobility("Ambulatory");
    setSchedInterpreter("No");
    setSchedLocationPref("");

    setSchedContrastPlanned("Unknown");
    setSchedCreatinineKnown("Unknown");
    setSchedEgfr("");
    setSchedDiabeticMeds("Unknown");

    setSchedMetalRisk("Unknown");
    setSchedImplantType("");
    setSchedImplantMakeModel("");
    setSchedImplantCard("Unknown");

    setSchedModality("MRI");
    setSchedRegion("");
    setSelectedSchedulerExam("");
    setSchedExamText("");
    setSchedCpt("");
    setSchedIcd("");
    setSchedIndication("");

    setSchedPriority("Routine");
    setSchedStatus("Ready to Schedule");
  };
// -----------------------------
// =============================
// Scheduler Save/Load (bulletproof)
// =============================
const SCHED_STORAGE_KEY = "mentorLegacy.scheduler.v1";

const DEFAULT_SCHED = {
  // Step 3 strip
  schedPriority: "Routine",
  schedStatus: "Ready to Schedule",

  // Step 1 identifiers / logistics
  schedCallbackName: "",
  schedCallbackPhone: "",
  schedOrderingProvider: "",
  schedPatientName: "",
  schedDob: "",
  schedMrn: "",
  schedSex: "Unknown",
  schedHeight: "",
  schedWeight: "",
  schedAllergies: "",
  schedPregnant: "Unknown",
  schedSedation: "Unknown",
  schedClaustro: "Unknown",
  schedMobility: "Ambulatory",
  schedInterpreter: "No",
  schedLocationPref: "",

  // Contrast/kidney
  schedContrastPlanned: "Unknown",
  schedCreatinineKnown: "Unknown",
  schedEgfr: "",
  schedDiabeticMeds: "Unknown",

  // MRI implants/metal
  schedMetalRisk: "Unknown",
  schedImplantType: "",
  schedImplantMakeModel: "",
  schedImplantCard: "Unknown",

  // Step 2 exam
  schedModality: "MRI",
  schedRegion: "",
  selectedSchedulerExam: "",
  schedExamText: "",
  schedCpt: "",
  schedIcd: "",
  schedIndication: "",
};

const oneOf = (val, allowed, fallback) => (allowed.includes(val) ? val : fallback);
const asText = (val) => (typeof val === "string" ? val : val == null ? "" : String(val));

function sanitizeScheduler(input) {
  const raw = (input && typeof input === "object") ? input : {};

  // Support both formats:
  // 1) { v, savedAt, data: {...} }
  // 2) legacy: { ...fields... }
  const data = (raw.data && typeof raw.data === "object") ? raw.data : raw;

  const cleaned = { ...DEFAULT_SCHED };

  // Text-ish fields (safe cast to string)
  const textFields = [
    "schedCallbackName","schedCallbackPhone","schedOrderingProvider",
    "schedPatientName","schedDob","schedMrn","schedHeight","schedWeight",
    "schedAllergies","schedLocationPref","schedEgfr","schedImplantType",
    "schedImplantMakeModel","schedExamText","schedCpt","schedIcd","schedIndication",
    "schedStatus"
  ];
  textFields.forEach((k) => { cleaned[k] = asText(data[k]); });

  // Controlled selects (force allowed values)
  cleaned.schedPriority = oneOf(data.schedPriority, ["Routine","Urgent","STAT"], DEFAULT_SCHED.schedPriority);
  cleaned.schedSex = oneOf(data.schedSex, ["Unknown","Male","Female","X"], DEFAULT_SCHED.schedSex);

  cleaned.schedPregnant = oneOf(data.schedPregnant, ["No","Yes","Unknown","N/A"], DEFAULT_SCHED.schedPregnant);
  cleaned.schedSedation = oneOf(data.schedSedation, ["No","Yes","Unknown"], DEFAULT_SCHED.schedSedation);
  cleaned.schedClaustro = oneOf(data.schedClaustro, ["No","Yes","Unknown"], DEFAULT_SCHED.schedClaustro);

  cleaned.schedMobility = oneOf(
    data.schedMobility,
    ["Ambulatory","Wheelchair","Stretcher","Needs assist"],
    DEFAULT_SCHED.schedMobility
  );
  cleaned.schedInterpreter = oneOf(data.schedInterpreter, ["No","Yes"], DEFAULT_SCHED.schedInterpreter);

  cleaned.schedContrastPlanned = oneOf(data.schedContrastPlanned, ["Unknown","No","Yes"], DEFAULT_SCHED.schedContrastPlanned);
  cleaned.schedCreatinineKnown = oneOf(data.schedCreatinineKnown, ["Unknown","No","Yes"], DEFAULT_SCHED.schedCreatinineKnown);
  cleaned.schedDiabeticMeds = oneOf(data.schedDiabeticMeds, ["No","Yes","Unknown"], DEFAULT_SCHED.schedDiabeticMeds);

  cleaned.schedMetalRisk = oneOf(data.schedMetalRisk, ["Unknown","No","Yes"], DEFAULT_SCHED.schedMetalRisk);
  cleaned.schedImplantCard = oneOf(data.schedImplantCard, ["Unknown","No","Yes"], DEFAULT_SCHED.schedImplantCard);

  cleaned.schedModality = oneOf(data.schedModality, ["MRI","CT","XRAY","US"], DEFAULT_SCHED.schedModality);
  cleaned.schedRegion = oneOf(data.schedRegion, ["","Brain","Spine","MSK","AbdomenPelvis","Vascular"], DEFAULT_SCHED.schedRegion);

  // Selected suggestion is fine as text
  cleaned.selectedSchedulerExam = asText(data.selectedSchedulerExam);

  return cleaned;
}

function getSchedulerSnapshot() {
  return {
    schedPriority,
    schedStatus,

    schedCallbackName,
    schedCallbackPhone,
    schedOrderingProvider,
    schedPatientName,
    schedDob,
    schedMrn,
    schedSex,
    schedHeight,
    schedWeight,
    schedAllergies,
    schedPregnant,
    schedSedation,
    schedClaustro,
    schedMobility,
    schedInterpreter,
    schedLocationPref,

    schedContrastPlanned,
    schedCreatinineKnown,
    schedEgfr,
    schedDiabeticMeds,

    schedMetalRisk,
    schedImplantType,
    schedImplantMakeModel,
    schedImplantCard,

    schedModality,
    schedRegion,
    selectedSchedulerExam,
    schedExamText,
    schedCpt,
    schedIcd,
    schedIndication,
  };
}

function applySchedulerSnapshot(cleaned) {
  // Step 3
  setSchedPriority(cleaned.schedPriority);
  setSchedStatus(cleaned.schedStatus);

  // Step 1
  setSchedCallbackName(cleaned.schedCallbackName);
  setSchedCallbackPhone(cleaned.schedCallbackPhone);
  setSchedOrderingProvider(cleaned.schedOrderingProvider);
  setSchedPatientName(cleaned.schedPatientName);
  setSchedDob(cleaned.schedDob);
  setSchedMrn(cleaned.schedMrn);
  setSchedSex(cleaned.schedSex);
  setSchedHeight(cleaned.schedHeight);
  setSchedWeight(cleaned.schedWeight);
  setSchedAllergies(cleaned.schedAllergies);
  setSchedPregnant(cleaned.schedPregnant);
  setSchedSedation(cleaned.schedSedation);
  setSchedClaustro(cleaned.schedClaustro);
  setSchedMobility(cleaned.schedMobility);
  setSchedInterpreter(cleaned.schedInterpreter);
  setSchedLocationPref(cleaned.schedLocationPref);

  // Contrast/kidney
  setSchedContrastPlanned(cleaned.schedContrastPlanned);
  setSchedCreatinineKnown(cleaned.schedCreatinineKnown);
  setSchedEgfr(cleaned.schedEgfr);
  setSchedDiabeticMeds(cleaned.schedDiabeticMeds);

  // Metal/implant
  setSchedMetalRisk(cleaned.schedMetalRisk);
  setSchedImplantType(cleaned.schedImplantType);
  setSchedImplantMakeModel(cleaned.schedImplantMakeModel);
  setSchedImplantCard(cleaned.schedImplantCard);

  // Step 2
  setSchedModality(cleaned.schedModality);
  setSchedRegion(cleaned.schedRegion);
  setSelectedSchedulerExam(cleaned.selectedSchedulerExam);
  setSchedExamText(cleaned.schedExamText);
  setSchedCpt(cleaned.schedCpt);
  setSchedIcd(cleaned.schedIcd);
  setSchedIndication(cleaned.schedIndication);
}

// Replace your existing versions with these:
function saveSchedulerLocal() {
  try {
    const snapshot = getSchedulerSnapshot();
    const payload = {
      v: SCHED_VERSION,
      savedAt: nowIso(),
      data: snapshot,
    };
    localStorage.setItem(SCHED_STORAGE_KEY, JSON.stringify(payload));
    setSchedLastSaved(payload.savedAt);
    alert("Saved scheduler locally.");
  } catch (e) {
    console.error(e);
    alert("Save failed. Your browser may be blocking storage.");
  }
}


function loadSchedulerLocal() {
  try {
    const raw = localStorage.getItem(SCHED_STORAGE_KEY);
    if (!raw) {
      alert("No saved scheduler found yet.");
      return;
    }
    const parsed = safeJsonParse(raw);
if (!parsed) {
  alert("Saved scheduler data is corrupted or unreadable.");
  return;
}

    const cleaned = sanitizeScheduler(parsed);
    applySchedulerSnapshot(cleaned);

    // optional: jump user to step 1 after load
    // setSchedulerStep(1);

    alert("Loaded saved scheduler.");
  } catch (e) {
    console.error(e);
    alert("Load failed. Saved data may be corrupted.");
  }
}

function clearSchedulerSaved() {
  try {
    localStorage.removeItem(SCHED_STORAGE_KEY);
    alert("Cleared saved scheduler.");
  } catch (e) {
    console.error(e);
    alert("Clear failed.");
  }
}

function loadDemoCase() {
  // Always reset to Step 1 for clean demo
  setSchedulerStep(1);

  // Step 1 (fake data only)
  setSchedCallbackName("DEMO Caller (Training)");
  setSchedCallbackPhone("401-555-0199");
  setSchedOrderingProvider("TEST Provider, MD");
  setSchedPatientName("DEMO PATIENT, ALEX");
  setSchedDob("01/01/2000");
  setSchedMrn("DEMO-10001");
  setSchedSex("Unknown");
  setSchedHeight(`5'10"`);
  setSchedWeight("180 lb");
  setSchedAllergies("None reported (demo)");
  setSchedPregnant("N/A");
  setSchedSedation("No");
  setSchedClaustro("No");
  setSchedMobility("Ambulatory");
  setSchedInterpreter("No");
  setSchedLocationPref("Morning preferred (demo)");

  // Contrast/Kidney (demo)
  setSchedContrastPlanned("Unknown");
  setSchedCreatinineKnown("Unknown");
  setSchedEgfr("");
  setSchedDiabeticMeds("Unknown");

  // Implants/Metal (demo)
  setSchedMetalRisk("Unknown");
  setSchedImplantType("");
  setSchedImplantMakeModel("");
  setSchedImplantCard("Unknown");

  // Step 2 (demo)
  setSchedModality("MRI");
  setSchedRegion("Spine");
  setSelectedSchedulerExam("");
  setSchedExamText("MRI C-Spine w/o (demo)");
  setSchedCpt("");
  setSchedIcd("");
  setSchedIndication("Neck pain with radicular symptoms (demo)");

  // Step 3 status strip (demo)
  setSchedPriority("Routine");
  setSchedStatus("Ready to Schedule (demo)");

  alert("Demo case loaded (no real patient data).");
}


  const fillDemoStep1 = () => {
    setSchedCallbackName("Maria Doe (spouse)");
    setSchedCallbackPhone("401-555-0199");
    setSchedOrderingProvider("John Smith, MD");

    setSchedPatientName("Jane Doe");
    setSchedDob("01/15/1969");
    setSchedMrn("MRN-1048832");
    setSchedSex("Female");
    setSchedHeight(`5'6"`);
    setSchedWeight("165 lb");

    setSchedAllergies("None known");
    setSchedPregnant("N/A");
    setSchedSedation("No");
    setSchedClaustro("Yes");

    setSchedMobility("Ambulatory");
    setSchedInterpreter("No");
    setSchedLocationPref("Morning if possible; close to home");

    setSchedContrastPlanned("Unknown");
    setSchedCreatinineKnown("Unknown");
    setSchedEgfr("");
    setSchedDiabeticMeds("Unknown");

    setSchedMetalRisk("Unknown");
    setSchedImplantType("");
    setSchedImplantMakeModel("");
    setSchedImplantCard("Unknown");
  };

  const suggestedExams = useMemo(() => {
    const library = {
      Brain: [
        { name: "MRI Brain w/o", cpt: "70551" },
        { name: "MRI Brain w/wo", cpt: "70553" },
      ],
      Spine: [
        { name: "MRI C-Spine w/o", cpt: "72141" },
        { name: "MRI L-Spine w/o", cpt: "72148" },
      ],
      MSK: [
        { name: "MRI Knee w/o", cpt: "73721" },
        { name: "MRI Shoulder w/o", cpt: "73221" },
      ],
      AbdomenPelvis: [
        { name: "MRI Abdomen w/wo", cpt: "74183" },
        { name: "CT Abd/Pelvis w", cpt: "74177" },
      ],
      Vascular: [{ name: "MRA Head/Neck w/wo", cpt: "70546" }],
    };
    return library[schedRegion] || [];
  }, [schedRegion]);

  const applySuggestion = (chosen) => {
    if (!chosen) return;
    setSelectedSchedulerExam(chosen.name);
    setSchedExamText(chosen.name);
    setSchedCpt(chosen.cpt || "");
  };

  
 const step1Ok = useMemo(() => {
  const basicOk =
    schedPatientName.trim().length > 0 &&
    schedDob.trim().length > 0;

  return basicOk && demoNameOk;
}, [schedPatientName, schedDob, demoNameOk]);


  const step2Ok = useMemo(() => {
    return Boolean(schedExamText.trim());
  }, [schedExamText]);

  const dxExamStatus = useMemo(() => {
    if (!schedExamText.trim()) {
      return { level: "warn", message: "Add a Requested Exam so Step 3 can generate a clean RIS note." };
    }
    if (!schedIndication.trim()) {
      return { level: "warn", message: "Consider adding a short clinical indication (the “why”)." };
    }
    return { level: "ok", message: "Looks good — you have enough to generate the RIS note." };
  }, [schedExamText, schedIndication]);

 function getTeachingSuggestedCorrection() {
  // Only possible if Region exists and we have suggestions
  if (!schedRegion) return null;

  const list = (EXAM_SUGGESTIONS && EXAM_SUGGESTIONS[schedRegion]) ? EXAM_SUGGESTIONS[schedRegion] : [];
  if (!list.length) return null;

  // If user selected one, use it; otherwise auto-pick first suggestion
  const chosen =
    (selectedSchedulerExam && list.find((x) => x.name === selectedSchedulerExam)) || list[0];

  const reasons = [];

  // Use your existing banner message if available
  if (dxExamStatus?.message) {
    reasons.push(dxExamStatus.message);
  }

  if (schedIndication?.trim()) {
    reasons.push(`Indication captured: ${schedIndication.trim()}`);
  }

  const typedExam = (schedExamText || "").trim();
  if (typedExam && typedExam !== chosen.name.trim()) {
    reasons.push(`Caller/Order text was "${typedExam}" — suggestion standardizes to "${chosen.name}" for consistency.`);
  }

  const typedCpt = (schedCpt || "").toString().trim();
  if (chosen.cpt && typedCpt && typedCpt !== String(chosen.cpt)) {
    reasons.push(`Entered CPT (${typedCpt}) doesn’t match suggested CPT (${chosen.cpt}).`);
  }

  const typedIcd = (schedIcd || "").toString().trim();
  if (chosen.icd && typedIcd && typedIcd !== String(chosen.icd)) {
    reasons.push(`Entered ICD-10 (${typedIcd}) doesn’t match suggested ICD-10 (${chosen.icd}).`);
  }

  // If we still have nothing, add a generic explanation
  if (reasons.length === 0) {
    reasons.push("Suggestion is based on selected Body Region + standard naming to reduce scheduling errors.");
  }

  return { chosen, reasons, autoPicked: !selectedSchedulerExam };
}

  

  // -----------------------------
  // RIS Note Text Builder
  // -----------------------------
  const buildOrderSummaryText = () => {
    const lines = [];
// --- Teaching Suggested Correction (for RIS note) ---
  const corr = getTeachingSuggestedCorrection();

  
  lines.push("=== TEACHING: SUGGESTED CORRECTION (NOT MEDICAL ADVICE) ===");

  if (!corr) {
    lines.push("No suggested correction generated (Body Region not selected or no suggestions available).");
  } else {
    const { chosen, reasons, autoPicked } = corr;

    lines.push(`Suggested standardized exam: ${chosen.name}${autoPicked ? " (auto-suggested)" : ""}`);
    if (chosen.cpt) lines.push(`Suggested CPT: ${chosen.cpt}`);
    if (chosen.icd) lines.push(`Suggested ICD-10: ${chosen.icd}`);

    lines.push("Explanation:");
    reasons.forEach((r) => lines.push(`- ${r}`));

    lines.push("Action:");
    lines.push("- Verify with ordering provider / protocol team if anything is unclear before final scheduling.");
  }
    lines.push("=== RIS NOTE (Training Demo) ===");
    lines.push(`Generated: ${new Date().toLocaleString()}`);
    lines.push("");

    lines.push(`[STATUS STRIP] Priority: ${schedPriority} | Status: ${schedStatus}`);
    lines.push(`[PATIENT] Name: ${schedPatientName || "—"} | DOB: ${schedDob || "—"} | MRN: ${schedMrn || "—"} | Sex: ${schedSex || "—"}`);
    lines.push("");

    lines.push(`[CALLBACK] ${schedCallbackName || "—"} | ${schedCallbackPhone || "—"}`);
    lines.push(`[ORDERING] Provider: ${schedOrderingProvider || "—"}`);
    lines.push("");

    lines.push(`[EXAM] Modality: ${schedModality || "—"} | Requested: ${schedExamText || "—"}`);
    if (schedCpt) lines.push(`[CPT] ${schedCpt}`);
    if (schedIcd) lines.push(`[ICD-10] ${schedIcd}`);
    if (schedIndication) lines.push(`[INDICATION] ${schedIndication}`);
    lines.push("");

    lines.push(`[SAFETY] Allergies: ${schedAllergies || "—"} | Pregnancy: ${schedPregnant || "—"}`);
    lines.push(`[COMFORT] Sedation: ${schedSedation || "—"} | Claustro: ${schedClaustro || "—"}`);
    lines.push("");

    lines.push(`[LOGISTICS] Mobility: ${schedMobility || "—"} | Interpreter: ${schedInterpreter || "—"}`);
    if (schedLocationPref) lines.push(`[PREFERENCE] ${schedLocationPref}`);
    lines.push("");

    lines.push(`[CONTRAST/KIDNEY] Planned: ${schedContrastPlanned || "—"} | Creatinine Known: ${schedCreatinineKnown || "—"} | eGFR: ${schedEgfr || "—"}`);
    lines.push(`[DIABETES] Metformin/Diabetic meds: ${schedDiabeticMeds || "—"}`);
    lines.push("");

    lines.push(`[MRI METAL SCREEN] Metal Risk: ${schedMetalRisk || "—"}`);
    if (schedMetalRisk === "Yes") {
      lines.push(`  - Implant Type: ${schedImplantType || "—"}`);
      lines.push(`  - Make/Model: ${schedImplantMakeModel || "—"}`);
      lines.push(`  - Implant Card: ${schedImplantCard || "—"}`);
    }

    lines.push("");
    lines.push("Tip: paste into RIS/EMR “Order Comments / Scheduling Notes”.");
    return lines.join("\n");
  };

  const copyOrderSummary = async () => {
    const text = buildOrderSummaryText();
    try {
      await navigator.clipboard.writeText(text);
      alert("RIS Note copied to clipboard.");
    } catch (err) {
      try {
        // fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        alert("RIS Note copied (fallback).");
      } catch (e) {
        alert("Copy failed. You can select the text and copy manually.");
      }
    }
  };

  // -----------------------------
  // Ticker names (demo)
  // -----------------------------
  const tickerNames = useMemo(() => {
    const mentees = ["Chaz D.", "Renee M.", "Jordan K.", "Alicia P.", "Sam T."];
    const mentorNames = mentors
      .map((m) => `${m.firstName} ${m.lastName}`.trim())
      .filter(Boolean);

    const combined = [];
    for (let i = 0; i < 20; i++) {
      const mentee = mentees[i % mentees.length];
      const mentor = mentorNames[i % (mentorNames.length || 1)] || "Mentor";
      combined.push(`${mentee} honoring ${mentor}`);
    }
    return combined;
  }, [mentors]);

  // -----------------------------
  // -----------------------------
// OPTION A: Suggested exams by region (teaching demo)
// -----------------------------
const EXAM_SUGGESTIONS = {
  Brain: [
    { name: "MRI Brain w/o", cpt: "70551", hint: "Common for headache, neuro deficits, seizure workup." },
    { name: "MRI Brain w/ & w/o", cpt: "70553", hint: "Often for tumor, MS, infection, post-op follow-up." },
    { name: "MRI IAC w/ & w/o", cpt: "70553", hint: "Hearing loss / tinnitus / acoustic neuroma workup." },
  ],
  Spine: [
    { name: "MRI C-Spine w/o", cpt: "72141", hint: "Neck pain, radiculopathy, stenosis." },
    { name: "MRI T-Spine w/o", cpt: "72146", hint: "Thoracic pain, myelopathy concern." },
    { name: "MRI L-Spine w/o", cpt: "72148", hint: "Low back pain, sciatica, disc disease." },
  ],
  MSK: [
    { name: "MRI Knee w/o", cpt: "73721", hint: "Meniscus/ligaments, internal derangement." },
    { name: "MRI Shoulder w/o", cpt: "73221", hint: "Rotator cuff, labrum, impingement." },
    { name: "MRI Ankle w/o", cpt: "73721", hint: "Tendon/ligament injury, osteochondral lesion." },
  ],
  AbdomenPelvis: [
    { name: "MRI Abdomen w/ & w/o", cpt: "74183", hint: "Liver lesion characterization, pancreas, mass eval." },
    { name: "MRI Pelvis w/ & w/o", cpt: "72197", hint: "Pelvic mass, prostate/uterus/rectal staging workup." },
    { name: "MRCP w/o", cpt: "74181", hint: "Biliary ducts, gallstones, obstruction evaluation." },
  ],
  Vascular: [
    { name: "MRA Head w/o", cpt: "70544", hint: "Aneurysm screening, vascular malformation." },
    { name: "MRA Neck w/ & w/o", cpt: "70549", hint: "Carotid stenosis, dissection concerns." },
    { name: "MRA Abdomen w/ & w/o", cpt: "74185", hint: "AAA / renal artery / vascular mapping (site-specific)." },
  ],
};


  // UI
  // -----------------------------
// Scheduler Save/Load (localStorage demo)
// -----------------------------

const SCHED_VERSION = 1;



function nowIso() {
  return new Date().toISOString();
}

function safeJsonParse(s) {
  try { return JSON.parse(s); } catch { return null; }
}

  // -----------------------------
  return (
    <div className="page" id="top">
      {/* NAVBAR */}
      <header className="nav">
        <div className="nav-inner">
          <div className="nav-brand">Mentor Legacy</div>
          <nav className="nav-links">
            <a href="#top" className="nav-link">Home</a>
            <a href="#mentors" className="nav-link">Mentor Tribute</a>
            <a href="#acr" className="nav-link">Safety</a>
            <a href="#scheduler" className="nav-link">Scheduler</a>
            <a href="#games" className="nav-link">Games</a>
            <a href="#sponsors" className="nav-link">Sponsors</a>
            <a href="#legacy" className="nav-link">Legacy of Care</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">Honoring the Mentors</h1>
          <p className="hero-subtitle">
            A teaching-focused demo that celebrates mentorship and improves front-end scheduling clarity.
          </p>

          <div className="ticker">
            <div className="ticker-track">
              {tickerNames.map((t, idx) => (
                <span className="ticker-item" key={`${t}-${idx}`}>{t}</span>
              ))}
            </div>
          </div>

          <div className="quote-row">
            {wisdomQuotes.map((q) => (
              <div className="quote-card" key={q}>
                <div className="quote-text">{q}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

    <section className="info-section" id="mentors">
        <div className="info-inner">
          <h2 className="info-title">Mentor Tribute</h2>
          <p className="info-text">Fill in three mentors and keep the language heartfelt and specific.</p>

          <div className="preview-author">
            <label className="preview-author-label">Mentee (your name)</label>
            <input
              className="preview-author-input"
              value={letterAuthor}
              onChange={(e) => setLetterAuthor(e.target.value)}
              placeholder="Type mentee name…"
            />

            <div className="small-note" style={{ marginTop: 10 }}>
              Date: <strong>{letterDate}</strong>
            </div>

            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button type="button" className="sched-btn" onClick={saveMentorsLocal}>Save (demo)</button>
              <button type="button" className="sched-btn ghost" onClick={loadMentorsLocal}>Load (demo)</button>
              <button type="button" className="sched-btn ghost" onClick={loadDemoCase}>
  Load Demo Case
</button>

            </div>
          </div>

          <div className="mentor-grid">
            {mentors.map((m, i) => (
              <div className="mentor-card" key={m.label}>
                <div className="mentor-card-title">{m.label}</div>

                <div className="mentor-row">
                  <input
                    className="mentor-input"
                    value={m.firstName}
                    onChange={(e) => {
                      const copy = [...mentors];
                      copy[i] = { ...copy[i], firstName: e.target.value };
                      setMentors(copy);
                    }}
                    placeholder="First name"
                  />
                  <input
                    className="mentor-input"
                    value={m.lastName}
                    onChange={(e) => {
                      const copy = [...mentors];
                      copy[i] = { ...copy[i], lastName: e.target.value };
                      setMentors(copy);
                    }}
                    placeholder="Last name"
                  />
                </div>

                <input
                  className="mentor-input"
                  value={m.role}
                  onChange={(e) => {
                    const copy = [...mentors];
                    copy[i] = { ...copy[i], role: e.target.value };
                    setMentors(copy);
                  }}
                  placeholder="Role / title"
                />

                <textarea
                  className="mentor-textarea"
                  value={m.note}
                  onChange={(e) => {
                    const copy = [...mentors];
                    copy[i] = { ...copy[i], note: e.target.value };
                    setMentors(copy);
                  }}
                  placeholder="What did they teach you? What changed in you because of them?"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACR */}
      <section className="info-section" id="acr">
        <div className="info-inner">
          <h2 className="info-title">Safety (ACR Worksheet)</h2>
          <p className="info-text">
            If you place your Excel file in <code>public/</code>, you can link to it here.
          </p>

          <div className="info-callout">
            Example link (only works if file exists):{" "}
            <a href="/ACR_Worksheet_Final_striped.xlsx" target="_blank" rel="noreferrer">
              Open ACR_Worksheet_Final_striped.xlsx
            </a>
          </div>
        </div>
      </section>

      {/* SCHEDULER */}
     <section className="info-section" id="scheduler" ref={schedulerTopRef}>

        <div className="info-inner">
          <h2 className="info-title">Radiology Schedulers Helper</h2>
          <p className="info-text">
            A teaching-focused pre-clearance form to help schedulers capture clean, complete ordering info.
            <strong> (Teaching only — not medical advice.)</strong>
          </p>
          {/* Demo Mode (privacy) */}
<div className="small-note" style={{ marginTop: 10 }}>
  <label style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
    <input
      type="checkbox"
      checked={demoOnly}
      onChange={(e) => setDemoOnly(e.target.checked)}
    />
    Demo Mode (blocks real names — use DEMO/TEST)
  </label>
</div>

{demoOnly && !demoNameOk && (
  <div className="small-note" style={{ marginTop: 10 }}>
    ⚠ Demo Mode is ON: Patient Name must start with <strong>DEMO</strong> or{" "}
    <strong>TEST</strong>.
  </div>
)}

        
     
   
  

   
{schedLastSaved && (
  <div className="small-note" style={{ marginTop: 10 }}>
    Last saved: <strong>{new Date(schedLastSaved).toLocaleString()}</strong>
  </div>
)}
 {/* buttons row */}
 <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
  <button type="button" className="sched-btn" onClick={fillDemoStep1}>
    Demo Fill Step 1 →
  </button>

  <button type="button" className="sched-btn ghost" onClick={loadDemoCase}>
    Load Demo Case
  </button>

  <button type="button" className="sched-btn ghost" onClick={resetScheduler}>
    Reset Scheduler
  </button>

  <button type="button" className="sched-btn" onClick={saveSchedulerLocal}>
    Save (demo)
  </button>

  <button type="button" className="sched-btn ghost" onClick={loadSchedulerLocal}>
    Load (demo)
  </button>

  <button type="button" className="sched-btn ghost" onClick={clearSchedulerSaved}>
    Clear Saved
  </button>
</div>



          {/* Wizard Step Tabs */}
          <div className="sched-tabs">
            <button
              className={`sched-tab ${schedulerStep === 1 ? "is-active" : ""}`}
              onClick={() => setSchedulerStep(1)}
              type="button"
            >
              Step 1: Patient & Safety
            </button>

            <button
              className={`sched-tab ${schedulerStep === 2 ? "is-active" : ""}`}
              onClick={() => setSchedulerStep(2)}
              type="button"
              disabled={!step1Ok}
              title={!step1Ok ? "Complete Step 1 first" : ""}
            >
              Step 2: Exam & Diagnosis
            </button>

            <button
              className={`sched-tab ${schedulerStep === 3 ? "is-active" : ""}`}
              onClick={() => setSchedulerStep(3)}
              type="button"
              disabled={!step2Ok}
              title={!step2Ok ? "Complete Step 2 first" : ""}
            >
              Step 3: RIS Note
            </button>
          </div>

          {/* STEP 1 */}
          {schedulerStep === 1 && (
            <div className="sched-panel">
              <div className="sched-panel-head">
                <h3 className="sched-panel-title">Step 1 — Patient & Safety Intake</h3>
                <div className="sched-panel-sub">
                  RIS-style intake: caller, patient identifiers, safety flags, and logistics.
                </div>
              </div>

              <div className="sched-form">
                {/* SECTION: Caller / Ordering */}
                <div className="sched-section">
                  <div className="sched-section-title">Caller / Ordering</div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Callback Contact</div>
                      <div className="sched-label-hint">Who should we call if there’s a question?</div>
                    </div>
                    <div className="sched-control">
                      <input
                        className="sched-input"
                        value={schedCallbackName}
                        onChange={(e) => setSchedCallbackName(e.target.value)}
                        placeholder="Name (e.g., Maria Doe — spouse)"
                      />
                      <div style={{ height: 8 }} />
                      <input
                        className="sched-input"
                        value={schedCallbackPhone}
                        onChange={(e) => setSchedCallbackPhone(e.target.value)}
                        placeholder="Phone (e.g., 401-555-0199)"
                      />
                    </div>
                  </div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Ordering Provider</div>
                      <div className="sched-label-hint">Provider requesting the exam</div>
                    </div>
                    <div className="sched-control">
                      <input
                        className="sched-input"
                        value={schedOrderingProvider}
                        onChange={(e) => setSchedOrderingProvider(e.target.value)}
                        placeholder="e.g., John Smith, MD"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION: Patient Identifiers */}
                <div className="sched-section">
                  <div className="sched-section-title">Patient Identifiers</div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Patient Name</div>
                      <div className="sched-label-hint">Full name as listed in the chart</div>
                    </div>
                    <div className="sched-control">
                      <input
                        className="sched-input"
                        value={schedPatientName}
                        onChange={(e) => setSchedPatientName(e.target.value)}
                        placeholder="e.g., Jane Doe"
                      />
                    </div>
                  </div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">DOB</div>
                      <div className="sched-label-hint">Needed for correct chart match</div>
                    </div>
                    <div className="sched-control">
                      <input
                        className="sched-input"
                        value={schedDob}
                        onChange={(e) => setSchedDob(e.target.value)}
                        placeholder="MM/DD/YYYY"
                      />
                    </div>
                  </div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">MRN</div>
                      <div className="sched-label-hint">Medical record number (if available)</div>
                    </div>
                    <div className="sched-control">
                      <input
                        className="sched-input"
                        value={schedMrn}
                        onChange={(e) => setSchedMrn(e.target.value)}
                        placeholder="e.g., MRN-1048832"
                      />
                    </div>
                  </div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Sex</div>
                      <div className="sched-label-hint">As listed in chart</div>
                    </div>
                    <div className="sched-control">
                      <select
                        className="sched-input"
                        value={schedSex}
                        onChange={(e) => setSchedSex(e.target.value)}
                      >
                        <option value="Unknown">Unknown</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="X">X</option>
                      </select>
                    </div>
                  </div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Height / Weight</div>
                      <div className="sched-label-hint">Dose / table limit / coil fit considerations</div>
                    </div>
                    <div className="sched-control">
                      <input
                        className="sched-input"
                        value={schedHeight}
                        onChange={(e) => setSchedHeight(e.target.value)}
                        placeholder={`Height (e.g., 5'10" or 178 cm)`}
                      />
                      <div style={{ height: 8 }} />
                      <input
                        className="sched-input"
                        value={schedWeight}
                        onChange={(e) => setSchedWeight(e.target.value)}
                        placeholder="Weight (e.g., 180 lb or 82 kg)"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION: Safety */}
                <div className="sched-section">
                  <div className="sched-section-title">Safety Screen</div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Allergies / Contrast Reaction</div>
                      <div className="sched-label-hint">Include prior contrast reactions if known</div>
                    </div>
                    <div className="sched-control">
                      <input
                        className="sched-input"
                        value={schedAllergies}
                        onChange={(e) => setSchedAllergies(e.target.value)}
                        placeholder="e.g., Gad reaction 2018; iodine allergy"
                      />
                    </div>
                  </div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Pregnancy Status</div>
                      <div className="sched-label-hint">Teaching intake only</div>
                    </div>
                    <div className="sched-control">
                      <select
                        className="sched-input"
                        value={schedPregnant}
                        onChange={(e) => setSchedPregnant(e.target.value)}
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="Unknown">Unknown</option>
                        <option value="N/A">N/A</option>
                      </select>
                    </div>
                  </div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Sedation Needed</div>
                      <div className="sched-label-hint">Impacts scheduling location + prep</div>
                    </div>
                    <div className="sched-control">
                      <select
                        className="sched-input"
                        value={schedSedation}
                        onChange={(e) => setSchedSedation(e.target.value)}
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="Unknown">Unknown</option>
                      </select>
                    </div>
                  </div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Claustrophobia</div>
                      <div className="sched-label-hint">May change scanner choice / prep</div>
                    </div>
                    <div className="sched-control">
                      <select
                        className="sched-input"
                        value={schedClaustro}
                        onChange={(e) => setSchedClaustro(e.target.value)}
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="Unknown">Unknown</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECTION: Logistics */}
                <div className="sched-section">
                  <div className="sched-section-title">Logistics</div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Mobility</div>
                      <div className="sched-label-hint">Helps plan transport + room</div>
                    </div>
                    <div className="sched-control">
                      <select
                        className="sched-input"
                        value={schedMobility}
                        onChange={(e) => setSchedMobility(e.target.value)}
                      >
                        <option value="Ambulatory">Ambulatory</option>
                        <option value="Wheelchair">Wheelchair</option>
                        <option value="Stretcher">Stretcher</option>
                        <option value="Needs assist">Needs assist</option>
                      </select>
                    </div>
                  </div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Interpreter Needed</div>
                      <div className="sched-label-hint">If yes, note language in chart</div>
                    </div>
                    <div className="sched-control">
                      <select
                        className="sched-input"
                        value={schedInterpreter}
                        onChange={(e) => setSchedInterpreter(e.target.value)}
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Scheduling Preference</div>
                      <div className="sched-label-hint">Patient preference (time/location)</div>
                    </div>
                    <div className="sched-control">
                      <input
                        className="sched-input"
                        value={schedLocationPref}
                        onChange={(e) => setSchedLocationPref(e.target.value)}
                        placeholder="e.g., Morning if possible; close to home"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION: Contrast / Kidney */}
                <div className="sched-section">
                  <div className="sched-section-title">Contrast / Kidney (Teaching Intake)</div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Contrast Planned</div>
                      <div className="sched-label-hint">If unknown, leave as Unknown</div>
                    </div>
                    <div className="sched-control">
                      <select
                        className="sched-input"
                        value={schedContrastPlanned}
                        onChange={(e) => setSchedContrastPlanned(e.target.value)}
                      >
                        <option value="Unknown">Unknown</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Creatinine/eGFR Known?</div>
                      <div className="sched-label-hint">If yes, record eGFR</div>
                    </div>
                    <div className="sched-control">
                      <select
                        className="sched-input"
                        value={schedCreatinineKnown}
                        onChange={(e) => setSchedCreatinineKnown(e.target.value)}
                      >
                        <option value="Unknown">Unknown</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>

                      <div style={{ height: 8 }} />
                      <input
                        className="sched-input"
                        value={schedEgfr}
                        onChange={(e) => setSchedEgfr(e.target.value)}
                        placeholder="eGFR (if known)"
                        disabled={schedCreatinineKnown !== "Yes"}
                      />
                    </div>
                  </div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Diabetic Meds (Metformin?)</div>
                      <div className="sched-label-hint">Teaching intake only</div>
                    </div>
                    <div className="sched-control">
                      <select
                        className="sched-input"
                        value={schedDiabeticMeds}
                        onChange={(e) => setSchedDiabeticMeds(e.target.value)}
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="Unknown">Unknown</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECTION: MRI Implants */}
                <div className="sched-section">
                  <div className="sched-section-title">MRI Implants / Metal Screen</div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Metal Risk</div>
                      <div className="sched-label-hint">If yes/possible, capture implant basics</div>
                    </div>
                    <div className="sched-control">
                      <select
                        className="sched-input"
                        value={schedMetalRisk}
                        onChange={(e) => setSchedMetalRisk(e.target.value)}
                      >
                        <option value="Unknown">Unknown</option>
                        <option value="No">No known implants</option>
                        <option value="Yes">Yes / Possible</option>
                      </select>
                    </div>
                  </div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Implant Type</div>
                      <div className="sched-label-hint">Example: pacemaker, joint replacement</div>
                    </div>
                    <div className="sched-control">
                      <input
                        className="sched-input"
                        value={schedImplantType}
                        onChange={(e) => setSchedImplantType(e.target.value)}
                        placeholder="e.g., Knee replacement (right)"
                        disabled={schedMetalRisk !== "Yes"}
                      />
                    </div>
                  </div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Make / Model</div>
                      <div className="sched-label-hint">If unknown, leave blank</div>
                    </div>
                    <div className="sched-control">
                      <input
                        className="sched-input"
                        value={schedImplantMakeModel}
                        onChange={(e) => setSchedImplantMakeModel(e.target.value)}
                        placeholder="e.g., Medtronic Azure XT DR"
                        disabled={schedMetalRisk !== "Yes"}
                      />
                    </div>
                  </div>

                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Implant Card Available?</div>
                      <div className="sched-label-hint">Yes helps verification</div>
                    </div>
                    <div className="sched-control">
                      <select
                        className="sched-input"
                        value={schedImplantCard}
                        onChange={(e) => setSchedImplantCard(e.target.value)}
                        disabled={schedMetalRisk !== "Yes"}
                      >
                        <option value="Unknown">Unknown</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sched-actions">
                <button
                  className="sched-btn"
                  type="button"
                  onClick={() => setSchedulerStep(2)}
                  disabled={!step1Ok}
                >
                  Next: Exam & Diagnosis →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {schedulerStep === 2 && (
            <div className="sched-panel">
              <div className="sched-panel-head">
                <h3 className="sched-panel-title">Step 2 — Exam & Diagnosis</h3>
                <div className="sched-panel-sub">
                  Capture the order in consistent terms: modality, anatomy, CPT/ICD, and the clinical “why.”
                </div>
              </div>

              <div className="sched-form">
                <div className="sched-row">
                  <div className="sched-label">
                    <div className="sched-label-title">Modality</div>
                    <div className="sched-label-hint">Choose the study type requested</div>
                  </div>
                  <div className="sched-control">
                    <select
                      className="sched-input"
                      value={schedModality}
                      onChange={(e) => setSchedModality(e.target.value)}
                    >
                      <option value="MRI">MRI</option>
                      <option value="CT">CT</option>
                      <option value="XRAY">X-Ray</option>
                      <option value="US">Ultrasound</option>
                    </select>
                  </div>
                </div>

                <div className="sched-row">
                  <div className="sched-label">
                    <div className="sched-label-title">Body Region</div>
                    <div className="sched-label-hint">Used for suggestions (teaching demo)</div>
                  </div>
                  <div className="sched-control">
                    <select
                      className="sched-input"
                      value={schedRegion}
                      onChange={(e) => {
                        setSchedRegion(e.target.value);
                        setSelectedSchedulerExam("");
                      }}
                    >
                      <option value="">Select…</option>
                      <option value="Brain">Brain</option>
                      <option value="Spine">Spine</option>
                      <option value="MSK">MSK (Extremity)</option>
                      <option value="AbdomenPelvis">Abdomen / Pelvis</option>
                      <option value="Vascular">Vascular</option>
                    </select>
                  </div>
                </div>

                {/* ONE banner */}
                <div className={`sched-banner is-${dxExamStatus.level}`}>
                  <strong className="sched-banner-title">Teaching Check</strong>
                  <div className="sched-banner-text">{dxExamStatus.message}</div>
                </div>

                {schedRegion && (
                  <div className="sched-row">
                    <div className="sched-label">
                      <div className="sched-label-title">Suggested Exam</div>
                      <div className="sched-label-hint">Auto-fill Exam Text + CPT (teaching demo)</div>
                    </div>
                    <div className="sched-control">
                      <select
                        className="sched-input"
                        value={selectedSchedulerExam || ""}
                        onChange={(e) => {
                          const chosen = suggestedExams.find((x) => x.name === e.target.value);
                          applySuggestion(chosen);
                        }}
                      >
                        <option value="">Select a suggestion…</option>
                        {suggestedExams.map((s) => (
                          <option key={s.name} value={s.name}>
                            {s.name} {s.cpt ? `— CPT ${s.cpt}` : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="sched-row">
                  <div className="sched-label">
                    <div className="sched-label-title">Requested Exam (Plain Language)</div>
                    <input
                     ref={step2FirstFieldRef}
                      className="sched-input"
                      value={schedExamText}
                      onChange={(e) => setSchedExamText(e.target.value)}
                      placeholder="e.g., MRI Brain w/ & w/o"
                    />

                    <div className="sched-label-hint">What the caller thinks they’re booking</div>
                  </div>
                  <div className="sched-control">
                    <input
                      className="sched-input"
                      value={schedExamText}
                      onChange={(e) => setSchedExamText(e.target.value)}
                      placeholder='e.g., "MRI C-Spine w/o" or "CT Abd/Pelvis"'
                    />
                  </div>
                </div>

                <div className="sched-row">
                  <div className="sched-label">
                    <div className="sched-label-title">CPT Code (if known)</div>
                    <div className="sched-label-hint">Optional — confirms correct exam</div>
                  </div>
                  <div className="sched-control">
                    <input
                      className="sched-input"
                      value={schedCpt}
                      onChange={(e) => setSchedCpt(e.target.value)}
                      placeholder="e.g., 72141"
                    />
                  </div>
                </div>

                <div className="sched-row">
                  <div className="sched-label">
                    <div className="sched-label-title">ICD-10 Code (if known)</div>
                    <div className="sched-label-hint">Optional — supports medical necessity</div>
                  </div>
                  <div className="sched-control">
                    <input
                      className="sched-input"
                      value={schedIcd}
                      onChange={(e) => setSchedIcd(e.target.value)}
                      placeholder="e.g., M54.2"
                    />
                  </div>
                </div>

                <div className="sched-row">
                  <div className="sched-label">
                    <div className="sched-label-title">Clinical Indication</div>
                    <div className="sched-label-hint">Short “why” in plain words</div>
                  </div>
                  <div className="sched-control">
                    <textarea
                      className="sched-textarea"
                      value={schedIndication}
                      onChange={(e) => setSchedIndication(e.target.value)}
                      placeholder="e.g., Neck pain with radiculopathy, failed conservative tx"
                    />
                  </div>
                </div>
              </div>

              <div className="sched-actions">
                <button className="sched-btn ghost" type="button" onClick={() => setSchedulerStep(1)}>
                  ← Back
                </button>
                <button className="sched-btn" type="button" onClick={() => setSchedulerStep(3)} disabled={!step2Ok}>
                  Generate RIS Note →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {schedulerStep === 3 && (
            <div className="sched-panel">
              <div className="sched-panel-head">
                <h3 className="sched-panel-title">Step 3 — RIS Note (Training Demo)</h3>
                <div className="sched-panel-sub">Editable status strip + RIS-style note.</div>
              </div>

              {/* STATUS STRIP (editable RIS-style) */}
              <div className="ris-strip">
                {/* Priority */}
                <div className="ris-chip ris-edit">
                  <span className="k">Priority</span>
                  <select className="ris-input" value={schedPriority} onChange={(e) => setSchedPriority(e.target.value)}>
                    <option value="Routine">Routine</option>
                    <option value="Urgent">Urgent</option>
                    <option value="STAT">STAT</option>
                  </select>
                </div>

                {/* Status */}
                <div className="ris-chip ris-edit">
                  <span className="k">Status</span>
                  <input className="ris-input" value={schedStatus} onChange={(e) => setSchedStatus(e.target.value)} />
                </div>

                {/* MRN */}
                <div className="ris-chip ris-edit">
                  <span className="k">MRN</span>
                  <input className="ris-input" value={schedMrn} onChange={(e) => setSchedMrn(e.target.value)} placeholder="MRN" />
                </div>

                {/* Sex */}
                <div className="ris-chip ris-edit">
                  <span className="k">Sex</span>
                  <select className="ris-input" value={schedSex} onChange={(e) => setSchedSex(e.target.value)}>
                    <option value="Unknown">Unknown</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="X">X</option>
                  </select>
                </div>

                {/* Location Pref */}
                <div className="ris-chip ris-edit">
                  <span className="k">Location Pref</span>
                  <input
                    className="ris-input"
                    value={schedLocationPref}
                    onChange={(e) => setSchedLocationPref(e.target.value)}
                    placeholder="Morning / Near home"
                  />
                </div>

                {/* Callback */}
                <div className="ris-chip ris-edit">
                  <span className="k">Callback</span>
                  <input
                    className="ris-input"
                    value={schedCallbackPhone}
                    onChange={(e) => setSchedCallbackPhone(e.target.value)}
                    placeholder="(401) 555-0199"
                  />
                </div>

                {/* Interpreter */}
                <div className="ris-chip ris-edit">
                  <span className="k">Interpreter</span>
                  <select className="ris-input" value={schedInterpreter} onChange={(e) => setSchedInterpreter(e.target.value)}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {/* Mobility */}
                <div className="ris-chip ris-edit">
                  <span className="k">Mobility</span>
                  <select className="ris-input" value={schedMobility} onChange={(e) => setSchedMobility(e.target.value)}>
                    <option value="Ambulatory">Ambulatory</option>
                    <option value="Wheelchair">Wheelchair</option>
                    <option value="Stretcher">Stretcher</option>
                    <option value="Needs assist">Needs assist</option>
                  </select>
                </div>

                {/* Sedation */}
                <div className="ris-chip ris-edit">
                  <span className="k">Sedation</span>
                  <select className="ris-input" value={schedSedation} onChange={(e) => setSchedSedation(e.target.value)}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>

                {/* Claustro */}
                <div className="ris-chip ris-edit">
                  <span className="k">Claustro</span>
                  <select className="ris-input" value={schedClaustro} onChange={(e) => setSchedClaustro(e.target.value)}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>

                {/* Metal Risk */}
                <div className="ris-chip ris-edit">
                  <span className="k">Metal Risk</span>
                  <select className="ris-input" value={schedMetalRisk} onChange={(e) => setSchedMetalRisk(e.target.value)}>
                    <option value="Unknown">Unknown</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>

              {/* RIS NOTE (printout-style) */}
              <div className="ris-note-card">
                <div className="ris-note-head">
                  <div>
                    <div className="ris-note-title">RIS NOTE (Training Demo)</div>
                    <div className="ris-note-meta">Generated: {new Date().toLocaleString()}</div>
                  </div>

                  <div className="ris-note-actions">
                    <button type="button" className="sched-btn" onClick={copyOrderSummary}>
                      Copy RIS Note
                    </button>
                    <button type="button" className="sched-btn ghost" onClick={() => window.print()}>
                      Print
                    </button>
                  </div>
                </div>

                <pre className="ris-note-pre">{buildOrderSummaryText()}</pre>

                <div className="ris-note-hint">
                  Tip: paste into RIS/EMR “Order Comments / Scheduling Notes”.
                </div>
              </div>

              <div className="sched-actions">
                <button className="sched-btn ghost" type="button" onClick={() => setSchedulerStep(2)}>
                  ← Back
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* GAMES */}
      <section className="info-section" id="games">
        <div className="info-inner">
          <h2 className="info-title">MRI Games</h2>
          <p className="info-text">Placeholder section for your training games.</p>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="info-section" id="sponsors">
        <div className="info-inner">
          <h2 className="info-title">Sponsors</h2>
          <p className="info-text">Placeholder section for sponsor logos and acknowledgements.</p>
        </div>
      </section>

      {/* LEGACY */}
      <section className="info-section" id="legacy">
        <div className="info-inner">
          <h2 className="info-title">Legacy of Care</h2>
          <p className="info-text">Where you’ll connect your story, mentorship, and safety mission.</p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="small-note">Teaching demo • Not medical advice • Built for mentorship + learning</div>
        </div>
      </footer>
    </div>
  );
}
