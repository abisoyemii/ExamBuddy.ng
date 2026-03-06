
/* =====================================================================
   JAMB CBT ENGINE  –  ExamBuddy Nigeria
   ─────────────────────────────────────────────────────────────────────
   RULES FOLLOWED:
   • Zero changes to existing CSS classes, HTML elements, or selectors
   • Original quiz shell (sidebar, questionsContainer, etc.) is simply
     hidden via style.display — never deleted or modified
   • All new UI is injected via insertAdjacentHTML into <body>
   • localStorage key:  exambuddy_jamb_cbt_v4
   ===================================================================== */

/* ── 0. CBT-ONLY STYLES ─────────────────────────────────────────────── */
document.head.insertAdjacentHTML('beforeend', `<style id="cbt-styles">
/* Setup overlay */
#cbt-setup{position:fixed;inset:0;z-index:9990;background:#0A2463;display:flex;align-items:center;justify-content:center;padding:16px}
.sc-card{background:#fff;border-radius:22px;padding:36px 40px;max-width:520px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,.45)}
.sc-card h2{font-size:1.6rem;color:#0A2463;margin:0 0 4px}
.sc-card>p{color:#64748B;font-size:.9rem;margin:0 0 22px}
.sc-lbl{display:block;font-size:.74rem;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:.07em;margin:14px 0 6px}
.sc-subj-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px}
.sc-chip{display:flex;align-items:center;gap:8px;padding:9px 12px;border:2px solid #E2E8F0;border-radius:10px;cursor:pointer;font-size:.84rem;font-weight:600;color:#475569;user-select:none;transition:all .14s}
.sc-chip input{width:15px;height:15px;accent-color:#0A2463;flex-shrink:0;cursor:pointer}
.sc-chip:has(input:checked){border-color:#0A2463;background:#EFF6FF;color:#0A2463}
.sc-sel,.sc-num{width:100%;padding:10px 13px;border:2px solid #E2E8F0;border-radius:10px;font-size:.93rem;font-family:inherit;color:#0A2463;background:#fff;outline:none;box-sizing:border-box;-webkit-appearance:none}
.sc-sel:focus,.sc-num:focus{border-color:#0A2463}
.sc-go{width:100%;padding:14px;background:linear-gradient(135deg,#059669,#065F46);color:#fff;border:none;border-radius:12px;font-size:1rem;font-weight:800;cursor:pointer;font-family:inherit;margin-top:20px;letter-spacing:.02em;transition:opacity .2s}
.sc-go:hover{opacity:.9}
.sc-resume{display:none;margin-top:18px;padding-top:18px;border-top:1px solid #E2E8F0}
.sc-resume p{font-size:.84rem;color:#64748B;margin:0 0 10px}
.sc-resume-row{display:flex;gap:8px}
.sc-resume-row button{flex:1;padding:10px;border-radius:10px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.87rem;border:2px solid transparent}
.sc-btn-yes{background:#0A2463;color:#fff}
.sc-btn-no{background:#F1F5F9;color:#475569;border-color:#E2E8F0!important}

/* Exam screen */
#cbt-exam{display:none;flex-direction:column;position:fixed;inset:0;z-index:9980;background:#F8FAFC;overflow:hidden}
#cbt-exam.live{display:flex}

/* Top bar */
.cbt-bar{height:54px;background:#0A2463;display:flex;align-items:center;padding:0 20px;gap:14px;flex-shrink:0}
.cbt-bar-title{font-size:.88rem;font-weight:700;color:#fff;white-space:nowrap}
.cbt-bar-sub{font-size:.74rem;background:rgba(255,255,255,.18);color:#fff;padding:3px 11px;border-radius:20px;white-space:nowrap}
.cbt-bar-spacer{flex:1}
.cbt-clock{font-size:1.05rem;font-weight:800;color:#fff;background:#1e3a6b;padding:7px 16px;border-radius:9px;min-width:108px;text-align:center;letter-spacing:.03em;flex-shrink:0}
.cbt-clock.warn{background:#B45309}
.cbt-clock.danger{background:#991B1B;animation:_cbtp .6s infinite}
@keyframes _cbtp{0%,100%{opacity:1}50%{opacity:.55}}
.cbt-bar-submit{padding:7px 18px;background:#EF4444;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.85rem;flex-shrink:0}
.cbt-bar-submit:hover{background:#DC2626}

/* Body split */
.cbt-body{display:grid;grid-template-columns:1fr 264px;flex:1;overflow:hidden;min-height:0}
@media(max-width:860px){.cbt-body{grid-template-columns:1fr;overflow:auto}}

/* Question panel — reuses your existing card classes */
.cbt-qpanel{overflow-y:auto;padding:24px 28px 32px}
.cbt-prog-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px}
.cbt-prog-row h2{font-size:1.05rem;color:#0A2463;font-weight:700;margin:0}
.cbt-prog-badge{font-size:.79rem;color:#64748B;background:#E2E8F0;padding:4px 12px;border-radius:999px;white-space:nowrap}
.cbt-stats-row{display:flex;gap:7px;margin-bottom:16px;flex-wrap:wrap}
.cbt-pill{padding:4px 13px;border-radius:999px;font-size:.76rem;font-weight:700}
.cbt-pill.a{background:#DCFCE7;color:#166534}
.cbt-pill.f{background:#FEF3C7;color:#92400E}
.cbt-pill.u{background:#F1F5F9;color:#475569}

/* Selected option state — layered on top of existing .option-btn */
.option-btn.cbt-chosen{border-color:#0A2463;background:rgba(10,36,99,.07)}
.option-btn.cbt-chosen .opt-letter{background:#0A2463;color:#fff}

/* Nav row */
.cbt-nav-row{display:flex;gap:9px;flex-wrap:wrap;margin-top:18px;align-items:center}
.cbt-nbtn{padding:10px 20px;border-radius:10px;font-weight:700;font-size:.87rem;cursor:pointer;font-family:inherit;border:2px solid #E2E8F0;background:#fff;color:#475569;transition:all .14s;white-space:nowrap}
.cbt-nbtn:hover{border-color:#0A2463;color:#0A2463}
.cbt-nbtn.primary{background:#0A2463;border-color:#0A2463;color:#fff;margin-left:auto}
.cbt-nbtn.primary:hover{background:#0d2f82}
.cbt-nbtn.flagged{border-color:#D97706;background:#FEF3C7;color:#92400E}
.cbt-flag-tag{font-size:.71rem;font-weight:700;background:#FEF3C7;color:#92400E;padding:2px 8px;border-radius:5px;margin-left:6px}

/* Right sidebar */
.cbt-sidebar{border-left:1px solid #E2E8F0;background:#fff;overflow-y:auto;display:flex;flex-direction:column}
@media(max-width:860px){.cbt-sidebar{border-left:none;border-top:1px solid #E2E8F0;max-height:220px}}
.cbt-sb-sec{padding:14px 14px 10px;border-bottom:1px solid #F1F5F9}
.cbt-sb-sec:last-child{border-bottom:none}
.cbt-sb-head{font-size:.71rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#94A3B8;margin-bottom:9px}
.cbt-subtabs{display:flex;flex-direction:column;gap:3px}
.cbt-stab{padding:7px 11px;border-radius:8px;border:none;background:none;font-family:inherit;font-size:.82rem;font-weight:600;color:#475569;cursor:pointer;display:flex;justify-content:space-between;align-items:center;width:100%;text-align:left;transition:all .13s}
.cbt-stab:hover{background:#F1F5F9;color:#0A2463}
.cbt-stab.on{background:#0A2463;color:#fff}
.cbt-stab .sbadge{font-size:.69rem;font-weight:700;padding:1px 7px;border-radius:20px;background:rgba(255,255,255,.2)}
.cbt-stab:not(.on) .sbadge{background:#E2E8F0;color:#64748B}
.cbt-palette{display:grid;grid-template-columns:repeat(5,1fr);gap:4px}
.pq-btn{padding:0;border-radius:6px;border:1.5px solid #E2E8F0;background:#fff;font-size:.76rem;font-weight:700;cursor:pointer;font-family:inherit;color:#475569;aspect-ratio:1;display:flex;align-items:center;justify-content:center;transition:all .12s}
.pq-btn:hover{border-color:#0A2463;color:#0A2463}
.pq-btn.cur{border-color:#0A2463;background:#0A2463;color:#fff}
.pq-btn.ans{border-color:#059669;background:#059669;color:#fff}
.pq-btn.flg{border-color:#D97706;background:#FEF3C7;color:#92400E}
.pq-btn.ans.flg{border-color:#D97706;background:linear-gradient(135deg,#059669 50%,#FEF3C7 50%);color:#fff}
.cbt-legend-grid{display:flex;flex-wrap:wrap;gap:7px}
.leg-item{display:flex;align-items:center;gap:4px;font-size:.69rem;color:#64748B}
.leg-dot{width:11px;height:11px;border-radius:3px;flex-shrink:0}

/* Modal */
.cbt-overlay{position:fixed;inset:0;background:rgba(0,0,0,.52);z-index:9995;display:none;align-items:center;justify-content:center;padding:16px}
.cbt-overlay.open{display:flex}
.cbt-modal{background:#fff;border-radius:20px;padding:32px;max-width:430px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3)}
.cbt-modal h3{font-size:1.2rem;color:#0A2463;margin:0 0 8px}
.cbt-modal p{color:#475569;font-size:.89rem;line-height:1.55;margin:0 0 4px}
.cbt-modal-info{margin:12px 0;padding:12px;background:#F8FAFC;border-radius:10px;font-size:.82rem;color:#475569;line-height:1.7}
.cbt-modal-btns{display:flex;gap:10px;margin-top:20px}
.cbt-modal-btns button{flex:1;padding:12px;border-radius:10px;font-weight:700;font-size:.88rem;cursor:pointer;font-family:inherit;border:2px solid transparent}
.cbt-m-no{background:#F1F5F9;color:#475569;border-color:#E2E8F0!important}
.cbt-m-no:hover{background:#E2E8F0}
.cbt-m-yes{background:#EF4444;color:#fff}
.cbt-m-yes:hover{background:#DC2626}

/* Result screen */
#cbt-result{display:none;position:fixed;inset:0;z-index:9970;background:#F8FAFC;overflow-y:auto;padding:32px 16px 60px}
#cbt-result.show{display:block}
.res-wrap{max-width:800px;margin:0 auto}
.res-hero{background:linear-gradient(135deg,#0A2463,#1e3a8a);color:#fff;border-radius:20px;padding:32px;text-align:center;margin-bottom:22px}
.res-hero h2{font-size:1.65rem;margin:0 0 4px}
.res-hero>p{opacity:.75;font-size:.88rem;margin:0 0 16px}
.res-big-score{font-size:3.8rem;font-weight:900;color:#10B981;line-height:1}
.res-pct{font-size:1.25rem;font-weight:700;color:rgba(255,255,255,.7);margin-top:6px}
.res-grade-badge{display:inline-block;margin-top:10px;padding:5px 18px;border-radius:20px;font-size:.92rem;font-weight:800}
.gA{background:#DCFCE7;color:#166534}.gB{background:#DBEAFE;color:#1D4ED8}
.gC{background:#FEF9C3;color:#854D0E}.gF{background:#FEE2E2;color:#991B1B}
.res-card-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;margin-bottom:22px}
.res-card{background:#fff;border:1px solid #E2E8F0;border-radius:16px;padding:20px;text-align:center}
.res-card .rci{font-size:1.6rem;margin-bottom:6px}
.res-card .rcn{font-size:1.85rem;font-weight:800;color:#0A2463}
.res-card .rcl{font-size:.73rem;color:#64748B;font-weight:600;text-transform:uppercase;letter-spacing:.05em}
.res-card.ok .rcn{color:#059669}.res-card.bad .rcn{color:#EF4444}
.res-block{background:#fff;border:1px solid #E2E8F0;border-radius:16px;overflow:hidden;margin-bottom:22px}
.res-block-hd{padding:15px 20px;border-bottom:1px solid #E2E8F0;font-size:.94rem;color:#0A2463;font-weight:700;margin:0}
.res-tbl{width:100%;border-collapse:collapse}
.res-tbl th,.res-tbl td{padding:10px 18px;text-align:left;font-size:.83rem;border-bottom:1px solid #F1F5F9}
.res-tbl th{font-weight:700;color:#475569;background:#F8FAFC;font-size:.74rem;text-transform:uppercase;letter-spacing:.05em}
.res-tbl tr:last-child td{border-bottom:none}
.res-tbl .ok{color:#059669;font-weight:700}.res-tbl .bad{color:#EF4444;font-weight:700}
.res-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:28px}
.res-actions button{padding:11px 24px;border-radius:12px;font-weight:700;font-size:.9rem;cursor:pointer;font-family:inherit;border:2px solid transparent;transition:all .13s}
.res-btn-p{background:#0A2463;color:#fff}.res-btn-p:hover{background:#0d2f82}
.res-btn-o{background:#fff;color:#0A2463;border-color:#0A2463!important}.res-btn-o:hover{background:#EFF6FF}
.res-btn-g{background:#fff;color:#475569;border-color:#E2E8F0!important}.res-btn-g:hover{background:#F1F5F9}
.rev-q{padding:15px;border-radius:12px;border:1px solid #E2E8F0;margin-bottom:9px;background:#FAFAFA}
.rev-meta{display:flex;gap:7px;margin-bottom:8px;align-items:center;flex-wrap:wrap}
.rev-num{font-size:.71rem;font-weight:800;color:#94A3B8;background:#F1F5F9;padding:2px 8px;border-radius:5px}
.rev-sub{font-size:.71rem;font-weight:700;color:#2563EB;background:rgba(37,99,235,.1);padding:2px 8px;border-radius:5px}
.rev-st{margin-left:auto;font-size:.71rem;font-weight:700;padding:2px 9px;border-radius:5px}
.rev-st.ok{background:#DCFCE7;color:#166534}.rev-st.bad{background:#FEE2E2;color:#991B1B}.rev-st.skip{background:#F1F5F9;color:#64748B}
.rev-text{font-size:.89rem;color:#0A2463;font-weight:500;margin-bottom:8px;line-height:1.55}
.rev-opt{font-size:.81rem;color:#475569;padding:2px 0}
.rev-exp{font-size:.81rem;color:#475569;background:rgba(5,150,105,.07);border-left:3px solid #059669;padding:8px 12px;border-radius:0 8px 8px 0;margin-top:8px;line-height:1.5}
</style>`);

