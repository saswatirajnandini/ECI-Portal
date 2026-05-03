import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const categories = ['Election Updates', 'Voter Awareness', 'Notifications', 'Press Release', 'Security'];
const headlines = [
  'ECI Announces Phase 4 Polling Schedule',
  'Voter Turnout Reaches Record High in Southern States',
  'New Digital Identity Verification for Voters Launched',
  'Strict Monitoring of Campaign Spending in Effect',
  'Polling Booth Locations Updated for Urban Areas',
  'ECI Issues Advisory on Social Media Conduct',
  'Special Trains for Voters Announced for Election Week',
  'First-time Voter Enrollment Crosses 10 Million Mark',
  'Advanced EVM VVPAT Systems Deployed Nationwide',
  'Model Code of Conduct: 500 Violations Addressed'
];

async function seedMoreNews() {
  console.log('Seeding more news...');
  
  const newsItems = [];
  for (let i = 0; i < 500; i++) {
    const headline = headlines[i % headlines.length];
    newsItems.push({
      title: `${headline} - Part ${i + 501}`,
      summary: `Detailed report on the latest developments regarding ${headline.toLowerCase()}. ECI ensures transparency and fair play.`,
      content: `Full article content for ${headline}. The Election Commission of India has taken multiple steps to ensure that every citizen can vote safely and securely. This includes infrastructure upgrades, security personnel deployment, and digital integration.`,
      category: categories[i % categories.length],
      author: 'ECI Press Bureau',
      published_at: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString()
    });
  }

  const { error } = await supabase.from('news').insert(newsItems);
  
  if (error) {
    console.error('Error seeding news:', error);
  } else {
    console.log('Successfully seeded 500 more news items.');
  }
}

seedMoreNews();
