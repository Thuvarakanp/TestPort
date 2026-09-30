export const img = (name) => `/images/${name}`;

export const careerShelves = [
  { n: '01', year: '’16', period: '2016–2017', role: 'Graphic Designer', company: 'Cyberarch (Pvt) Ltd.', takeaway: 'Visual communication', title: 'The eye for a good idea.', job: 'Created marketing materials and visual concepts for cybersecurity and digital forensics services.', forward: 'Graphic design taught me to make a message clear through type, colour and composition. It was the first stock on these shelves.' },
  { n: '02', year: '’17', period: '2017–2019', role: 'UI Engineer', company: 'Calcey (Pvt) Ltd.', takeaway: 'Design meets engineering', title: 'Beyond the surface.', job: 'Worked with user requirements and UI practices in a software product engineering environment.', forward: 'Engineering brought me closer to how an interface works. My development experience added another question: what happens beneath the screen?' },
  { n: '03', year: '’19', period: '2019–2020', role: 'Graphic Consultant', company: 'Cookoo (Pvt) Ltd.', takeaway: 'Creative direction', title: 'A wider view of the product.', job: 'Advised on visual style, format and print production for a food-ordering platform. Contributed illustrations, logos, app graphics and layouts.', forward: 'Consulting meant looking beyond one design to the decisions around it, and helping a team find a consistent direction.' },
  { n: '04', year: '’22', period: 'MAR 2022–APR 2023', role: 'Associate UI/UX Designer', company: 'Smartzi Lanka (Pvt) Ltd.', takeaway: 'Product thinking', title: 'Designing for the people using it.', job: 'Joined Smartzi’s design team, contributing to interfaces for B2B taxi booking, driver apps and websites.', forward: 'Working with developers and stakeholders connected design decisions to real product needs.' },
  { n: '05', year: '’23', period: 'FROM APRIL 2023', role: 'UI/UX Designer', company: 'Smartzi Lanka (Pvt) Ltd.', takeaway: 'Experience design', title: 'Making the pieces work together.', job: 'Continued designing booking, driver and web interfaces in a UI/UX Designer role.', forward: 'Each screen belonged to a bigger experience. The small decisions needed to make sense together.' },
  { n: '06', year: 'NOW', period: 'TODAY', current: true, role: 'QA Engineer', company: 'My current chapter', takeaway: 'Quality & confidence', title: 'Now I check every detail.', job: 'I work across manual and automated testing, using my design and development background to investigate issues and communicate them clearly.', forward: 'The designer notices what feels wrong. The developer understands how it can happen. The QA engineer checks it, reproduces it and helps put it right.' },
];

export const projectData = {
  forma: { title: 'Taxi booking & driver apps', type: 'Smartzi Lanka / UI/UX design', intro: 'Interface design work at Smartzi Lanka across B2B taxi booking, driver applications and websites.', problem: 'Design clear interfaces for the different people using booking and driver products.', approach: 'Collaborated with developers and stakeholders to shape interfaces around user and market needs.', details: 'B2B taxi booking · Driver applications · Web design', next: 'UI/UX Designer from April 2023, following an Associate UI/UX Designer role from March 2022 to April 2023.' },
  still: { title: 'Design for food ordering', type: 'Cookoo / Graphic consulting', intro: 'Graphic consulting for a Sri Lankan food-ordering platform.', problem: 'Support the design team with consistent visual decisions across product graphics and production formats.', approach: 'Advised on style, format and print production, and contributed product illustrations, logos, app graphics and layouts.', details: 'Visual direction · Illustration · Logos · App graphics · Layouts', next: 'Graphic Consultant · 2019–2020.' },
  index: { title: 'Communicating cybersecurity', type: 'Cyberarch / Graphic design', intro: 'Marketing design for a cybersecurity consulting business offering information security and forensics services.', problem: 'Communicate technical services through clear, engaging visual material.', approach: 'Created marketing materials and visual concepts to support the company’s services.', details: 'Marketing materials · Visual concepts · Cybersecurity communication', next: 'Graphic Designer · 2016–2017.' },
  after: { title: 'Day & Night', type: 'Thuvarakan / Personal portfolio', intro: 'A shop, by day and by night, for a lifelong entrepreneurial ambition. This portfolio brings my career and the dream of building something of my own into the same space.', problem: 'How do graphic design, UI design, development, design consulting, UI UX engineering and my current QA role fit into one personal story?', approach: 'The store is the connecting idea. I welcome visitors at the door, share the six chapters of my career, and use the shelves and receipt to show what I carry forward.', details: 'Personal narrative · Storefront concept · Scroll-driven introduction', next: 'Keep adding real work and new chapters as my career develops.' },
};

export const workCards = [
  { id: 'forma', cover: 'cover-regression', eyebrow: '01 / PRODUCT INTERFACES', lines: ['Helping people', 'get moving.'], tags: ['B2B BOOKING', 'DRIVER APPS'], company: 'SMARTZI LANKA', kind: 'UI/UX DESIGN', title: 'Taxi booking & driver apps' },
  { id: 'still', cover: 'cover-access', eyebrow: '02 / VISUAL COMMUNICATION', lines: ['A taste of', 'good design.'], tags: ['APP GRAPHICS', 'VISUAL DIRECTION'], company: 'COOKOO', kind: 'GRAPHIC CONSULTING', title: 'Design for food ordering' },
  { id: 'index', cover: 'cover-explore', eyebrow: '03 / MARKETING DESIGN', lines: ['Making the', 'message clear.'], tags: ['CYBERSECURITY', 'VISUAL CONCEPTS'], company: 'CYBERARCH', kind: 'GRAPHIC DESIGN', title: 'Communicating cybersecurity' },
];

export const toolkit = [
  ['01 / TEST AUTOMATION', ['Playwright', 'Cypress', 'Postman', 'Selenium', 'Appium']],
  ['02 / CODE & CI', ['JavaScript', 'TypeScript', 'React', 'Git & pull requests', 'GitHub Actions', 'Docker']],
  ['03 / TEST PRACTICE', ['Jira / Xray', 'TestRail', 'Risk-based testing', 'Agile', 'White-box testing', 'Integration testing']],
  ['04 / DESIGN & EXPERIENCE', ['Figma', 'Usability testing', 'axe-core / WCAG', 'Visual regression', 'AI-assisted QA']],
];

export const receiptRows = [
  ['01 Graphic Designer', 'START'], ['02 UI Designer', '✓'], ['03 Developer', '✓'],
  ['04 Design Consultant', '✓'], ['05 UI UX Engineer', '✓'], ['06 QA Engineer', 'NOW'],
];

export const receiptDetail = [
  ['Graphic Designer', 'The beginning'], ['UI Designer', 'Interfaces'], ['Developer', 'Building'],
  ['Design Consultant', 'Direction'], ['UI UX Engineer', 'Connections'], ['QA Engineer', 'Today'],
];

export const socials = [
  ['LinkedIn', 'https://www.linkedin.com/in/thuvarakanp/'], ['Behance', 'https://www.behance.net/thuvarakanp'],
  ['Dribbble', 'https://dribbble.com/Thuvarakan'], ['Contra', 'https://on.contra.com/NwJgzp'],
];