/* ── 1. QUESTION DATA ────────────────────────────────────────────────── */
const JAMB_DATA = {
  english:[
    {year:2024,q:"Choose the word most nearly opposite in meaning to INDIGENT.",opts:["A. Poor","B. Affluent","C. Lazy","D. Honest"],ans:"B",exp:"INDIGENT means very poor. Its antonym is AFFLUENT — having a great deal of money."},
    {year:2024,q:"Fill in: 'The committee ___ divided on the issue.'",opts:["A. was","B. were","C. is","D. are"],ans:"A",exp:"'Committee' is a singular collective noun and takes the singular verb 'was' in formal usage."},
    {year:2024,q:"Identify the figure of speech: 'The stars danced in the night sky.'",opts:["A. Simile","B. Hyperbole","C. Personification","D. Alliteration"],ans:"C",exp:"Stars cannot literally dance — giving a human quality to a non-human object is personification."},
    {year:2024,q:"Choose the correctly spelled word.",opts:["A. Neccessary","B. Neccesary","C. Necessary","D. Necessery"],ans:"C",exp:"NECESSARY: one 'c', double 's'. Memory: one Collar, two Sleeves."},
    {year:2024,q:"The plural of 'radius' is:",opts:["A. Radiuses","B. Radii","C. Radius's","D. Radiuss"],ans:"B",exp:"Latin-origin: plural is 'radii'. Others: focus→foci, alumnus→alumni."},
    {year:2023,q:"Choose the word nearest in meaning to VACUOUS.",opts:["A. Full","B. Empty","C. Bright","D. Active"],ans:"B",exp:"VACUOUS means lacking thought or intelligence; empty."},
    {year:2023,q:"Which sentence uses the subjunctive correctly?",opts:["A. I suggest he goes home now.","B. I suggest he go home now.","C. I suggest he went home now.","D. I suggest he is going home now."],ans:"B",exp:"After suggest, recommend, insist — use the base verb form (subjunctive): 'I suggest he GO'."},
    {year:2023,q:"GREGARIOUS means:",opts:["A. Shy and withdrawn","B. Sociable and outgoing","C. Aggressive","D. Intelligent"],ans:"B",exp:"GREGARIOUS means fond of company; sociable. From Latin 'grex' (flock)."},
    {year:2023,q:"Choose the sentence in the active voice.",opts:["A. The letter was written by Emeka.","B. Emeka wrote the letter.","C. The letter has been written.","D. The letter is being written."],ans:"B",exp:"Active voice: subject performs the action. 'Emeka wrote the letter.' All others are passive."},
    {year:2023,q:"A word that joins clauses, phrases, or words is a:",opts:["A. Preposition","B. Conjunction","C. Interjection","D. Pronoun"],ans:"B",exp:"A conjunction connects clauses and words: and, but, because, although, since."},
    {year:2022,q:"OSTENTATIOUS means:",opts:["A. Modest and simple","B. Showy and designed to impress","C. Quiet and reserved","D. Poor and humble"],ans:"B",exp:"OSTENTATIOUS means characterized by a showy display intended to impress."},
    {year:2022,q:"'Each of the students ___ submitted his assignment.'",opts:["A. have","B. has","C. had been","D. were"],ans:"B",exp:"'Each' is always singular — 'Each of the students HAS submitted'."},
    {year:2022,q:"Which is an example of onomatopoeia?",opts:["A. The stars are bright","B. She is like a flower","C. The bees buzzed","D. Life is a journey"],ans:"C",exp:"'Buzzed' is onomatopoeia — the word sounds like what it describes."},
    {year:2022,q:"Select the word stressed on the first syllable.",opts:["A. Compute","B. Present (noun)","C. Arrive","D. Suggest"],ans:"B",exp:"PRE-sent (noun, a gift) = stress on syllable 1. pre-SENT (verb) = stress on syllable 2."},
    {year:2022,q:"A phrase that has become trite through overuse is a:",opts:["A. Neologism","B. Cliché","C. Euphemism","D. Colloquialism"],ans:"B",exp:"A CLICHÉ is an overused phrase that has lost its original force."},
    {year:2021,q:"Choose the option nearest in meaning to AMELIORATE.",opts:["A. Worsen","B. Improve","C. Maintain","D. Destroy"],ans:"B",exp:"AMELIORATE means to make something bad better; to improve."},
    {year:2021,q:"In 'He is taller than I', what case is 'I'?",opts:["A. Objective","B. Possessive","C. Nominative","D. Reflexive"],ans:"C",exp:"Nominative (subject) case. Full form: 'He is taller than I [am]'."},
    {year:2021,q:"EXONERATE means:",opts:["A. To blame someone","B. To officially declare someone not guilty","C. To examine carefully","D. To ignore completely"],ans:"B",exp:"EXONERATE = officially free someone from blame or criminal charges."},
    {year:2021,q:"The suffix '-OLOGY' means:",opts:["A. Fear of","B. Love of","C. Study of","D. Condition of"],ans:"C",exp:"'-ology' = the study of: biology (life), geology (earth), psychology (mind)."},
    {year:2021,q:"Which option has a silent letter?",opts:["A. Plate","B. Knight","C. Stone","D. Flame"],ans:"B",exp:"'Knight' has a silent 'k' — pronounced 'nait'. Others: knife, knock, kneel."},
    {year:2020,q:"SYCOPHANT means:",opts:["A. A person who flatters for personal gain","B. A type of plant","C. Someone very generous","D. A government official"],ans:"A",exp:"A SYCOPHANT flatters important people to gain advantage. Synonym: yes-man."},
    {year:2020,q:"'The police arrived before the thieves escaped' — type of underlined clause?",opts:["A. Relative clause","B. Noun clause","C. Adverbial clause of time","D. Conditional clause"],ans:"C",exp:"'Before the thieves escaped' tells WHEN — it is an adverbial clause of time."},
    {year:2020,q:"EPHEMERAL means:",opts:["A. Lasting forever","B. Lasting only a short time","C. Very important","D. Extremely large"],ans:"B",exp:"EPHEMERAL = lasting for a very short time."},
    {year:2020,q:"Which word is an antonym of VERBOSE?",opts:["A. Wordy","B. Talkative","C. Concise","D. Eloquent"],ans:"C",exp:"VERBOSE = using too many words. Antonym = CONCISE."},
    {year:2020,q:"PROPITIOUS means:",opts:["A. Giving a good chance of success","B. Dangerous","C. Unfortunate","D. Complicated"],ans:"A",exp:"PROPITIOUS = favourable, giving a good chance of success."},
    {year:2019,q:"Choose the correct use of the apostrophe.",opts:["A. Its raining outside.","B. It's raining outside.","C. Its' raining outside.","D. It's' raining outside."],ans:"B",exp:"'It's' = 'it is' (contraction). 'Its' without apostrophe = possessive pronoun."},
    {year:2019,q:"CACOPHONY means:",opts:["A. Beautiful harmony","B. A harsh discordant mixture of sounds","C. Complete silence","D. A type of music"],ans:"B",exp:"CACOPHONY = a harsh mix of discordant sounds. Opposite: euphony."},
    {year:2019,q:"BRAVADO means:",opts:["A. Genuine courage","B. A show of boldness intended to impress","C. Fear disguised as strength","D. Physical strength"],ans:"B",exp:"BRAVADO = a show of boldness intended to impress, often hiding underlying fear."},
    {year:2019,q:"Which is a compound sentence?",opts:["A. She sings beautifully.","B. She sings because she is happy.","C. She sings and he dances.","D. When she sings, everyone listens."],ans:"C",exp:"Compound = two independent clauses joined by a coordinating conjunction (and)."},
    {year:2018,q:"INNOCUOUS means:",opts:["A. Harmful","B. Not harmful","C. Very loud","D. Strange"],ans:"B",exp:"INNOCUOUS = not harmful or offensive."},
    {year:2018,q:"Correct prefix to mean 'not lawful':",opts:["A. Inlawful","B. Unlawful","C. Alawful","D. Dislawful"],ans:"B",exp:"The prefix 'un-' correctly negates 'lawful': unlawful."},
    {year:2018,q:"Which of the following is a gerund?",opts:["A. The running water","B. Running is my favourite exercise","C. She is running","D. She ran quickly"],ans:"B",exp:"A gerund is a verb form used as a noun — 'Running' is the subject here."},
    {year:2018,q:"IMPECUNIOUS means:",opts:["A. Very rich","B. Very generous","C. Having very little money","D. Careless with money"],ans:"C",exp:"IMPECUNIOUS = having little or no money. From Latin 'pecunia' (money)."},
    {year:2018,q:"'Would you mind closing the door?' is best described as:",opts:["A. A statement","B. A command","C. A polite request","D. An exclamation"],ans:"C",exp:"Though question-structured, this functions as an indirect polite request."},
    {year:2017,q:"MAGNILOQUENT means:",opts:["A. Speaking simply","B. Using high-sounding language","C. Very quiet","D. Generous with words"],ans:"B",exp:"MAGNILOQUENT = using high-flown or bombastic language."},
    {year:2017,q:"Word nearest in meaning to RECALCITRANT:",opts:["A. Cooperative","B. Obedient","C. Stubborn","D. Helpful"],ans:"C",exp:"RECALCITRANT = having an uncooperative attitude toward authority; stubborn."},
    {year:2017,q:"The study of the origin and history of words is:",opts:["A. Phonology","B. Etymology","C. Morphology","D. Syntax"],ans:"B",exp:"ETYMOLOGY = study of the history and origin of words."},
    {year:2017,q:"PERFIDIOUS means:",opts:["A. Loyal and faithful","B. Deceitful and untrustworthy","C. Very intelligent","D. Hardworking"],ans:"B",exp:"PERFIDIOUS = guilty of betrayal; deceitful and untrustworthy."},
    {year:2016,q:"MUNIFICENT means:",opts:["A. Very stingy","B. Extremely generous","C. Very powerful","D. Highly educated"],ans:"B",exp:"MUNIFICENT = more generous than is usual or necessary."},
    {year:2016,q:"Which of these is a collective noun?",opts:["A. Beautiful","B. Quickly","C. Flock","D. Swim"],ans:"C",exp:"A collective noun refers to a group: a FLOCK of birds, a herd of cattle."},
    {year:2016,q:"LACONIC means:",opts:["A. Using few words","B. Using many words","C. Speaking loudly","D. Speaking softly"],ans:"A",exp:"LACONIC = using very few words. From Laconia (Sparta), famous for brief speech."},
    {year:2016,q:"Correct use of 'fewer' vs 'less':",opts:["A. There are less students today.","B. There are fewer students today.","C. There are less peoples today.","D. There are fewer water in the cup."],ans:"B",exp:"'Fewer' for countable nouns (students). 'Less' for uncountable nouns (water, time)."},
    {year:2016,q:"An ELEGY is a poem that:",opts:["A. Celebrates victory","B. Mocks someone","C. Mourns someone's death","D. Describes nature"],ans:"C",exp:"An elegy is a mournful poem written to lament the dead."},
    {year:2015,q:"OBSEQUIOUS means:",opts:["A. Arrogant","B. Excessively eager to serve or please","C. Very lazy","D. Extremely honest"],ans:"B",exp:"OBSEQUIOUS = showing excessive eagerness to serve or please others; servile."},
    {year:2015,q:"Choose the word that collocates correctly with 'DO'.",opts:["A. Do a mistake","B. Do an effort","C. Do your homework","D. Do a suggestion"],ans:"C",exp:"Correct: 'do your homework'. We 'make' a mistake, 'make' an effort, 'make' a suggestion."},
    {year:2015,q:"LOQUACIOUS means:",opts:["A. Very quiet","B. Tending to talk a great deal","C. Very intelligent","D. Very slow"],ans:"B",exp:"LOQUACIOUS = tending to talk a great deal; talkative. From Latin 'loqui' (to speak)."},
    {year:2015,q:"A word used to modify an adjective or another adverb is a(n):",opts:["A. Adjective","B. Preposition","C. Adverb","D. Conjunction"],ans:"C",exp:"Adverbs modify verbs, adjectives, AND other adverbs. 'She runs very fast' — 'very' modifies 'fast'."},
    {year:2015,q:"Choose the grammatically correct sentence.",opts:["A. Myself and John went to the market.","B. John and I went to the market.","C. John and myself went to the market.","D. Me and John went to the market."],ans:"B",exp:"'John and I' is correct — 'I' is the subject pronoun. Test: remove 'John and' — 'I went' is correct."},
  ],
  mathematics:[
    {year:2024,q:"If log₂ x = 5, find x.",opts:["A. 10","B. 25","C. 32","D. 64"],ans:"C",exp:"log₂ x = 5 means 2⁵ = x. 2⁵ = 32."},
    {year:2024,q:"5th term of an AP is 17 and 9th term is 33. Find the common difference.",opts:["A. 2","B. 3","C. 4","D. 5"],ans:"C",exp:"a+4d=17, a+8d=33. Subtract: 4d=16, d=4."},
    {year:2024,q:"Evaluate: ∫(3x² + 2x) dx",opts:["A. x³ + x² + C","B. 6x + 2 + C","C. x³ + x + C","D. 3x³ + x² + C"],ans:"A",exp:"∫3x² dx = x³, ∫2x dx = x². Answer: x³ + x² + C."},
    {year:2024,q:"Bag: 3 red and 5 blue balls. Two drawn without replacement. P(both red)?",opts:["A. 9/64","B. 3/28","C. 1/8","D. 9/56"],ans:"B",exp:"P = (3/8)×(2/7) = 6/56 = 3/28."},
    {year:2024,q:"Derivative of y = 5x³ − 3x + 7:",opts:["A. 15x² − 3","B. 15x² + 3","C. 5x² − 3","D. 15x − 3"],ans:"A",exp:"dy/dx = 15x² − 3. Constant 7 differentiates to 0."},
    {year:2023,q:"Quadratic equation with roots 2 and −3:",opts:["A. x² + x − 6 = 0","B. x² − x + 6 = 0","C. x² − x − 6 = 0","D. x² + x + 6 = 0"],ans:"A",exp:"Sum=−1, Product=−6. x² − (sum)x + product → x² + x − 6 = 0."},
    {year:2023,q:"Simplify: sin²θ + cos²θ",opts:["A. 0","B. 2","C. 1","D. tanθ"],ans:"C",exp:"Fundamental trig identity: sin²θ + cos²θ = 1."},
    {year:2023,q:"Mean of 6 numbers is 8. What is their sum?",opts:["A. 42","B. 48","C. 54","D. 56"],ans:"B",exp:"Sum = mean × count = 8 × 6 = 48."},
    {year:2023,q:"Gradient perpendicular to y = 3x + 5:",opts:["A. 3","B. −3","C. 1/3","D. −1/3"],ans:"D",exp:"Perpendicular gradients multiply to −1. m₂ = −1/3."},
    {year:2023,q:"Solve: x² − x − 12 = 0",opts:["A. x=3 or x=−4","B. x=4 or x=−3","C. x=2 or x=−6","D. x=6 or x=−2"],ans:"B",exp:"(x−4)(x+3) = 0. x = 4 or x = −3."},
    {year:2022,q:"Find the value of ⁵C₃.",opts:["A. 8","B. 10","C. 15","D. 20"],ans:"B",exp:"⁵C₃ = 5!/(3!×2!) = 10."},
    {year:2022,q:"y ∝ x², y=12 when x=2. Find y when x=3.",opts:["A. 18","B. 24","C. 27","D. 36"],ans:"C",exp:"y = kx². k=3. When x=3: y=3×9=27."},
    {year:2022,q:"Evaluate: lim(x→2) (x²−4)/(x−2)",opts:["A. 0","B. 2","C. 4","D. undefined"],ans:"C",exp:"Factor: (x+2)(x−2)/(x−2) = x+2. At x=2: 4."},
    {year:2022,q:"GP: first term 3, ratio 2. Find 6th term.",opts:["A. 48","B. 96","C. 64","D. 192"],ans:"B",exp:"6th term = 3 × 2⁵ = 96."},
    {year:2022,q:"Area under y = x² between x=0 and x=3:",opts:["A. 6","B. 8","C. 9","D. 12"],ans:"C",exp:"∫₀³ x² dx = [x³/3]₀³ = 9."},
    {year:2021,q:"Solve: x+y=5, x−y=1",opts:["A. x=2,y=3","B. x=3,y=2","C. x=4,y=1","D. x=1,y=4"],ans:"B",exp:"Add: 2x=6, x=3. Substitute: y=2."},
    {year:2021,q:"The perpendicular bisector of a chord passes through the:",opts:["A. Tangent","B. Circumference","C. Centre","D. Radius"],ans:"C",exp:"Perpendicular bisector of any chord always passes through the centre."},
    {year:2021,q:"Coefficient of x² in (1+x)⁵:",opts:["A. 5","B. 10","C. 15","D. 20"],ans:"B",exp:"⁵C₂ = 10."},
    {year:2021,q:"Convert 2π/3 radians to degrees.",opts:["A. 60°","B. 90°","C. 120°","D. 150°"],ans:"C",exp:"(2π/3) × (180/π) = 120°."},
    {year:2021,q:"Range of f(x)=x²+1 for x∈{−1,0,1,2}:",opts:["A. {1,2}","B. {1,2,5}","C. {0,1,2,5}","D. {1,2,3,5}"],ans:"B",exp:"f(−1)=2, f(0)=1, f(1)=2, f(2)=5. Unique values: {1,2,5}."},
    {year:2020,q:"Inverse of f(x) = 2x + 3:",opts:["A. f⁻¹(x)=(x−3)/2","B. f⁻¹(x)=(x+3)/2","C. f⁻¹(x)=2x−3","D. f⁻¹(x)=x/2−3"],ans:"A",exp:"Swap x,y: x=2y+3. Solve: y=(x−3)/2."},
    {year:2020,q:"Angle of elevation of tower from 50m away is 30°. Height?",opts:["A. 25m","B. 50/√3 m","C. 25√3 m","D. 50√3 m"],ans:"B",exp:"tan30°=h/50. h=50×(1/√3)=50/√3 m."},
    {year:2020,q:"d/dx(sin x) at x=π/2:",opts:["A. 1","B. 0","C. −1","D. π/2"],ans:"B",exp:"d/dx(sin x)=cos x. cos(π/2)=0."},
    {year:2020,q:"P(A)=0.4, P(B)=0.3, independent. P(A∩B)=?",opts:["A. 0.12","B. 0.58","C. 0.70","D. 0.10"],ans:"A",exp:"P(A∩B)=P(A)×P(B)=0.4×0.3=0.12."},
    {year:2020,q:"Which of the following defines a function?",opts:["A. {(1,2),(1,3),(2,4)}","B. {(1,2),(2,3),(3,4)}","C. {(1,1),(2,2),(1,3)}","D. {(2,1),(3,1),(2,3)}"],ans:"B",exp:"Every x must map to exactly one y. B: 1→2, 2→3, 3→4. ✓"},
    {year:2019,q:"Simplify: (cos²θ − sin²θ)/(cosθ − sinθ)",opts:["A. cosθ−sinθ","B. cosθ+sinθ","C. 1","D. tanθ"],ans:"B",exp:"Factor numerator: (cosθ+sinθ)(cosθ−sinθ). Cancel denominator = cosθ+sinθ."},
    {year:2019,q:"Sum of first 10 terms of AP: 3,7,11,15...",opts:["A. 210","B. 180","C. 150","D. 230"],ans:"A",exp:"S₁₀=10/2[2(3)+9(4)]=5×42=210."},
    {year:2019,q:"If 2x+1>7, range of x:",opts:["A. x>2","B. x>3","C. x<3","D. x≥3"],ans:"B",exp:"2x>6 → x>3."},
    {year:2019,q:"Determinant of [[3,2],[1,4]]:",opts:["A. 8","B. 10","C. 14","D. 12"],ans:"B",exp:"(3×4)−(2×1)=12−2=10."},
    {year:2019,q:"Circle centre (2,−1) radius 3:",opts:["A. (x−2)²+(y+1)²=9","B. (x+2)²+(y−1)²=9","C. (x−2)²+(y−1)²=9","D. (x+2)²+(y+1)²=9"],ans:"A",exp:"(x−h)²+(y−k)²=r². h=2,k=−1,r=3."},
    {year:2018,q:"Roots of 2x²−5x+3=0. Find α+β.",opts:["A. 5/2","B. 3/2","C. −5/2","D. 5/3"],ans:"A",exp:"Sum of roots=−b/a=5/2."},
    {year:2018,q:"Differentiate y=(2x+3)⁴.",opts:["A. 4(2x+3)³","B. 8(2x+3)³","C. 4(2x+3)⁴","D. 2(2x+3)³"],ans:"B",exp:"Chain rule: 4(2x+3)³×2=8(2x+3)³."},
    {year:2018,q:"Find sin 315°.",opts:["A. √2/2","B. −√2/2","C. √3/2","D. −1/2"],ans:"B",exp:"315°=360°−45°. 4th quadrant, sin negative. −sin45°=−√2/2."},
    {year:2018,q:"Evaluate log 0.001.",opts:["A. 2","B. −2","C. 3","D. −3"],ans:"D",exp:"0.001=10⁻³. log(10⁻³)=−3."},
    {year:2018,q:"Variance of 3,5,7,9,11:",opts:["A. 4","B. 8","C. 6","D. 10"],ans:"B",exp:"Mean=7. Squared deviations: 16,4,0,4,16. Variance=40/5=8."},
    {year:2017,q:"f(x)=x², g(x)=x+1. Find f(g(2)).",opts:["A. 5","B. 9","C. 4","D. 6"],ans:"B",exp:"g(2)=3. f(3)=9."},
    {year:2017,q:"Solve: |x−3|≤5",opts:["A. −2≤x≤8","B. x≤8","C. −8≤x≤2","D. −2≤x≤5"],ans:"A",exp:"−5≤x−3≤5. Add 3: −2≤x≤8."},
    {year:2017,q:"Area of triangle (0,0),(4,0),(0,3):",opts:["A. 4","B. 6","C. 8","D. 12"],ans:"B",exp:"Area=½|0+12+0|=6."},
    {year:2017,q:"Sum to infinity: GP first term 4, ratio 1/2.",opts:["A. 6","B. 8","C. 10","D. 12"],ans:"B",exp:"S∞=a/(1−r)=4/(1/2)=8."},
    {year:2017,q:"tanθ=3/4, θ acute. Find sinθ.",opts:["A. 3/5","B. 4/5","C. 3/4","D. 4/3"],ans:"A",exp:"Hyp=5. sinθ=3/5."},
    {year:2016,q:"Ways of arranging 5 people in a row:",opts:["A. 25","B. 60","C. 120","D. 240"],ans:"C",exp:"5!=120."},
    {year:2016,q:"P=[[1,2],[3,4]], Q=[[2,0],[1,3]]. Find PQ.",opts:["A. [[4,6],[10,12]]","B. [[2,0],[3,12]]","C. [[3,6],[10,12]]","D. [[2,4],[6,8]]"],ans:"A",exp:"[[1×2+2×1, 1×0+2×3],[3×2+4×1, 3×0+4×3]]=[[4,6],[10,12]]."},
    {year:2016,q:"Standard deviation of 2,4,6,8,10:",opts:["A. 2","B. 2√2","C. 4","D. √8"],ans:"B",exp:"Mean=6. Variance=8. SD=2√2."},
    {year:2015,q:"Locus of points equidistant from (2,0) and (−2,0):",opts:["A. y=0","B. x=0","C. x=2","D. y=2"],ans:"B",exp:"Perpendicular bisector of that segment = the y-axis, x=0."},
    {year:2015,q:"Evaluate: Σ(r=1 to 5) r²",opts:["A. 45","B. 55","C. 65","D. 35"],ans:"B",exp:"1+4+9+16+25=55."},
    {year:2015,q:"dy/dx if y=ln(3x):",opts:["A. 3/x","B. 1/x","C. 1/(3x)","D. 3ln(x)"],ans:"B",exp:"y=ln3+lnx. dy/dx=1/x."},
    {year:2015,q:"P(A hits)=2/3, P(B hits)=3/4. P(both hit)?",opts:["A. 1/2","B. 5/12","C. 1/4","D. 5/6"],ans:"A",exp:"(2/3)×(3/4)=1/2."},
    {year:2015,q:"For x²−px+q=0, roots α,β. αβ equals:",opts:["A. −p","B. p","C. q","D. −q"],ans:"C",exp:"Product of roots = q."},
  ],
  biology:[
    {year:2024,q:"The organelle that produces energy in a cell is the:",opts:["A. Nucleus","B. Ribosome","C. Mitochondria","D. Golgi apparatus"],ans:"C",exp:"Mitochondria is the 'powerhouse of the cell', producing ATP through cellular respiration."},
    {year:2024,q:"Which blood group is the universal donor?",opts:["A. AB","B. B","C. A","D. O"],ans:"D",exp:"Blood group O lacks A and B antigens and can be donated to any blood type."},
    {year:2023,q:"Plants making food using sunlight is called:",opts:["A. Respiration","B. Transpiration","C. Photosynthesis","D. Osmosis"],ans:"C",exp:"Photosynthesis uses sunlight, water, and CO₂ to produce glucose and oxygen."},
    {year:2023,q:"The part of the brain controlling balance is the:",opts:["A. Cerebrum","B. Medulla oblongata","C. Cerebellum","D. Hypothalamus"],ans:"C",exp:"The cerebellum controls coordination, balance, and fine motor movements."},
    {year:2022,q:"Movement of water through a semi-permeable membrane from high to low water potential is:",opts:["A. Diffusion","B. Active transport","C. Osmosis","D. Plasmolysis"],ans:"C",exp:"Osmosis: specific movement of water molecules through a semi-permeable membrane."},
    {year:2022,q:"Which is NOT a function of the liver?",opts:["A. Detoxification","B. Bile production","C. Insulin production","D. Glycogen storage"],ans:"C",exp:"Insulin is produced by the pancreas, not the liver."},
    {year:2021,q:"DNA replication occurs during which phase?",opts:["A. G1","B. S phase","C. G2","D. M phase"],ans:"B",exp:"DNA replication occurs during the S (Synthesis) phase of interphase."},
    {year:2021,q:"The basic unit of classification in taxonomy is the:",opts:["A. Family","B. Genus","C. Order","D. Species"],ans:"D",exp:"Species is the lowest unit of biological classification."},
    {year:2020,q:"Which carries oxygen from lungs to body tissues?",opts:["A. White blood cells","B. Platelets","C. Plasma","D. Red blood cells"],ans:"D",exp:"Red blood cells contain haemoglobin which binds and carries oxygen."},
    {year:2020,q:"The hormone that regulates blood sugar levels is:",opts:["A. Adrenaline","B. Oestrogen","C. Insulin","D. Thyroxine"],ans:"C",exp:"Insulin (produced by the pancreas) lowers blood glucose levels."},
    {year:2019,q:"Which is a vestigial organ in humans?",opts:["A. Appendix","B. Kidney","C. Spleen","D. Pancreas"],ans:"A",exp:"The appendix is vestigial — reduced in function in modern humans."},
    {year:2019,q:"Breaking down glucose without oxygen is called:",opts:["A. Aerobic respiration","B. Anaerobic respiration","C. Photosynthesis","D. Transpiration"],ans:"B",exp:"Anaerobic respiration: no oxygen, produces lactic acid (animals) or ethanol/CO₂ (yeast)."},
    {year:2018,q:"Chlorophyll is found in:",opts:["A. Mitochondria","B. Chloroplasts","C. Vacuoles","D. Nucleus"],ans:"B",exp:"Chlorophyll is in chloroplasts — it absorbs light energy for photosynthesis."},
    {year:2018,q:"Genetic material in a cell is stored in the:",opts:["A. Cell membrane","B. Cytoplasm","C. Nucleus","D. Ribosome"],ans:"C",exp:"The nucleus contains DNA — the genetic material of the cell."},
    {year:2017,q:"Which part of a flower produces pollen grains?",opts:["A. Pistil","B. Sepal","C. Anther","D. Stigma"],ans:"C",exp:"The anther (part of the male stamen) produces pollen grains."},
    {year:2017,q:"Evolution by natural selection was proposed by:",opts:["A. Gregor Mendel","B. Louis Pasteur","C. Charles Darwin","D. Robert Hooke"],ans:"C",exp:"Charles Darwin proposed evolution by natural selection in 'On the Origin of Species' (1859)."},
    {year:2016,q:"Which type of nutrition do fungi use?",opts:["A. Autotrophic","B. Holozoic","C. Saprophytic","D. Parasitic"],ans:"C",exp:"Fungi are saprophytes — they absorb nutrients from dead and decaying organic matter."},
    {year:2016,q:"The liquid part of blood is called:",opts:["A. Serum","B. Plasma","C. Lymph","D. Haemoglobin"],ans:"B",exp:"Plasma is the yellow liquid component of blood (~55% of volume)."},
    {year:2015,q:"Which organelle is the 'control centre' of the cell?",opts:["A. Mitochondria","B. Ribosome","C. Nucleus","D. Golgi body"],ans:"C",exp:"The nucleus contains DNA and directs all cellular activities."},
    {year:2015,q:"The study of heredity and variation is called:",opts:["A. Ecology","B. Genetics","C. Taxonomy","D. Physiology"],ans:"B",exp:"Genetics is the branch of biology concerned with heredity and variation."},
  ],
  chemistry:[
    {year:2024,q:"Which of the following is a noble gas?",opts:["A. Nitrogen","B. Oxygen","C. Argon","D. Chlorine"],ans:"C",exp:"Noble gases (Group 18): He, Ne, Ar, Kr, Xe, Rn — unreactive due to full outer shells."},
    {year:2024,q:"Atomic number represents the number of:",opts:["A. Neutrons","B. Protons","C. Electrons and neutrons","D. Nucleons"],ans:"B",exp:"Atomic number = number of protons in the nucleus."},
    {year:2023,q:"What type of bond is formed in NaCl?",opts:["A. Covalent","B. Ionic","C. Metallic","D. Hydrogen"],ans:"B",exp:"Na transfers an electron to Cl. The Na⁺···Cl⁻ electrostatic attraction is an ionic bond."},
    {year:2023,q:"Which is an indicator a chemical reaction has occurred?",opts:["A. Change in shape","B. Change in colour","C. Change in size","D. Change in position"],ans:"B",exp:"Signs of reaction: colour change, gas production, precipitate, temperature change."},
    {year:2022,q:"pH of a neutral solution is:",opts:["A. 0","B. 7","C. 14","D. 1"],ans:"B",exp:"pH 7 = neutral. pH<7 = acidic. pH>7 = basic."},
    {year:2022,q:"Rusting of iron is an example of:",opts:["A. Physical change","B. Chemical change","C. Nuclear change","D. Reversible change"],ans:"B",exp:"Rusting forms a new substance (iron oxide) — a chemical change."},
    {year:2021,q:"Gas produced when acid reacts with carbonate:",opts:["A. Hydrogen","B. Oxygen","C. Carbon dioxide","D. Nitrogen"],ans:"C",exp:"Acid + Carbonate → Salt + Water + CO₂."},
    {year:2021,q:"IUPAC name for CH₃CH₂OH:",opts:["A. Methanol","B. Ethanol","C. Propanol","D. Butanol"],ans:"B",exp:"2 carbons = eth-. Hydroxyl group = -ol. IUPAC name: ethanol."},
    {year:2020,q:"Avogadro's number is approximately:",opts:["A. 6.02×10²⁰","B. 6.02×10²²","C. 6.02×10²³","D. 6.02×10²⁴"],ans:"C",exp:"Nₐ = 6.02×10²³ particles per mole."},
    {year:2020,q:"Which is the most reactive metal?",opts:["A. Gold","B. Iron","C. Sodium","D. Copper"],ans:"C",exp:"Sodium is far more reactive than iron, copper, and gold in the reactivity series."},
    {year:2019,q:"Electrolysis of dilute H₂SO₄ — gas at cathode?",opts:["A. Oxygen","B. Sulphur dioxide","C. Hydrogen","D. Carbon dioxide"],ans:"C",exp:"At cathode (−): H⁺ ions gain electrons → H₂ gas."},
    {year:2019,q:"Which of the following is a mixture?",opts:["A. Water","B. Salt","C. Air","D. Carbon dioxide"],ans:"C",exp:"Air is a mixture: N₂ (~78%), O₂ (~21%), Ar, CO₂, etc."},
    {year:2018,q:"Converting liquid to gas by heating is called:",opts:["A. Condensation","B. Sublimation","C. Evaporation","D. Solidification"],ans:"C",exp:"Evaporation: liquid → gas at the surface, below boiling point."},
    {year:2018,q:"Carbon (atomic no. 6) — electrons in outermost shell:",opts:["A. 2","B. 4","C. 6","D. 3"],ans:"B",exp:"Carbon electron config: 2,4. Outermost shell has 4 electrons."},
    {year:2017,q:"Which metal is liquid at room temperature?",opts:["A. Sodium","B. Aluminium","C. Mercury","D. Lead"],ans:"C",exp:"Mercury (Hg) is the only metal liquid at room temperature (m.p. = −38.8°C)."},
    {year:2017,q:"Chemical formula of water:",opts:["A. H₂O₂","B. HO","C. H₂O","D. H₃O"],ans:"C",exp:"Water: two hydrogen atoms bonded to one oxygen atom = H₂O."},
    {year:2016,q:"General formula for alkanes:",opts:["A. CₙH₂ₙ","B. CₙH₂ₙ₊₂","C. CₙH₂ₙ₋₂","D. CₙHₙ"],ans:"B",exp:"Alkanes (saturated): CₙH₂ₙ₊₂. Methane CH₄ (n=1), ethane C₂H₆ (n=2)."},
    {year:2016,q:"Which is an example of a physical change?",opts:["A. Burning wood","B. Rusting iron","C. Melting ice","D. Cooking food"],ans:"C",exp:"Melting ice: state changes but chemical formula (H₂O) is unchanged — physical change."},
    {year:2015,q:"Solid changing directly to gas (no liquid stage) is:",opts:["A. Evaporation","B. Sublimation","C. Condensation","D. Deposition"],ans:"B",exp:"Sublimation: solid → gas directly. Examples: dry ice, iodine, naphthalene."},
    {year:2015,q:"Atoms in one molecule of glucose C₆H₁₂O₆:",opts:["A. 18","B. 24","C. 20","D. 12"],ans:"B",exp:"6C + 12H + 6O = 24 atoms total."},
  ],
  physics:[
    {year:2024,q:"The SI unit of force is:",opts:["A. Joule","B. Watt","C. Newton","D. Pascal"],ans:"C",exp:"The Newton (N) = 1 kg·m/s². Named after Isaac Newton."},
    {year:2024,q:"A body in equilibrium has a net force of:",opts:["A. Maximum","B. Constant","C. Zero","D. Minimum"],ans:"C",exp:"For equilibrium: net force = zero AND net torque = zero."},
    {year:2023,q:"Speed of light in vacuum is approximately:",opts:["A. 3×10⁶ m/s","B. 3×10⁸ m/s","C. 3×10⁵ m/s","D. 3×10¹⁰ m/s"],ans:"B",exp:"c = 3×10⁸ m/s ≈ 300,000 km/s."},
    {year:2023,q:"Ohm's Law states that:",opts:["A. V=IR²","B. V=I/R","C. V=IR","D. V=I+R"],ans:"C",exp:"V = IR (voltage = current × resistance)."},
    {year:2022,q:"Car rear-view mirrors use which type of mirror?",opts:["A. Concave","B. Plane","C. Convex","D. Parabolic"],ans:"C",exp:"Convex mirrors give a wider field of view — ideal for rear-view mirrors."},
    {year:2022,q:"Unit of electrical power:",opts:["A. Volt","B. Ampere","C. Ohm","D. Watt"],ans:"D",exp:"The Watt (W) is the SI unit of power. P=IV=I²R=V²/R."},
    {year:2021,q:"Sound cannot travel through:",opts:["A. Water","B. Steel","C. Vacuum","D. Air"],ans:"C",exp:"Sound is mechanical — it needs a medium. Cannot travel through vacuum."},
    {year:2021,q:"A step-up transformer: secondary coil has:",opts:["A. Fewer turns","B. More turns","C. Equal turns","D. No turns"],ans:"B",exp:"Vs/Vp = Ns/Np. For voltage increase: more turns in secondary."},
    {year:2020,q:"Light bending when passing between media is called:",opts:["A. Reflection","B. Diffraction","C. Refraction","D. Dispersion"],ans:"C",exp:"Refraction: bending of light due to change in speed. Governed by Snell's Law."},
    {year:2020,q:"Which is a scalar quantity?",opts:["A. Velocity","B. Force","C. Speed","D. Displacement"],ans:"C",exp:"Speed has magnitude only (scalar). Velocity, force, displacement have direction (vectors)."},
    {year:2019,q:"Half-life is the time for:",opts:["A. All atoms to decay","B. Half the atoms to decay","C. Twice the atoms to decay","D. 25% to decay"],ans:"B",exp:"Half-life = time for exactly half of radioactive atoms to decay."},
    {year:2019,q:"Newton's Second Law states:",opts:["A. Every action has equal reaction","B. Body at rest stays at rest","C. Force equals mass times acceleration","D. Energy is conserved"],ans:"C",exp:"F = ma. Force equals mass times acceleration."},
    {year:2018,q:"Energy stored in a stretched rubber band is:",opts:["A. Kinetic","B. Chemical","C. Elastic potential","D. Nuclear"],ans:"C",exp:"Elastic potential energy is stored when objects are elastically deformed."},
    {year:2018,q:"Colour with highest frequency in visible spectrum:",opts:["A. Red","B. Green","C. Yellow","D. Violet"],ans:"D",exp:"ROYGBIV: Violet has highest frequency (shortest wavelength). Red has lowest."},
    {year:2017,q:"Law stating energy cannot be created or destroyed:",opts:["A. Newton's First Law","B. Law of Conservation of Energy","C. Ohm's Law","D. Archimedes' Principle"],ans:"B",exp:"Conservation of Energy: energy transforms but is never created or destroyed."},
    {year:2017,q:"A horizontally thrown body follows a:",opts:["A. Straight line","B. Circle","C. Parabola","D. Ellipse"],ans:"C",exp:"Projectile motion: constant horizontal velocity + gravity = parabolic path."},
    {year:2016,q:"Pressure at bottom of a liquid depends on:",opts:["A. Surface area","B. Volume","C. Depth and density","D. Shape of container"],ans:"C",exp:"P = ρgh. Depends only on density (ρ) and depth (h)."},
    {year:2016,q:"Mass 5kg on earth (g=10 m/s²). Weight =",opts:["A. 5N","B. 2N","C. 50N","D. 0.5N"],ans:"C",exp:"Weight = mg = 5×10 = 50N."},
    {year:2015,q:"Which is NOT an electromagnetic wave?",opts:["A. X-rays","B. Radio waves","C. Sound waves","D. Gamma rays"],ans:"C",exp:"Sound is mechanical (needs a medium). X-rays, radio, gamma are electromagnetic."},
    {year:2015,q:"Turning effect of a force about a pivot is called:",opts:["A. Pressure","B. Moment","C. Impulse","D. Work"],ans:"B",exp:"Moment = Force × perpendicular distance from pivot."},
  ],
  economics:[
    {year:2024,q:"Law of demand: as price rises, demand:",opts:["A. Also rises","B. Falls","C. Stays constant","D. Is unrelated"],ans:"B",exp:"Law of Demand: inverse relationship — price up, quantity demanded down."},
    {year:2024,q:"Which is NOT a factor of production?",opts:["A. Land","B. Labour","C. Money","D. Capital"],ans:"C",exp:"Factors of production: Land, Labour, Capital, Entrepreneur. Money is a medium of exchange."},
    {year:2023,q:"GDP stands for:",opts:["A. Gross Domestic Product","B. General Development Plan","C. Gross Development Plan","D. General Domestic Product"],ans:"A",exp:"GDP = total monetary value of goods and services produced within a country."},
    {year:2023,q:"Inflation means:",opts:["A. Fall in price level","B. Rise in price level","C. Constant price level","D. Rise in employment"],ans:"B",exp:"Inflation = sustained rise in the general price level."},
    {year:2022,q:"A monopoly has:",opts:["A. Many sellers","B. A few large sellers","C. A single seller","D. Two sellers"],ans:"C",exp:"Monopoly: single seller, no close substitutes, significant price control."},
    {year:2022,q:"Opportunity cost is:",opts:["A. Money paid for a product","B. The next best alternative forgone","C. Total cost of production","D. Profit from a sale"],ans:"B",exp:"Opportunity cost = value of the next best alternative given up."},
    {year:2021,q:"When supply exceeds demand, there is a market:",opts:["A. Shortage","B. Equilibrium","C. Surplus","D. Deficit"],ans:"C",exp:"Supply > demand = surplus. Price typically falls to reach equilibrium."},
    {year:2021,q:"The CBN is responsible for:",opts:["A. Collecting taxes","B. Building roads","C. Controlling monetary policy","D. Paying civil servants"],ans:"C",exp:"CBN controls monetary policy — money supply, interest rates, and banking system."},
    {year:2020,q:"An example of a public good is:",opts:["A. A private school","B. A supermarket","C. Street lighting","D. A hotel"],ans:"C",exp:"Public goods are non-excludable and non-rival — street lighting is freely available to all."},
    {year:2020,q:"Division of labour means:",opts:["A. Splitting workers by gender","B. Breaking work into specialised tasks","C. Sharing profits equally","D. Employing part-time workers"],ans:"B",exp:"Division of labour: breaking production into specialised tasks — increases efficiency."},
    {year:2019,q:"Demand elasticity for necessities is typically:",opts:["A. Highly elastic","B. Perfectly elastic","C. Inelastic","D. Unit elastic"],ans:"C",exp:"Necessities: quantity demanded changes little when price changes = inelastic."},
    {year:2019,q:"Barter system failed mainly due to:",opts:["A. Lack of goods","B. Double coincidence of wants","C. Too many goods","D. Low prices"],ans:"B",exp:"Barter required both parties to want exactly what the other has — very hard to achieve."},
    {year:2018,q:"If fall in price of one good causes fall in demand for another, they are:",opts:["A. Substitutes","B. Complements","C. Inferior goods","D. Normal goods"],ans:"B",exp:"Complementary goods are used together — fall in price of one raises demand for both."},
    {year:2018,q:"The PPC illustrates:",opts:["A. Maximum output combinations with given resources","B. Total national income","C. Population growth","D. Import and export values"],ans:"A",exp:"PPC shows all output combinations producible with full employment of current resources."},
    {year:2017,q:"Which is a merit good?",opts:["A. Cigarettes","B. Education","C. Alcohol","D. Gambling"],ans:"B",exp:"Merit goods (education, healthcare) benefit society — often subsidised by government."},
    {year:2017,q:"When income rises for a normal good, the demand curve:",opts:["A. Shifts left","B. Shifts right","C. Becomes steeper","D. Unchanged"],ans:"B",exp:"More income = more demand for normal goods = demand curve shifts right."},
    {year:2016,q:"'Laissez-faire' in economics means:",opts:["A. Government controls all production","B. Market forces determine activity","C. Equal income distribution","D. Planned economy"],ans:"B",exp:"Laissez-faire: minimum government intervention; markets determine outcomes freely."},
    {year:2016,q:"Unemployment caused by seasonal variation is:",opts:["A. Structural","B. Frictional","C. Cyclical","D. Seasonal"],ans:"D",exp:"Seasonal unemployment: workers laid off in off-peak seasons — farming, tourism, etc."},
    {year:2015,q:"The primary sector involves:",opts:["A. Manufacturing","B. Services","C. Extraction of natural resources","D. Finance"],ans:"C",exp:"Primary sector: agriculture, mining, fishing, forestry."},
    {year:2015,q:"Increase in money supply tends to:",opts:["A. Reduce inflation","B. Cause deflation","C. Cause inflation","D. Have no effect"],ans:"C",exp:"More money chasing fewer goods → inflation (quantity theory of money)."},
  ],
  government:[
    {year:2024,q:"Nigeria's current constitution was promulgated in:",opts:["A. 1999","B. 1979","C. 1960","D. 1963"],ans:"A",exp:"Nigeria's 1999 Constitution was promulgated on May 29, 1999 at the return of democracy."},
    {year:2024,q:"Separation of powers was propounded by:",opts:["A. John Locke","B. Karl Marx","C. Montesquieu","D. Jean-Jacques Rousseau"],ans:"C",exp:"Montesquieu developed separation of powers in 'The Spirit of the Laws' (1748)."},
    {year:2023,q:"ECOWAS was established in:",opts:["A. 1960","B. 1975","C. 1980","D. 1985"],ans:"B",exp:"ECOWAS established May 28, 1975 in Lagos through the Treaty of Lagos."},
    {year:2023,q:"Which arm of government interprets laws in Nigeria?",opts:["A. Executive","B. Legislature","C. Judiciary","D. Civil Service"],ans:"C",exp:"Judiciary interprets laws. Legislature makes laws. Executive implements laws."},
    {year:2022,q:"In a federal system, power is:",opts:["A. Concentrated at the centre","B. Shared between central and regional governments","C. Held by the military","D. In a single government"],ans:"B",exp:"Federalism: constitutional division of powers between central and state governments."},
    {year:2022,q:"Citizenship can be acquired by:",opts:["A. Birth, registration, and naturalisation","B. Education only","C. Military service only","D. Presidential appointment"],ans:"A",exp:"Citizenship: birth, registration (spouses/minors), and naturalisation."},
    {year:2021,q:"The principle that no one is above the law is:",opts:["A. Separation of powers","B. Rule of law","C. Federalism","D. Constitutionalism"],ans:"B",exp:"Rule of law: all persons accountable to laws that are publicly promulgated and equally enforced."},
    {year:2021,q:"Which is a fundamental right in Nigeria's constitution?",opts:["A. Right to wealth","B. Right to employment","C. Right to life","D. Right to free housing"],ans:"C",exp:"Section 33 of the 1999 Constitution guarantees the right to life."},
    {year:2020,q:"The Nigerian Senate has how many senators?",opts:["A. 109","B. 120","C. 360","D. 96"],ans:"A",exp:"109 senators: 3 per state × 36 states + 1 FCT senator."},
    {year:2020,q:"The United Nations was established in:",opts:["A. 1919","B. 1939","C. 1945","D. 1950"],ans:"C",exp:"UN established October 24, 1945, replacing the League of Nations."},
    {year:2019,q:"A referendum is a type of:",opts:["A. Presidential election","B. Direct democracy","C. Parliamentary vote","D. Local government election"],ans:"B",exp:"Referendum: citizens vote directly on a specific question — direct democracy."},
    {year:2019,q:"Checks and balances ensure that:",opts:["A. Taxes are collected","B. No arm of government becomes too powerful","C. The army obeys the president","D. Citizens pay taxes"],ans:"B",exp:"Checks and balances prevents any one branch from abusing power."},
    {year:2018,q:"Head of government in a parliamentary system is the:",opts:["A. President","B. Prime Minister","C. King/Queen","D. Speaker"],ans:"B",exp:"In parliamentary systems, the Prime Minister leads the executive."},
    {year:2018,q:"Apartheid was racial segregation in:",opts:["A. Kenya","B. Zimbabwe","C. South Africa","D. Ghana"],ans:"C",exp:"Apartheid: institutionalised racial segregation in South Africa from 1948 to 1994."},
    {year:2017,q:"Nigerian House of Representatives has how many members?",opts:["A. 109","B. 240","C. 360","D. 400"],ans:"C",exp:"360 members, elected from constituencies across 36 states and FCT."},
    {year:2017,q:"The African Union replaced:",opts:["A. ECOWAS","B. OAU","C. UN","D. Commonwealth"],ans:"B",exp:"AU replaced the OAU (Organisation of African Unity) in 2002."},
    {year:2016,q:"State of emergency in Nigeria is declared by the:",opts:["A. National Assembly alone","B. President alone","C. President with National Assembly approval","D. Supreme Court"],ans:"C",exp:"Section 305: President declares, 2/3 of National Assembly must approve."},
    {year:2016,q:"Sovereignty means:",opts:["A. National wealth","B. Supreme power of a state","C. Country size","D. Population count"],ans:"B",exp:"Sovereignty: supreme, independent authority of a state to govern itself."},
    {year:2015,q:"The Cold War was mainly between:",opts:["A. USA and UK","B. USA and China","C. USA and USSR","D. USSR and UK"],ans:"C",exp:"Cold War (1947–1991): geopolitical tension between USA/NATO and USSR/Warsaw Pact."},
    {year:2015,q:"Local government is important primarily because it:",opts:["A. Controls the army","B. Brings government closer to the grassroots","C. Collects federal taxes","D. Appoints judges"],ans:"B",exp:"Local government delivers services to communities and enables grassroots participation."},
  ],
  literature:[
    {year:2024,q:"A soliloquy is when a character:",opts:["A. Talks to another character","B. Speaks to the audience","C. Speaks thoughts aloud when alone","D. Sings on stage"],ans:"C",exp:"Soliloquy: character speaks thoughts aloud, usually alone. E.g. Hamlet's 'To be or not to be'."},
    {year:2024,q:"The theme of a literary work is:",opts:["A. The setting","B. The central idea or message","C. The character list","D. The title"],ans:"B",exp:"Theme = the central idea or universal message conveyed by the author."},
    {year:2023,q:"A villain is a character who:",opts:["A. Helps the hero","B. Is the main character","C. Opposes the protagonist","D. Narrates the story"],ans:"C",exp:"A villain (antagonist) opposes the protagonist and creates conflict."},
    {year:2023,q:"Free verse poetry:",opts:["A. Has regular rhyme and metre","B. Has no rhyme or regular metre","C. Has only rhyme","D. Has only metre"],ans:"B",exp:"Free verse: no regular metre, rhyme scheme, or fixed line length."},
    {year:2022,q:"Dramatic irony occurs when:",opts:["A. A character says something funny","B. The audience knows something a character does not","C. Two characters disagree","D. The plot ends unexpectedly"],ans:"B",exp:"Dramatic irony: the audience has knowledge that a character lacks, creating tension."},
    {year:2022,q:"An epic is a:",opts:["A. Short lyric poem","B. Long narrative poem about heroic deeds","C. Type of drama","D. Prose narrative"],ans:"B",exp:"Epic: long narrative poem about heroic characters. E.g. Homer's Iliad and Odyssey."},
    {year:2021,q:"The turning point of a drama is the:",opts:["A. Exposition","B. Denouement","C. Climax","D. Falling action"],ans:"C",exp:"Climax = highest tension point and turning point in the drama."},
    {year:2021,q:"A protagonist is:",opts:["A. The narrator","B. The main character","C. The villain","D. A minor character"],ans:"B",exp:"The protagonist is the main character who drives the action and faces the central conflict."},
    {year:2020,q:"Prose is distinguished from poetry by:",opts:["A. Its use of rhyme","B. Its use of stanzas","C. Its written form without regular metre","D. Its use of imagery"],ans:"C",exp:"Prose: ordinary language without regular metre or forced line breaks."},
    {year:2020,q:"Author of 'Things Fall Apart':",opts:["A. Wole Soyinka","B. Chinua Achebe","C. Ngugi wa Thiong'o","D. Ben Okri"],ans:"B",exp:"Chinua Achebe wrote Things Fall Apart (1958), a foundational African novel."},
    {year:2019,q:"A metaphor makes a comparison:",opts:["A. Using 'like' or 'as'","B. Directly, without 'like' or 'as'","C. Using numbers","D. Through personification"],ans:"B",exp:"Metaphor: direct comparison — 'Life IS a journey'. Simile uses 'like/as'."},
    {year:2019,q:"Satire is used to:",opts:["A. Express deep love","B. Describe nature","C. Criticise society through humour","D. Tell a story"],ans:"C",exp:"Satire uses humour, irony, and exaggeration to expose and criticise human vices and society."},
    {year:2018,q:"A ballad is typically a:",opts:["A. Long epic poem","B. Narrative song or poem about folk heroes","C. Dramatic monologue","D. Sonnet form"],ans:"B",exp:"A ballad is a narrative poem or song — often about folk heroes, love, or tragedy."},
    {year:2018,q:"'Denouement' refers to:",opts:["A. The beginning of a story","B. The highest tension point","C. The final resolution of the plot","D. The introduction of characters"],ans:"C",exp:"Denouement = final resolution after the climax, where loose ends are tied up."},
    {year:2017,q:"Which is a Shakespearean comedy?",opts:["A. Hamlet","B. Macbeth","C. A Midsummer Night's Dream","D. Othello"],ans:"C",exp:"A Midsummer Night's Dream is a comedy. Hamlet, Macbeth, and Othello are tragedies."},
    {year:2017,q:"A haiku has:",opts:["A. 14 lines","B. 3 lines with 5-7-5 syllables","C. No fixed form","D. 8 lines"],ans:"B",exp:"Haiku: 3 lines (5-7-5 syllables = 17 total). Typically focuses on nature."},
    {year:2016,q:"An all-knowing third-person narrator is called:",opts:["A. First person","B. Second person","C. Third person limited","D. Omniscient narrator"],ans:"D",exp:"Omniscient narrator knows the thoughts and feelings of all characters."},
    {year:2016,q:"Alliteration is the repetition of:",opts:["A. End rhymes","B. Vowel sounds","C. Initial consonant sounds","D. Syllable patterns"],ans:"C",exp:"Alliteration: repetition of initial consonant sounds — 'Peter Piper picked...'"},
    {year:2015,q:"'Hamartia' refers to:",opts:["A. A happy ending","B. A character's fatal weakness leading to downfall","C. A type of poem","D. The villain"],ans:"B",exp:"Hamartia (Aristotle) = protagonist's fatal flaw. E.g. Macbeth's ambition, Hamlet's indecision."},
    {year:2015,q:"A sonnet has exactly:",opts:["A. 8 lines","B. 12 lines","C. 14 lines","D. 16 lines"],ans:"C",exp:"14 lines. Shakespearean: 3 quatrains + 1 couplet (ABAB CDCD EFEF GG)."},
  ],
};

