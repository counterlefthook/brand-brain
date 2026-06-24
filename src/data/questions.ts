import { FileSection } from '../types';

export const BRAND_FILES: FileSection[] = [
  {
    id: "Brand_Promise",
    fileName: "Brand_Promise.md",
    title: "Brand Promise & Profile",
    description: "Who we are, what we sell, our competitors, our competitive advantage, and what we are not.",
    questions: [
      { id: "bp_1", label: "What is your company name and website?" },
      { id: "bp_2", label: "What is your elevator pitch (1-2 sentences)?" },
      { id: "bp_3", label: "What business are you in? (Define this in one clear sentence)" },
      { id: "bp_4", label: "What business are you explicitly NOT in?" },
      { id: "bp_5", label: "Why do clients choose you over competitors? What is your core brand promise?" },
      { id: "bp_6", label: "What are your top 3 competitors, and what is your distinct advantage over each?" },
      { id: "bp_7", label: "If customers remember only 3 things about your brand, what should they be?" }
    ]
  },
  {
    id: "Audience",
    fileName: "Audience.md",
    title: "Audience",
    description: "Defines the audience so staff and AI tools can create content with the right assumptions, priorities, and tone.",
    questions: [
      { id: "au_1", label: "Who is your primary audience (demographics, psychographics, mindset)?" },
      { id: "au_2", label: "Who is your secondary audience?" },
      { id: "au_3", label: "Who are you explicitly NOT targeting?" },
      { id: "au_4", label: "What does your audience value most when interacting with your category?" },
      { id: "au_5", label: "What creates trust for your audience? (List top 3 signals)" },
      { id: "au_6", label: "What creates hesitation or acts as a barrier to purchase/conversion?" }
    ]
  },
  {
    id: "Brand_style",
    fileName: "Brand_style.md",
    title: "Brand Style & Voice",
    description: "Defines how the brand should sound, read, and behave in written content.",
    questions: [
      { id: "bs_1", label: "Describe your brand voice in 3-5 words (e.g., clear, warm, expert, restrained)." },
      { id: "bs_2", label: "How should your brand NEVER sound? (e.g., boastful, trendy, overly formal)" },
      { id: "bs_3", label: "What are your core writing principles? (e.g., 'Sentence structure should vary', 'Prioritize clarity over flourish')" },
      { id: "bs_4", label: "What are the mandatory terms you must always use?" },
      { id: "bs_5", label: "What are the terms you must NEVER use?" }
    ]
  },
  {
    id: "Keyword_prompt_map",
    fileName: "Keyword and prompt map.md",
    title: "Keyword & Prompt Map",
    description: "Defines the main search, prompt, and intent categories your content should answer.",
    questions: [
      { id: "kw_1", label: "What are the core topics or keywords you want to own in search/AI prompts?" },
      { id: "kw_2", label: "What are the secondary keywords or topics you are happy to be associated with?" },
      { id: "kw_3", label: "What topics do you explicitly want to avoid or NOT be known for?" },
      { id: "kw_4", label: "What are the most common natural-language questions your audience asks?" }
    ]
  },
  {
    id: "Never_Do",
    fileName: "Never Do.md",
    title: "Never Do",
    description: "An ongoing list of things the AI should not do, say, worry about, talk about, consider or recommend.",
    questions: [
      { id: "nd_1", label: "What should the AI NEVER claim or promise about your brand/product?" },
      { id: "nd_2", label: "How should you NEVER position the brand? (e.g., Never position us as a budget option)" },
      { id: "nd_3", label: "What topics or subjects are strictly off-limits for AI to discuss?" },
      { id: "nd_4", label: "List any other strategic 'never do' rules (e.g., 'Never invent statistics', 'Never ignore audience objections')." }
    ]
  }
];
