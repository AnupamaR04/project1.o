/**
 * The Daily Planet Newsroom - Comprehensive Article Database
 * Metropolis University's Premier Student Publication
 */

const ARTICLES_DATA = [
  {
    id: "quantum-lab-opening",
    title: "University Unveils $45M Quantum Information Center Funded by Tech Alumni Syndicate",
    deck: "The new subterranean facility promises cryo-cooled experimental suites, 60 doctoral fellowships, and cross-departmental research into fault-tolerant computing.",
    category: "Technology",
    categorySlug: "technology",
    author: {
      name: "Marcus Vance",
      role: "Senior Science & Tech Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    date: "October 27, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80",
    caption: "The central dilution refrigerator inside the newly christened Vance-Hensley Quantum Pavilion.",
    featured: true,
    editorsPick: true,
    trendingRank: 1,
    breaking: true,
    excerpt: "Metropolis University today cut the ribbon on its most ambitious scientific undertaking in four decades: a state-of-the-art subterranean quantum computational research complex.",
    body: [
      "<p class=\"lead-paragraph\"><span class=\"drop-cap\">M</span>etropolis University officially opened the doors to its state-of-the-art Vance-Hensley Quantum Information Center on Tuesday morning, capping off a three-year construction project that plunged three stories below the historic North Quad to insulate delicate qubit processors from urban seismic vibrations.</p>",
      "<p>Funded through a landmark \$45 million endowment spearheaded by a coalition of engineering alumni from the classes of 1998 through 2012, the new facility positions the university alongside national laboratories in the race toward fault-tolerant quantum calculation.</p>",
      "<blockquote>\"We are no longer just theorizing quantum entanglement on chalkboards in Howell Hall. Our undergraduate and doctoral students now have direct console access to multi-qubit dilution refrigerators operating at fractions of a Kelvin above absolute zero.\"<cite>— Dr. Elena Rostova, Chair of Applied Physics</cite></blockquote>",
      "<h3>A Subterranean Engineering Marvel</h3>",
      "<p>Constructing the laboratory required excavating over 38,000 cubic yards of Manhattan schist and lining the walls with electromagnetic attenuation mesh. The facility's five central research bays feature independent floating concrete slabs mounted on pneumatic dampers to cancel vibrations caused by the nearby subway lines.</p>",
      "<p>The centerpiece of Bay A is 'Atlas,' a 128-qubit superconducting testbed built in partnership with regional quantum hardware consortia. Unlike industry black-boxes, Atlas was assembled with open-architecture interfaces, granting graduate researchers hands-on control over pulse-level microwave calibration.</p>",
      "<h3>Democratizing Deep Tech Education</h3>",
      "<p>Dean of Engineering Arthur Pendelton highlighted the educational mandate of the investment during his opening address. Beginning in Spring 2027, the Department of Computer Science will introduce 'CS 244: Applied Quantum Algorithms', an introductory lecture open to sophomore students regardless of prior quantum mechanics coursework.</p>",
      "<p>The university has also dedicated twenty percent of the endowment toward the newly established Metropolis Quantum Scholars Fellowship, providing full stipends and tuition waivers for 60 underrepresented graduate researchers over the coming decade.</p>",
      "<h3>Student Skepticism and Resource Allocation</h3>",
      "<p>Despite widespread celebration among STEM faculties, the lavish inauguration drew a peaceful demonstration by student union representatives outside the glass-fronted pavilion atrium. Protesters pointed to unresolved ventilation maintenance requests in the South Humanities quad and the recent reduction in library print-journal subscriptions.</p>",
      "<p>\"We celebrate scientific progress, but an institution cannot be world-class when high-tech cryo-coolers receive millions while student dormitories endure broken heating systems in mid-November,\" said Student Body Vice President Chloe Sterling during a midday rally.</p>",
      "<p>University Provost Michael Thorne committed to addressing deferred campus infrastructure during next week's open budget symposium, assuring attendees that alumni capital gifts are legally ring-fenced for laboratory specifications.</p>"
    ]
  },
  {
    id: "campus-library-sit-in",
    title: "Student Government Approves 24/7 Library Hours Following Weeklong Sit-In",
    deck: "Dean of Academic Services signs emergency decree expanding overnight study access, campus shuttle routes, and peer security patrol funding.",
    category: "Campus News",
    categorySlug: "campus-news",
    author: {
      name: "Sophia Chen",
      role: "Campus Politics Correspondent",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    date: "October 26, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&auto=format&fit=crop&q=80",
    caption: "Students celebrate on the marble steps of Miller Memorial Library after the administration announced continuous operations.",
    featured: false,
    editorsPick: true,
    trendingRank: 2,
    breaking: false,
    excerpt: "Following seven consecutive days of round-the-clock student presence in the Miller Memorial rotunda, campus administrators agreed to restore 24/7 library operating hours starting next Monday.",
    body: [
      "<p class=\"lead-paragraph\"><span class=\"drop-cap\">A</span>fter more than 160 hours of continuous occupancy in the central atrium of Miller Memorial Library, student organizers emerged victorious late Monday evening as University administrators formally authorized perpetual 24/7 building access throughout the academic semester.</p>",
      "<p>The dispute arose earlier this autumn when campus facilities announced a midnight curfew on weekdays citing utility budget reductions. The decision met instantaneous blowback from commuter students, premed cohorts, and student parents who rely on Miller's quiet study carrels and high-speed intranet during non-traditional hours.</p>",
      "<blockquote>\"Education doesn't shut down when the town clock strikes midnight. For students working evening service shifts, the library was their only guaranteed quiet sanctuary.\"<cite>— Jamal Washington, Lead Coalition Organizer</cite></blockquote>",
      "<h3>Security & Transit Adjustments</h3>",
      "<p>As part of the signed accord, the Division of Student Life will subsidize an expanded nocturnal shuttle route servicing off-campus housing districts between 1:00 AM and 6:30 AM every thirty minutes. Student peer-escort networks will also receive increased institutional stipends.</p>",
      "<p>Library Dean Beatrice Albright confirmed that late-night operations will prioritize card-swipe entry and student safety, while ensuring coffee kiosk staff receive nighttime differential wages.</p>"
    ]
  },
  {
    id: "rowing-ivy-cup-championship",
    title: "Varsity Rowing Clinches Ivy-Metro Cup in Dramatic Final Stroke Finish",
    deck: "Metropolis Men's Eight defeats reigning champions Gotham Tech by three-tenths of a second on choppy Hudson River waters.",
    category: "Sports",
    categorySlug: "sports",
    author: {
      name: "Tariq Edwards",
      role: "Sports Editor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    date: "October 25, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1544654803-b69140b285a1?w=1200&auto=format&fit=crop&q=80",
    caption: "The varsity eight crosses the buoy line at the 2,000-meter marker just inches ahead of Gotham Tech.",
    featured: false,
    editorsPick: false,
    trendingRank: 3,
    breaking: false,
    excerpt: "In what spectators are calling the most thrilling regatta in a quarter-century, Metropolis varsity rowers reclaimed the coveted silver oar with an electrifying surge over the final two hundred meters.",
    body: [
      "<p class=\"lead-paragraph\"><span class=\"drop-cap\">B</span>listering crosswinds and whitecap ripples on the lower Hudson River set the stage for an unforgettable duel Sunday afternoon as the Metropolis Men's Varsity Eight reclaimed the Ivy-Metro Cup by a razor-thin margin of 0.32 seconds.</p>",
      "<p>Trailing cross-river rivals Gotham Tech by nearly three-quarters of a boat length past the 1,500-meter marker, coxswain Lucas Ramirez called for a tactical rhythm shift, jumping the stroke rate from 36 to a grueling 41 strokes per minute.</p>",
      "<blockquote>\"We heard their coxswain screaming into the wind. Lucas told us this was our river, our water, and that our legs had another sixty seconds of pain to give. We responded.\"<cite>— Henrik Lindqvist, Senior Stroke Oar</cite></blockquote>",
      "<h3>The Road to National Trials</h3>",
      "<p>The victory marks Metropolis's first regional trophy since 2018, automatically qualifying the boat for the Collegiate National Championship in Sarasota next June. Head Coach Maria Donatelli praised the team's relentless winter ergometer conditioning.</p>"
    ]
  },
  {
    id: "student-film-photography-revival",
    title: "The Analog Renaissance: Why Campus Photographers Are Ditching Digital",
    deck: "Amid screen fatigue and algorithmically tuned feeds, student darkrooms are running at maximum capacity with 35mm film lovers.",
    category: "Culture",
    categorySlug: "culture",
    author: {
      name: "Claire Delacroix",
      role: "Arts & Culture Critic",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    date: "October 24, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&auto=format&fit=crop&q=80",
    caption: "Film reels soaking in chemical wash inside the fine arts building basement darkroom.",
    featured: false,
    editorsPick: true,
    trendingRank: 4,
    breaking: false,
    excerpt: "Under the amber glow of safelights in Hartshorn Hall, students are rediscovering the patience, grain, and physical permanence of chemical film photography.",
    body: [
      "<p class=\"lead-paragraph\"><span class=\"drop-cap\">S</span>tep into the basement of Hartshorn Hall past 8:00 PM, and you will encounter an intoxicating aroma of stop bath and fixer that hasn't changed since 1974. Here, illuminated only by crimson safelights, dozens of undergraduates are waiting patiently for silver halide crystals to blossom into monochrome photographs.</p>",
      "<p>While computational smartphone cameras continue to simulate artificial depth-of-field with neural processing, campus demand for analog photo courses has skyrocketed by 180% over the last two semesters, triggering waitlists of over two hundred students.</p>",
      "<blockquote>\"With digital, you shoot four hundred identical bursts and delete them without looking. On 35mm, you have 36 exposures. Every frame requires intentionality, breath control, and acceptance of imperfection.\"<cite>— Maya Lin, Junior Visual Arts Major</cite></blockquote>",
      "<h3>A Counterculture Against Instant Gratification</h3>",
      "<p>Sociology professors cite digital sensory overload as the primary catalyst. For a generation raised on ephemeral vertical video feeds, developing a tangible negative strip offers tactile relief and a deliberate separation from notifications.</p>"
    ]
  },
  {
    id: "dining-hall-workers-contract",
    title: "Metropolis Dining Hall Staff Ratify Historic Living Wage Agreement",
    deck: "The four-year agreement guarantees \$22/hour baseline pay, family healthcare coverage, and paid English-as-a-second-language training.",
    category: "Campus News",
    categorySlug: "campus-news",
    author: {
      name: "Sophia Chen",
      role: "Campus Politics Correspondent",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    date: "October 23, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&auto=format&fit=crop&q=80",
    caption: "Dining hall culinary staff celebrate the vote tally inside the Student Union Conference Hall.",
    featured: false,
    editorsPick: false,
    trendingRank: 5,
    breaking: false,
    excerpt: "With a 94 percent affirmative vote, Local 314 culinary workers approved a contract establishing the highest campus hourly baseline in the statewide higher education system.",
    body: [
      "<p class=\"lead-paragraph\"><span class=\"drop-cap\">C</span>ulinary and custodial staff across Metropolis University dining halls overwhelmingly ratified a landmark collective bargaining agreement late Thursday, avoiding a potential campus-wide food service stoppage ahead of parent weekend.</p>",
      "<p>The four-year contract establishes an immediate baseline minimum wage of \$22.50 per hour, indexing future adjustments to regional consumer price indices. The package additionally introduces enhanced family dental benefits and comprehensive tuition remission for full-time workers' dependents.</p>",
      "<p>Student solidarity committees collected over 4,200 undergraduate signatures urging the Board of Trustees to accept union proposals without arbitration.</p>"
    ]
  },
  {
    id: "student-mars-rover-championship",
    title: "Engineering Society's 'Vanguard III' Rover Triumphs at Utah Desert Challenge",
    deck: "The student-designed autonomous robotic explorer traversed treacherous red canyons and collected geological samples with zero human teleoperation.",
    category: "Technology",
    categorySlug: "technology",
    author: {
      name: "Marcus Vance",
      role: "Senior Science & Tech Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    date: "October 22, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80",
    caption: "The Vanguard III rover navigating a simulated Martian cliffside in the Hanksville test range.",
    featured: false,
    editorsPick: false,
    trendingRank: null,
    breaking: false,
    excerpt: "Metropolis University's student-run robotics society clinched first prize at the International University Rover Challenge, defeating 36 global university teams.",
    body: [
      "<p class=\"lead-paragraph\"><span class=\"drop-cap\">A</span>fter five months of grueling test runs in simulated Martian regolith boxes, the Metropolis Robotics Team took home the international cup from the Mars Desert Research Station in Hanksville, Utah.</p>",
      "<p>Vanguard III, an 85-kilogram six-wheeled rover equipped with custom rocker-bogie suspension and carbon-fiber spectrometer arms, scored maximum points in autonomous traversal and subsurface sample collection.</p>",
      "<blockquote>\"Our real breakthrough was the on-board visual odometry and SLAM pipeline, which ran entirely on edge compute boards without relying on high-latency ground station telemetry.\"<cite>— Anya Sharma, Rover Navigation Lead</cite></blockquote>"
    ]
  },
  {
    id: "homecoming-century-rivalry-preview",
    title: "Homecoming Climax: Football Squad Prepares for 100th Battle of the Bell",
    deck: "Head Coach Patterson shakes up offensive scheme as Metropolis seeks revenge against State Polytechnic's undefeated blitz defense.",
    category: "Sports",
    categorySlug: "sports",
    author: {
      name: "Tariq Edwards",
      role: "Sports Editor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    date: "October 21, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80",
    caption: "Quarterback Dylan Hayes calls audibles during Tuesday evening scrimmage under stadium floodlights.",
    featured: false,
    editorsPick: false,
    trendingRank: null,
    breaking: false,
    excerpt: "Campus spirit has reached fever pitch as Metropolis prepares to host State Polytechnic this Saturday for the centennial clash in one of college football's oldest regional rivalries.",
    body: [
      "<p class=\"lead-paragraph\"><span class=\"drop-cap\">F</span>or ninety-nine years, the brass Founder's Bell has traveled between campuses, hoisted by victorious captains and rung until dawn. On Saturday, a sold-out crowd of 22,000 will pack Planet Stadium for the centennial showdown.</p>",
      "<p>Metropolis enters the matchup at 6-1, sporting the conference's most explosive passing offense. However, State Polytechnic boasts the top red-zone defensive unit in the nation, having surrendered only four touchdowns through seven games.</p>"
    ]
  },
  {
    id: "underground-jazz-cellar",
    title: "Basement Bebop: Inside the Secret 60-Year Tradition of the Old Quad Cellar",
    deck: "Every Thursday midnight, student horn players, bassists, and vocalists gather in a dimly lit boiler room annex for impromptu jam sessions.",
    category: "Culture",
    categorySlug: "culture",
    author: {
      name: "Claire Delacroix",
      role: "Arts & Culture Critic",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    date: "October 20, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200&auto=format&fit=crop&q=80",
    caption: "A brass ensemble improvises complex syncopations under the vaulted brick ceilings of Cellar 4.",
    featured: false,
    editorsPick: true,
    trendingRank: null,
    breaking: false,
    excerpt: "Deep beneath the foundations of the 1920s gothic chapel, an acoustic sanctuary has cultivated generations of collegiate musical legends far from academic rubrics.",
    body: [
      "<p class=\"lead-paragraph\"><span class=\"drop-cap\">T</span>here are no tickets, no flyers taped to telephone poles, and no entry fees. To find Cellar 4, one simply descends the spiral iron staircase behind the Chapel organ loft and follows the faint, syncopated thump of an upright acoustic bass.</p>",
      "<p>What began in 1964 as a covert practice haven for students excluded from classical conservatory ensembles has evolved into the university's most revered counter-cultural institution.</p>",
      "<blockquote>\"Down here, nobody cares about your GPA or what grade you got on counterpoint homework. Can you listen, can you hold the groove, and can you tell a truth with your horn? That is the only syllabus.\"<cite>— Julian 'Mute' Vance, Alum & Resident Pianist</cite></blockquote>"
    ]
  },
  {
    id: "tuition-freeze-announcement",
    title: "Board of Trustees Freezes In-State Undergraduate Tuition for 2027-28",
    deck: "Citing strong investment yields on the university's \$3.2B endowment, trustees vote unanimously against anticipated four-percent hike.",
    category: "Campus News",
    categorySlug: "campus-news",
    author: {
      name: "Sophia Chen",
      role: "Campus Politics Correspondent",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    date: "October 27, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
    caption: "Students study outside the University Administration Hall following the announcement.",
    featured: false,
    editorsPick: false,
    trendingRank: null,
    breaking: true,
    excerpt: "In an unexpected victory for affordability advocates, the Metropolis University Board of Trustees voted Tuesday morning to freeze undergraduate tuition rates for the upcoming academic cycle.",
    body: [
      "<p class=\"lead-paragraph\"><span class=\"drop-cap\">M</span>etropolis University undergraduate students received an unexpected financial reprieve Tuesday when the Board of Trustees concluded its autumn executive session by approving a comprehensive tuition freeze for the 2027-2028 academic term.</p>",
      "<p>The vote circumvents an earlier financial forecasting memorandum that recommended a 3.8% increase to offset municipal electricity utility surges. Board Chair Evelyn Vance credited exceptional returns in the university's venture endowment portfolio for enabling the price stabilization.</p>"
    ]
  },
  {
    id: "ai-ethics-symposium-debate",
    title: "Faculty Senate Clash: Should AI-Assisted Honors Theses Carry Disclosure Badges?",
    deck: "Humanities and Computer Science departments spar over academic integrity rubrics in an era of conversational reasoning models.",
    category: "Technology",
    categorySlug: "technology",
    author: {
      name: "Marcus Vance",
      role: "Senior Science & Tech Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    date: "October 19, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=1200&auto=format&fit=crop&q=80",
    caption: "Faculty Senate debate in progress at the Law School Moot Court.",
    featured: false,
    editorsPick: false,
    trendingRank: null,
    breaking: false,
    excerpt: "A packed auditorium witnessed spirited arguments between humanities scholars and machine learning faculty over how artificial intelligence co-writing should be cited in senior theses.",
    body: [
      "<p class=\"lead-paragraph\"><span class=\"drop-cap\">W</span>here does human critical synthesis end and algorithmic prompt refinement begin? That was the explosive question that occupied nearly three hours of debate during Tuesday's monthly Faculty Senate convening.</p>",
      "<p>The controversy centers on Proposal 42B, which would mandate that any honors dissertation utilizing generative language models include a formal 'Machine Contribution Matrix' detailing model weights, temperature parameters, and prompt transcripts.</p>"
    ]
  },
  {
    id: "womens-soccer-playoff-surge",
    title: "Unstoppable: Women's Soccer Secures First-Seed Spot in Conference Tournament",
    deck: "Striker Elena Gomez notches her 14th goal of the season in shutout victory over Northfield College.",
    category: "Sports",
    categorySlug: "sports",
    author: {
      name: "Tariq Edwards",
      role: "Sports Editor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    date: "October 18, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop&q=80",
    caption: "Elena Gomez celebrates after striking the match-winning header in the 74th minute.",
    featured: false,
    editorsPick: false,
    trendingRank: null,
    breaking: false,
    excerpt: "The Metropolis University Women's Soccer team completed their finest regular season in school history Sunday, clinching home-field advantage throughout the upcoming conference playoffs.",
    body: [
      "<p class=\"lead-paragraph\"><span class=\"drop-cap\">W</span>ith surgical precision and a suffocating high press, the Metropolis Women's Soccer team dismantled Northfield College 3-0 on Sunday to lock up the number-one seed in next week's Metropolis Athletic Conference tournament.</p>",
      "<p>Junior forward Elena Gomez continued her prolific campaign, netting a brace in the second half to bring her season total to fourteen goals—breaking the program single-season record set in 2004.</p>"
    ]
  },
  {
    id: "campus-indie-cinema-festival",
    title: "Midnight Screenings and 16mm Dreams: Student Cinema Guild Launches Fall Fest",
    deck: "Over thirty student shorts, archival restoration prints, and Q&A sessions with indie directors headline this weekend's campus festival.",
    category: "Culture",
    categorySlug: "culture",
    author: {
      name: "Claire Delacroix",
      role: "Arts & Culture Critic",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    date: "October 17, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80",
    caption: "Audience gathered at the historic Biograph Theater in downtown Metropolis.",
    featured: false,
    editorsPick: false,
    trendingRank: null,
    breaking: false,
    excerpt: "The student-run Metropolis Cinema Guild kicks off its 48th Annual Fall Film Showcase this Thursday, transforming the campus auditorium into a cinema lover's dream.",
    body: [
      "<p class=\"lead-paragraph\"><span class=\"drop-cap\">B</span>efore film schools traded celluloid for digital sensors, student filmmakers spent nights splicing acetate reels with razor blades. This weekend, the Metropolis Cinema Guild is honoring that heritage with its 48th annual showcase.</p>",
      "<p>The three-day festival will screen thirty-two undergraduate original films alongside 35mm archival prints of landmark independent cinema. All proceeds from the \$5 student ticket price support travel grants for student filmmakers entering international circuits.</p>"
    ]
  }
];

// Helper functions for easy querying
const DailyPlanetData = {
  getAll: () => ARTICLES_DATA,
  getFeatured: () => ARTICLES_DATA.find(a => a.featured) || ARTICLES_DATA[0],
  getEditorsPicks: () => ARTICLES_DATA.filter(a => a.editorsPick),
  getBreaking: () => ARTICLES_DATA.filter(a => a.breaking),
  getTrending: () => ARTICLES_DATA.filter(a => a.trendingRank).sort((a, b) => a.trendingRank - b.trendingRank),
  getByCategory: (categorySlug) => ARTICLES_DATA.filter(a => a.categorySlug.toLowerCase() === categorySlug.toLowerCase()),
  getById: (id) => ARTICLES_DATA.find(a => a.id === id) || ARTICLES_DATA[0],
  getRelated: (id, count = 3) => {
    const current = ARTICLES_DATA.find(a => a.id === id);
    if (!current) return ARTICLES_DATA.slice(0, count);
    return ARTICLES_DATA
      .filter(a => a.id !== id && a.categorySlug === current.categorySlug)
      .concat(ARTICLES_DATA.filter(a => a.id !== id && a.categorySlug !== current.categorySlug))
      .slice(0, count);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ARTICLES_DATA, DailyPlanetData };
}