/* ── 2. CONSTANTS & STATE ────────────────────────────────────────────── */
const LS_KEY = 'exambuddy_jamb_cbt_v4';
const SUBJ_META = [
  {key:'english',    label:'Use of English'},
  {key:'mathematics',label:'Mathematics'},
  {key:'biology',    label:'Biology'},
  {key:'chemistry',  label:'Chemistry'},
  {key:'physics',    label:'Physics'},
  {key:'economics',  label:'Economics'},
  {key:'government', label:'Government'},
  {key:'literature', label:'Literature'},
];

let S = null;          // session object
let _tid = null;       // timer interval id

const _save  = () => { try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch(e){} };
const _load  = () => { try { const r=localStorage.getItem(LS_KEY); if(r){S=JSON.parse(r);return true;} } catch(e){} return false; };
const _clear = () => { localStorage.removeItem(LS_KEY); S=null; };

/* ── 3. HIDE ORIGINAL PAGE CONTENT ──────────────────────────────────── */
/* We NEVER modify existing elements — only toggle their display */
const _HIDE_SELS = ['#nav-root','.breadcrumb','.page-hero','.section','#footer-root'];
const _hideOrig = () => _HIDE_SELS.forEach(s => { const e=document.querySelector(s); if(e) e.style.display='none'; });
const _showOrig = () => _HIDE_SELS.forEach(s => { const e=document.querySelector(s); if(e) e.style.display=''; });

