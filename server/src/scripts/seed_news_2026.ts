import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const articles2026 = [
  {
    title: "ECI Reports Record 72.4% Voter Turnout in General Elections 2026",
    summary: "The Election Commission of India has officially announced that the 2026 General Elections saw the highest ever voter participation in history.",
    content: "Chief Election Commissioner Rajiv Kumar stated that the massive turnout is a testament to the strengthening of democratic roots in India. The surge was particularly high in rural areas and among first-time voters, thanks to the new digital awareness campaigns and simplified registration processes.",
    category: "Election Updates",
    published_at: "2026-04-28T10:00:00Z"
  },
  {
    title: "Digital Voter ID System Successfully Authenticates 150 Million Voters",
    summary: "The implementation of the 'Holographic Digital Identity' for 2026 polls has drastically reduced verification times at polling booths.",
    content: "The ECI's new blockchain-backed verification system has eliminated fraudulent voting attempts in major urban centers. Voters expressed high satisfaction with the 'Scan & Vote' feature which reduced queue times from hours to minutes.",
    category: "Voter Awareness",
    published_at: "2026-04-29T09:30:00Z"
  },
  {
    title: "Peaceful Polling Concludes in Sensitive Constituencies",
    summary: "For the first time in decades, polling in historically sensitive areas was conducted without a single incident of violence.",
    content: "Unprecedented security measures, including 24/7 drone surveillance and decentralized rapid response teams, ensured a safe environment for voters. Local community leaders praised the ECI for building trust among marginalized populations.",
    category: "Security",
    published_at: "2026-04-27T18:45:00Z"
  },
  {
    title: "New AI Assistant 'ElectIQ' Handles 5 Million Voter Queries in Real-Time",
    summary: "The ECI's official AI assistant has been a game-changer for voter education during the 2026 election cycle.",
    content: "From locating polling booths to explaining candidate manifestos, ElectIQ provided instant answers in 22 regional languages. This initiative significantly boosted the participation of citizens who previously found election information too complex.",
    category: "Voter Awareness",
    published_at: "2026-04-30T08:00:00Z"
  },
  {
    title: "International Observers Label 2026 Polls as 'Global Gold Standard'",
    summary: "Delegates from over 50 countries observed the 2026 Indian Elections and praised the technological advancements.",
    content: "The transparency of the VVPAT auditing process and the speed of result compilation were highlighted as major achievements. The ECI has been invited to consult for upcoming elections in several European and African nations.",
    category: "Press Release",
    published_at: "2026-04-30T14:20:00Z"
  }
];

async function seed2026News() {
  console.log('Seeding 2026 specific news...');
  
  const newsItems = articles2026.map(item => ({
    ...item,
    author: 'ECI Official Bureau',
    content: item.content + " ECI remains committed to free and fair elections."
  }));

  const { error } = await supabase.from('news').insert(newsItems);
  
  if (error) {
    console.error('Error seeding news:', error);
  } else {
    console.log('Successfully seeded latest 2026 news articles.');
  }
}

seed2026News();

