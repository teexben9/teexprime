// Start a Project diagnostic: questions, scoring and recommendation.
// This is a business qualification aid, not a precise diagnosis. Teexprime makes the final call.

export type Category = 'visibility' | 'trust' | 'information' | 'conversion' | 'operations' | 'quality';
type Scores = Partial<Record<Category, number>>;

export interface Question {
  id: string;
  multiple: boolean;
  options: Record<string, Scores>;
}

export const categoryLabels: Record<Category, string> = {
  visibility: 'Visibility',
  trust: 'Trust',
  information: 'Information',
  conversion: 'Conversion',
  operations: 'Operations',
  quality: 'Website quality',
};

export const questions: Question[] = [
  {
    id: 'industry',
    multiple: false,
    options: { business: {}, ngo: {}, tourism: {}, hotel: {}, restaurant: {}, adventure: {}, other: {} },
  },
  {
    id: 'find',
    multiple: true,
    options: {
      google: {},
      instagram: { information: 1 },
      facebook: { information: 1 },
      whatsapp: { information: 1, operations: 1 },
      referrals: { visibility: 1 },
      directories: { visibility: 1 },
      physical: { visibility: 2 },
      other: {},
    },
  },
  {
    id: 'learn',
    multiple: true,
    options: {
      website: {},
      whatsapp: { operations: 1, information: 1 },
      call: { operations: 1 },
      ask: { information: 2 },
      manual: { operations: 2, information: 1 },
      social: { information: 1, trust: 1 },
      cannotFind: { information: 3 },
      other: {},
    },
  },
  {
    id: 'problem',
    multiple: true,
    options: {
      findOnline: { visibility: 3 },
      understand: { information: 3 },
      notProfessional: { trust: 3 },
      repeatQuestions: { operations: 2, information: 1 },
      noContact: { conversion: 3 },
      scattered: { information: 3 },
      outdated: { quality: 3 },
      noWebsite: { visibility: 2, trust: 1 },
      other: {},
    },
  },
  {
    id: 'after',
    multiple: true,
    options: {
      call: {},
      whatsapp: {},
      email: {},
      book: {},
      visit: {},
      manual: { operations: 1 },
      disappear: { conversion: 3 },
      noProcess: { conversion: 2, operations: 1 },
    },
  },
  {
    id: 'hasWebsite',
    multiple: false,
    options: { yes: {}, no: { visibility: 1, trust: 1 } },
  },
  {
    id: 'improve',
    multiple: true,
    options: {
      design: { trust: 1, quality: 2 },
      mobile: { quality: 2 },
      structure: { information: 2 },
      speed: { quality: 2 },
      search: { visibility: 2 },
      inquiries: { conversion: 2 },
      booking: { conversion: 2, operations: 1 },
      content: { information: 2 },
      everything: { quality: 3 },
    },
  },
  {
    id: 'goal',
    multiple: true,
    options: {
      inquiries: { conversion: 2 },
      bookings: { conversion: 2, operations: 1 },
      discover: { visibility: 2 },
      trust: { trust: 2 },
      explain: { information: 2 },
      contact: { conversion: 2 },
      present: { trust: 2 },
      reduceQuestions: { operations: 2 },
      improveSite: { quality: 2 },
      other: {},
    },
  },
  {
    id: 'timeline',
    multiple: false,
    options: { asap: {}, weeks: {}, oneTwoMonths: {}, threeMonths: {}, none: {} },
  },
  {
    id: 'budget',
    multiple: false,
    options: { under200: {}, r200: {}, r400: {}, r800: {}, r1500: {}, unsure: {} },
  },
];

export type Answers = Record<string, string[]>;

const addOns: Record<Category, string> = {
  visibility: 'SEO Foundation',
  trust: 'Professional design and trust elements',
  information: 'Clear service and information pages',
  conversion: 'Contact and inquiry pathways (WhatsApp, calls to action)',
  operations: 'FAQ and self-service information',
  quality: 'Website redesign',
};

const baseSolution: Record<string, string> = {
  tourism: 'Tourism & Travel website',
  adventure: 'Tourism & Travel website',
  hotel: 'Hotel & Restaurant website',
  restaurant: 'Hotel & Restaurant website',
  ngo: 'NGO website',
};

export interface Diagnosis {
  scores: Record<Category, number>;
  primary: Category;
  secondary?: Category;
  recommendation: string;
  leadScore: number;
  leadStatus: 'High priority' | 'Qualified' | 'New';
}

export function diagnose(answers: Answers, decision?: string): Diagnosis {
  const scores: Record<Category, number> = {
    visibility: 0, trust: 0, information: 0, conversion: 0, operations: 0, quality: 0,
  };
  const hasSite = answers.hasWebsite?.[0] === 'yes';

  for (const q of questions) {
    if (q.id === 'improve' && !hasSite) continue;
    for (const choice of answers[q.id] ?? []) {
      for (const [cat, pts] of Object.entries(q.options[choice] ?? {})) scores[cat as Category] += pts ?? 0;
    }
  }
  // Customers do not find them through search at all.
  if ((answers.find ?? []).length && !answers.find.includes('google')) scores.visibility += 2;

  const ranked = (Object.keys(scores) as Category[]).sort((a, b) => scores[b] - scores[a]);
  const primary = ranked[0];
  const secondary = scores[ranked[1]] > 0 ? ranked[1] : undefined;

  const industry = answers.industry?.[0] ?? 'other';
  const base = hasSite
    ? primary === 'quality' ? 'Website redesign' : 'Website improvement'
    : baseSolution[industry] ?? 'Business website';
  const extras = [primary, secondary]
    .filter((c): c is Category => !!c && scores[c] > 0)
    .map((c) => addOns[c])
    .filter((x) => x.toLowerCase() !== base.toLowerCase());
  const recommendation = [base, ...extras].join(' + ');

  // Lead score out of 10.
  let lead = 0;
  const problems = (answers.problem ?? []).filter((p) => p !== 'other');
  if (problems.length) lead += 2;
  const budget = answers.budget?.[0];
  if (budget && !['under200', 'unsure'].includes(budget)) lead += 2;
  else if (budget === 'unsure') lead += 1;
  const timeline = answers.timeline?.[0];
  if (timeline && ['asap', 'weeks', 'oneTwoMonths'].includes(timeline)) lead += 2;
  else if (timeline === 'threeMonths') lead += 1;
  if (decision === 'yes') lead += 2;
  else if (decision === 'shared') lead += 1;
  if (industry !== 'other') lead += 1;
  if (hasSite && (answers.improve ?? []).length) lead += 1;

  const leadStatus = lead >= 8 ? 'High priority' : lead >= 5 ? 'Qualified' : 'New';
  return { scores, primary, secondary, recommendation, leadScore: lead, leadStatus };
}

export const makeReference = () => {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TXP-${ymd}-${rand}`;
};