/* ── 4. INJECT OVERLAY HTML ─────────────────────────────────────────── */
document.body.insertAdjacentHTML('beforeend', `

<!-- ======= SETUP SCREEN ======= -->
<div id="cbt-setup">
  <div class="sc-card">
    <div style="font-size:2rem;margin-bottom:10px">🎯</div>
    <h2>JAMB CBT Practice</h2>
    <p>Configure your session then press <strong>Start Exam</strong>.</p>

    <span class="sc-lbl">📚 Subjects — Use of English is compulsory; select up to 3 more</span>
    <div class="sc-subj-grid" id="sc-grid">
      ${SUBJ_META.map(s=>`
        <label class="sc-chip">
          <input type="checkbox" name="sc-s" value="${s.key}"${s.key==='english'?' checked disabled':''}>
          ${s.label}
        </label>`).join('')}
    </div>

    <span class="sc-lbl">📅 Year</span>
    <select class="sc-sel" id="sc-yr">
      <option value="all">All Years (2015 – 2024)</option>
      ${[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015].map(y=>`<option value="${y}">${y}</option>`).join('')}
    </select>

    <span class="sc-lbl">⏱ Duration (minutes)</span>
    <input type="number" class="sc-num" id="sc-dur" value="120" min="5" max="240">

    <button class="sc-go" onclick="cbtStart()">🚀 Start Exam</button>

    <div class="sc-resume" id="sc-resume">
      <p>⚡ You have an unfinished session saved.</p>
      <div class="sc-resume-row">
        <button class="sc-btn-yes" onclick="cbtResume()">Resume Exam</button>
        <button class="sc-btn-no"  onclick="cbtDiscard()">New Exam</button>
      </div>
    </div>
  </div>
</div>

<!-- ======= EXAM SCREEN ======= -->
<div id="cbt-exam">
  <div class="cbt-bar">
    <span class="cbt-bar-title">📋 JAMB CBT</span>
    <span class="cbt-bar-sub" id="cb-sub">—</span>
    <span class="cbt-bar-spacer"></span>
    <div class="cbt-clock" id="cb-clock">02:00:00</div>
    <button class="cbt-bar-submit" onclick="cbtConfirm()">Submit Exam</button>
  </div>
  <div class="cbt-body">

    <!-- Left: question + nav -->
    <div class="cbt-qpanel" id="cb-panel">
      <div class="cbt-prog-row">
        <h2 id="cb-title">Question</h2>
        <span class="cbt-prog-badge" id="cb-prog">1 / 20</span>
      </div>
      <div class="cbt-stats-row" id="cb-stats"></div>

      <!-- Question card rendered here — reuses existing CSS classes -->
      <div id="cb-qcard"></div>

      <div class="cbt-nav-row">
        <button class="cbt-nbtn" onclick="cbtPrev()">◀ Prev</button>
        <button class="cbt-nbtn" onclick="cbtNext()">Next ▶</button>
        <button class="cbt-nbtn" id="cb-flag" onclick="cbtFlag()">🚩 Mark for Review</button>
        <button class="cbt-nbtn primary" onclick="cbtConfirm()">Submit Exam</button>
      </div>
    </div>

    <!-- Right: subject tabs + palette -->
    <div class="cbt-sidebar">
      <div class="cbt-sb-sec">
        <div class="cbt-sb-head">Subjects</div>
        <div class="cbt-subtabs" id="cb-stabs"></div>
      </div>
      <div class="cbt-sb-sec">
        <div class="cbt-sb-head">Questions</div>
        <div class="cbt-palette" id="cb-palette"></div>
      </div>
      <div class="cbt-sb-sec">
        <div class="cbt-sb-head">Legend</div>
        <div class="cbt-legend-grid">
          <span class="leg-item"><span class="leg-dot" style="background:#fff;border:1.5px solid #cbd5e1"></span>Unanswered</span>
          <span class="leg-item"><span class="leg-dot" style="background:#059669"></span>Answered</span>
          <span class="leg-item"><span class="leg-dot" style="background:#FEF3C7;border:1.5px solid #D97706"></span>Flagged</span>
          <span class="leg-item"><span class="leg-dot" style="background:#0A2463"></span>Current</span>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- ======= RESULT SCREEN ======= -->
<div id="cbt-result">
  <div class="res-wrap">
    <div class="res-hero">
      <div style="font-size:1.9rem;margin-bottom:8px">🏆</div>
      <h2>Exam Complete</h2>
      <p>JAMB UTME CBT Practice · ExamBuddy Nigeria</p>
      <div class="res-big-score" id="rn-score">0/0</div>
      <div class="res-pct"       id="rn-pct">0%</div>
      <div                       id="rn-grade"></div>
    </div>
    <div class="res-card-row" id="rn-cards"></div>
    <div class="res-block">
      <p class="res-block-hd">Performance by Subject</p>
      <table class="res-tbl">
        <thead><tr><th>Subject</th><th>Qs</th><th>Correct</th><th>Wrong</th><th>Score %</th></tr></thead>
        <tbody id="rn-tbody"></tbody>
      </table>
    </div>
    <div class="res-actions">
      <button class="res-btn-p" onclick="document.getElementById('rn-rev').scrollIntoView({behavior:'smooth'})">📖 Review Answers</button>
      <button class="res-btn-o" onclick="cbtRetake()">🔄 Retake Exam</button>
      <button class="res-btn-g" onclick="location.href='past-questions.html'">🏠 Back to Hub</button>
    </div>
    <div class="res-block" id="rn-rev">
      <p class="res-block-hd">Full Answer Review</p>
      <div style="padding:14px" id="rn-rev-list"></div>
    </div>
  </div>
</div>

<!-- ======= SUBMIT MODAL ======= -->
<div class="cbt-overlay" id="cb-modal">
  <div class="cbt-modal">
    <h3>⚠️ Submit Exam?</h3>
    <p id="cb-modal-msg">Are you sure?</p>
    <div class="cbt-modal-info" id="cb-modal-info"></div>
    <div class="cbt-modal-btns">
      <button class="cbt-m-no"  onclick="cbtCloseModal()">Cancel — Keep Going</button>
      <button class="cbt-m-yes" onclick="cbtSubmit()">Yes, Submit Now</button>
    </div>
  </div>
</div>
`);

