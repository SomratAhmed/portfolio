/**
 * Every fact on the portfolio comes from here, so the page is edited by
 * changing data rather than markup.
 */

export const profile = {
  name: "Fazla Rabbi Somrat",
  eyebrow: "Computer Science & Engineering — Dhaka, BD",
  location: "Tangail, Bangladesh",
  email: "somrat.info.ict@gmail.com",
  phone: "+880 1757 594403",
  phoneHref: "+8801757594403",
  cvFile: "/Fazla-Rabbi-Somrat-CV.pdf",
  photo: "/somrat.png",
  facts: [
    "4 yrs remote web development",
    "IEEE COMPAS 2025 co-author",
    "Pursuing MSc, Computer Science",
  ],
  focus:
    "I'm pursuing a Master of Science in Computer Science to go deeper into the systems side of computing — software and systems engineering, algorithms, database systems, communication networks, embedded systems, optimisation and systems security. The through-line in my work so far has been the same either way: take something people already do on paper or in a browser, and make the machine do it faster and more reliably. That's as true of a client's storefront as it is of a cardiologist's ECG printout.",
};

export const publication = {
  title:
    "A Robust Deep Learning Approach for Cardiovascular Disease Detection from Enhanced Paper-Based ECG Signals",
  indexed: "IEEE Xplore · Indexed 12 February 2026",
  authors: [
    "Sabuj Kumar Kundu",
    "Md Amzad Sadik Abid",
    "Abdul Latif",
    "Ahnaf Tahmid Jamee",
    "Md Nazmul Hossain",
    "Fazla Rabbi Somrat",
    "MD. Tahmeed Kowsher Hameem",
  ],
  meta: [
    { label: "Conference", value: "IEEE COMPAS, 2nd Intl." },
    { label: "Held", value: "23–24 Oct 2025" },
    { label: "Location", value: "Kushtia, Bangladesh" },
  ],
  networks: ["InceptionV3", "ResNet50", "DenseNet201", "VGG19", "MobileNetV2"],
};

export type Entry = {
  when: string;
  title: string;
  org?: string;
  points?: string[];
  meta?: string;
};

export const experience: Entry[] = [
  {
    when: "Jul 2024 — Feb 2026",
    title: "Web Developer",
    org: "Tiles Porcelain Limited — Durham, United Kingdom · Remote",
    points: [
      "Designed and built responsive, user-friendly websites end to end.",
      "Reworked UX/UI to lift user engagement and conversion rates.",
      "Ran SEO strategy to improve search visibility.",
      "Owned site performance and security hardening.",
      "Held the sites to web accessibility standards.",
      "Handled ongoing maintenance, updates and troubleshooting.",
    ],
  },
  {
    when: "May 2022 — Jun 2024",
    title: "Web Designer & Developer",
    org: "TM Regina — Sacramento, CA, USA · Remote",
    points: [
      "Design & development — responsive, user-friendly sites.",
      "SEO & performance — tuned for speed, security and search.",
      "CMS & e-commerce — content and online store management.",
      "Graphic & newsletter design — visuals and email campaigns.",
      "Analytics & collaboration — reporting, usability, client communication.",
    ],
  },
];

export const projects: Entry[] = [
  {
    when: "Feb — Apr 2022",
    title: "URL Shortener, PDF-to-Image Converter & Image Editor",
    org: "Three tools, one web application",
    points: [
      "Shortens long URLs into links that survive social and professional platforms.",
      "Image editor: crop, resize, rotate, add text, apply filters, insert shapes.",
      "PDF-to-image converter turns PDF files into JPG or PNG in one pass.",
    ],
    meta: "HTML · CSS · Bootstrap · PHP · MySQL · Laravel — mobile expansion planned",
  },
];

export const education: Entry[] = [
  {
    when: "May 2018 — Apr 2022",
    title: "BSc in Computer Science & Engineering",
    org: "World University of Bangladesh (WUB) — Dhaka",
    points: [
      "Coursework: algorithms & data structures, software engineering, artificial intelligence, data mining, database systems.",
      "Main project: web-based URL shortener, PDF-to-image converter and image editing system.",
    ],
    meta: "Final grade 3.07 / 4.00 · 159 credits · EQF Level 6",
  },
  {
    when: "Aug 2014 — Aug 2016",
    title: "Higher Secondary Certificate — Science",
    org: "Sristy College of Tangail — Tangail, Bangladesh",
    meta: "Grade 5.00 / 5.00",
  },
  {
    when: "May 2012 — May 2014",
    title: "Secondary School Certificate — Science",
    org: "Surja Tarun Shixmangan — Shakhipur, Bangladesh",
    meta: "Grade 4.75 / 5.00",
  },
];

export const skills = [
  { group: "Programming", items: ["C", "C++", "Java", "Python", "Dart"] },
  {
    group: "Web development",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "PHP",
      "Laravel",
      "MVC architecture",
      "MySQL",
    ],
  },
  {
    group: "Data & research",
    items: [
      "Machine learning",
      "Deep learning / CNNs",
      "Image processing",
      "Statistics",
      "Data visualization",
    ],
  },
  {
    group: "Tools",
    items: ["Jupyter Notebook", "Google Colab", "Kaggle", "Power BI"],
  },
];

export const languages = {
  columns: [
    "Listening",
    "Reading",
    "Spoken interaction",
    "Spoken production",
    "Writing",
  ],
  levels: ["B2", "B2", "B2", "B2", "B2"],
  scale:
    "A1–A2 basic user · B1–B2 independent user · C1–C2 proficient user",
};
