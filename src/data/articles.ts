export type Article = {
  id: string;
  title: string;
  keyword: string;
  keywordVolume: string;
  wordCount: number;
  createdAt: string;
  status: 'published' | 'scheduled' | 'archived' | 'generated';
};

export const articles: Article[] = [
  {
    id: "1",
    title: "How to Improve Your Skills in League of Legends",
    keyword: "league of legends",
    keywordVolume: "[2240000]",
    wordCount: 4575,
    createdAt: "20 hours ago",
    status: "published"
  },
  {
    id: "2",
    title: "How to Master Last Hitting in League of Legends",
    keyword: "league of legends",
    keywordVolume: "[2240000]",
    wordCount: 3480,
    createdAt: "21 hours ago",
    status: "published"
  },
  {
    id: "3",
    title: "7 Tips for Better Teamplay in League of Legends",
    keyword: "league of legends",
    keywordVolume: "[2240000]",
    wordCount: 2676,
    createdAt: "a day ago",
    status: "published"
  },
  {
    id: "4",
    title: "Top Virtual Executive Assistant Services (2024)",
    keyword: "virtual executive assistant",
    keywordVolume: "[1900]",
    wordCount: 2408,
    createdAt: "1 Oct, 24",
    status: "published"
  },
  {
    id: "5",
    title: "Unlimited Graphics Design Solutions",
    keyword: "unlimited graphic design services",
    keywordVolume: "[390]",
    wordCount: 1793,
    createdAt: "---",
    status: "generated"
  },
  {
    id: "6",
    title: "Top Amazon Payment Methods for Quick Access to Funds",
    keyword: "amazon payment methods",
    keywordVolume: "[3600]",
    wordCount: 2647,
    createdAt: "---",
    status: "generated"
  },
  {
    id: "7",
    title: "Backlinks 101: What are backlinks and why they're important [Free template]",
    keyword: "backlinks",
    keywordVolume: "[8100]",
    wordCount: 2261,
    createdAt: "---",
    status: "generated"
  },
  {
    id: "8",
    title: "7 Leading AI SEO Tools in 2024 (Ranked & Compared)",
    keyword: "ai seo software",
    keywordVolume: "[880]",
    wordCount: 1543,
    createdAt: "---",
    status: "generated"
  },
  {
    id: "9",
    title: "Unlimited Graphic Design Services You Can Rely On",
    keyword: "unlimited graphic design services",
    keywordVolume: "[390]",
    wordCount: 1974,
    createdAt: "---",
    status: "generated"
  }
];