/* ── 5. SETUP SCREEN ─────────────────────────────────────────────────── */
function _initSetup() {
  // Enforce max 4 subjects (English always locked)
  document.querySelectorAll('input[name="sc-s"]').forEach(cb => {
    if (cb.disabled) return;
    cb.addEventListener('change', () => {
      if ([...document.querySelectorAll('input[name="sc-s"]:checked')].length > 4)
        cb.checked = false;
    });
  });
  // Show resume box if unfinished session exists
  if (_load() && S && !S.done) {
    document.getElementById('sc-resume').style.display = 'block';
  }
}

function cbtStart() {
  const subs = [...document.querySelectorAll('input[name="sc-s"]:checked')].map(c => c.value);
  if (!subs.length) { alert('Please select at least one subject.'); return; }

  const yr  = document.getElementById('sc-yr').value;
  const dur = parseInt(document.getElementById('sc-dur').value) || 120;

  // Build flat question array
  const qs = [];
  subs.forEach(k => {
    const meta = SUBJ_META.find(m => m.key === k);
    const pool = JAMB_DATA[k] || [];
    const list = yr === 'all' ? pool : pool.filter(q => String(q.year) === yr);
    list.forEach(q => qs.push({ ...q, subKey: k, subLabel: meta.label }));
  });

  if (!qs.length) { alert('No questions found. Try selecting "All Years".'); return; }

  S = {
    qs,
    subKeys:  subs,
    answers:  {},    // flat index → chosen letter
    flags:    {},    // flat index → true
    cur:      0,
    timeLeft: dur * 60,
    bornAt:   Date.now(),
    done:     false,
  };
  _save();
  _launch();
}

function cbtResume() { if (!S) _load(); _launch(); }
function cbtDiscard() { _clear(); document.getElementById('sc-resume').style.display = 'none'; }

/* ── 6. LAUNCH EXAM ──────────────────────────────────────────────────── */
function _launch() {
  _hideOrig();
  document.getElementById('cbt-setup').style.display = 'none';
  document.getElementById('cbt-exam').classList.add('live');
  _renderQ();
  _buildSidebar();
  _startTimer();
}

/* ── 7. RENDER CURRENT QUESTION ──────────────────────────────────────── */
function _renderQ() {
  const q      = S.qs[S.cur];
  const chosen = S.answers[S.cur];
  const flagged = !!S.flags[S.cur];

  // Top bar subject label
  document.getElementById('cb-sub').textContent   = q.subLabel;
  document.getElementById('cb-title').textContent = q.subLabel;

  // Progress text
  const subQs    = S.qs.filter(x => x.subKey === q.subKey);
  const posInSub = subQs.indexOf(q) + 1;
  document.getElementById('cb-prog').textContent =
    `Q${S.cur + 1} / ${S.qs.length}  ·  ${q.subLabel}: ${posInSub} / ${subQs.length}`;

  // Stats strip
  const nAns = Object.keys(S.answers).length;
  const nFlg = Object.values(S.flags).filter(Boolean).length;
  document.getElementById('cb-stats').innerHTML =
    `<span class="cbt-pill a">✅ ${nAns} answered</span>
     <span class="cbt-pill f">🚩 ${nFlg} flagged</span>
     <span class="cbt-pill u">⭕ ${S.qs.length - nAns} left</span>`;

  // Flag button
  const fb = document.getElementById('cb-flag');
  fb.textContent = flagged ? '🚩 Unmark' : '🚩 Mark for Review';
  fb.className   = 'cbt-nbtn' + (flagged ? ' flagged' : '');

  // Question card — reuses your EXISTING CSS classes:
  // .question-card  .q-meta  .q-num  .q-year  .q-text  .options  .option-btn  .opt-letter
  const LTRS = ['A','B','C','D'];
  document.getElementById('cb-qcard').innerHTML = `
    <div class="question-card">
      <div class="q-meta">
        <span class="q-num">Q${S.cur + 1}</span>
        <span class="q-year">JAMB ${q.year}</span>
        ${flagged ? '<span class="cbt-flag-tag">🚩 Flagged</span>' : ''}
      </div>
      <div class="q-text">${q.q}</div>
      <div class="options">
        ${q.opts.map((opt, i) => {
          const l = LTRS[i];
          return `<button class="option-btn${chosen === l ? ' cbt-chosen' : ''}" onclick="cbtPick('${l}')">
            <span class="opt-letter">${l}</span>${opt.slice(3)}
          </button>`;
        }).join('')}
      </div>
    </div>`;

  document.getElementById('cb-panel').scrollTop = 0;
}

/* ── 8. PICK ANSWER ─────────────────────────────────────────────────── */
function cbtPick(letter) {
  S.answers[S.cur] = letter;
  _save();
  _renderQ();
  _buildPalette();
  _buildSubTabs();
}

/* ── 9. NAVIGATION ──────────────────────────────────────────────────── */
function cbtNext() {
  if (S.cur < S.qs.length - 1) { S.cur++; _save(); _renderQ(); _buildPalette(); _buildSubTabs(); }
}
function cbtPrev() {
  if (S.cur > 0) { S.cur--; _save(); _renderQ(); _buildPalette(); _buildSubTabs(); }
}
function cbtJump(i) {
  S.cur = i; _save(); _renderQ(); _buildPalette(); _buildSubTabs();
  document.getElementById('cb-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── 10. FLAG ────────────────────────────────────────────────────────── */
function cbtFlag() {
  if (S.flags[S.cur]) delete S.flags[S.cur]; else S.flags[S.cur] = true;
  _save(); _renderQ(); _buildPalette();
}

/* ── 11. SIDEBAR ────────────────────────────────────────────────────── */
function _buildSidebar() { _buildSubTabs(); _buildPalette(); }

function _buildSubTabs() {
  const curKey = S.qs[S.cur].subKey;
  document.getElementById('cb-stabs').innerHTML =
    S.subKeys.map(k => {
      const meta = SUBJ_META.find(m => m.key === k);
      const qsub = S.qs.filter(q => q.subKey === k);
      const ans  = qsub.filter((_, i) => S.answers[S.qs.indexOf(qsub[i])] !== undefined).length;
      return `<button class="cbt-stab${k === curKey ? ' on' : ''}" onclick="cbtGoSub('${k}')">
        <span>${meta.label}</span>
        <span class="sbadge">${ans}/${qsub.length}</span>
      </button>`;
    }).join('');
}

function cbtGoSub(k) {
  const i = S.qs.findIndex(q => q.subKey === k);
  if (i >= 0) cbtJump(i);
}

function _buildPalette() {
  document.getElementById('cb-palette').innerHTML =
    S.qs.map((_, i) => {
      const ans = S.answers[i] !== undefined;
      const flg = !!S.flags[i];
      const cur = i === S.cur;
      let cls = 'pq-btn';
      if      (cur)          cls += ' cur';
      else if (ans && flg)   cls += ' ans flg';
      else if (ans)          cls += ' ans';
      else if (flg)          cls += ' flg';
      return `<button class="${cls}" onclick="cbtJump(${i})" title="Q${i + 1}">${i + 1}</button>`;
    }).join('');
}

/* ── 12. TIMER ──────────────────────────────────────────────────────── */
function _startTimer() {
  // Recalculate remaining time if resuming
  if (S.bornAt) {
    const elapsed = Math.floor((Date.now() - S.bornAt) / 1000);
    S.timeLeft = Math.max(0, S.timeLeft - elapsed);
  }
  S.bornAt = Date.now();
  _save();
  _tick();
  if (_tid) clearInterval(_tid);
  _tid = setInterval(() => {
    if (!S || S.done) { clearInterval(_tid); return; }
    S.timeLeft = Math.max(0, S.timeLeft - 1);
    _save();
    _tick();
    if (S.timeLeft <= 0) { clearInterval(_tid); _autoSubmit(); }
  }, 1000);
}

function _tick() {
  const t  = S.timeLeft;
  const h  = String(Math.floor(t / 3600)).padStart(2, '0');
  const m  = String(Math.floor((t % 3600) / 60)).padStart(2, '0');
  const s  = String(t % 60).padStart(2, '0');
  const el = document.getElementById('cb-clock');
  if (!el) return;
  el.textContent = `⏱ ${h}:${m}:${s}`;
  el.className = 'cbt-clock' + (t <= 60 ? ' danger' : t <= 300 ? ' warn' : '');
}

function _autoSubmit() {
  alert('⏰ Time is up! Submitting your exam now.');
  cbtSubmit();
}

/* ── 13. SUBMIT MODAL ───────────────────────────────────────────────── */
function cbtConfirm() {
  const nAns  = Object.keys(S.answers).length;
  const nFlg  = Object.values(S.flags).filter(Boolean).length;
  const nLeft = S.qs.length - nAns;
  document.getElementById('cb-modal-msg').textContent =
    nLeft > 0
      ? `You have ${nLeft} unanswered question(s). Submit anyway?`
      : 'All questions answered. Ready to submit?';
  document.getElementById('cb-modal-info').innerHTML =
    `<strong>Total:</strong> ${S.qs.length} &nbsp;·&nbsp;
     <strong>Answered:</strong> ${nAns} &nbsp;·&nbsp;
     <strong>Unanswered:</strong> ${nLeft} &nbsp;·&nbsp;
     <strong>Flagged:</strong> ${nFlg}`;
  document.getElementById('cb-modal').classList.add('open');
}
function cbtCloseModal() {
  document.getElementById('cb-modal').classList.remove('open');
}

/* ── 14. FINAL SUBMIT & SCORE ───────────────────────────────────────── */
function cbtSubmit() {
  cbtCloseModal();
  if (_tid) clearInterval(_tid);
  S.done = true;
  _save();
  _showResults();
}

function _showResults() {
  document.getElementById('cbt-exam').classList.remove('live');

  // Score tallying
  let right = 0, wrong = 0;
  const bySub = {};
  S.subKeys.forEach(k => {
    const meta = SUBJ_META.find(m => m.key === k);
    bySub[k] = { label: meta.label, total: 0, right: 0, wrong: 0 };
  });
  S.qs.forEach((q, i) => {
    const c = S.answers[i];
    bySub[q.subKey].total++;
    if (!c) { /* skipped */ }
    else if (c === q.ans) { right++; bySub[q.subKey].right++; }
    else { wrong++; bySub[q.subKey].wrong++; }
  });

  const total   = S.qs.length;
  const skipped = total - right - wrong;
  const pct     = total ? Math.round((right / total) * 100) : 0;
  let grade = 'F', gcls = 'gF';
  if (pct >= 70) { grade = 'A'; gcls = 'gA'; }
  else if (pct >= 60) { grade = 'B'; gcls = 'gB'; }
  else if (pct >= 50) { grade = 'C'; gcls = 'gC'; }

  document.getElementById('rn-score').textContent = `${right} / ${total}`;
  document.getElementById('rn-pct').textContent   = `${pct}%`;
  document.getElementById('rn-grade').innerHTML   =
    `<span class="res-grade-badge ${gcls}">Grade ${grade}</span>`;

  document.getElementById('rn-cards').innerHTML = `
    <div class="res-card">     <div class="rci">📋</div><div class="rcn">${total}</div>   <div class="rcl">Total</div></div>
    <div class="res-card ok">  <div class="rci">✅</div><div class="rcn">${right}</div>   <div class="rcl">Correct</div></div>
    <div class="res-card bad"> <div class="rci">❌</div><div class="rcn">${wrong}</div>   <div class="rcl">Wrong</div></div>
    <div class="res-card">     <div class="rci">⭕</div><div class="rcn">${skipped}</div> <div class="rcl">Skipped</div></div>
    <div class="res-card">     <div class="rci">📊</div><div class="rcn">${pct}%</div>   <div class="rcl">Score</div></div>`;

  document.getElementById('rn-tbody').innerHTML =
    Object.values(bySub).map(b => `<tr>
      <td>${b.label}</td>
      <td>${b.total}</td>
      <td class="ok">${b.right}</td>
      <td class="bad">${b.wrong}</td>
      <td>${b.total ? Math.round((b.right / b.total) * 100) : 0}%</td>
    </tr>`).join('');

  // Full review
  const LTRS = ['A','B','C','D'];
  document.getElementById('rn-rev-list').innerHTML =
    S.qs.map((q, i) => {
      const c    = S.answers[i];
      const ok   = c && c === q.ans;
      const bad  = c && c !== q.ans;
      const scls = ok ? 'ok' : bad ? 'bad' : 'skip';
      const stxt = ok ? '✅ Correct' : bad ? '❌ Wrong' : '⭕ Skipped';
      return `<div class="rev-q">
        <div class="rev-meta">
          <span class="rev-num">Q${i+1}</span>
          <span class="rev-sub">${q.subLabel}</span>
          <span class="rev-st ${scls}">${stxt}</span>
        </div>
        <div class="rev-text">${q.q}</div>
        ${q.opts.map((opt, oi) => {
          const l = LTRS[oi];
          let st = '';
          if (l === q.ans) st = 'color:#166534;font-weight:700';
          else if (l === c && c !== q.ans) st = 'color:#991B1B;font-weight:700';
          return `<div class="rev-opt" style="${st}">${opt}${l===q.ans?' ✅':''}${l===c&&c!==q.ans?' ❌':''}</div>`;
        }).join('')}
        ${c
          ? `<div class="rev-opt" style="margin-top:5px;color:#475569"><strong>Your answer:</strong> ${c} &nbsp;·&nbsp; <strong>Correct:</strong> ${q.ans}</div>`
          : `<div class="rev-opt" style="color:#94A3B8">Not attempted</div>`}
        <div class="rev-exp"><strong>✏️ Explanation:</strong> ${q.exp}</div>
      </div>`;
    }).join('');

  const res = document.getElementById('cbt-result');
  res.classList.add('show');
  res.scrollTop = 0;
}

function cbtRetake() { _clear(); location.reload(); }

/* ── 15. BOOT ───────────────────────────────────────────────────────── */
// Hide original page and show setup immediately
_hideOrig();
_initSetup();

// Stub out the original quiz engine so it doesn't error when called
const YEARS = [2024,2023,2022,2021,2020,2019,2018,2017,2016,2015];
let currentSubject='english', currentYear='all', score=0, total=0;
function buildYearGrid()  {}
function setSubject()     {}
function setYear()        {}
function renderQuestions(){}
function checkAnswer()    {}
function resetScore()     {}
(function(){ /* original boot — silenced */ })();
