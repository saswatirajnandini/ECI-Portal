"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv.config({ path: path_1.default.join(__dirname, '../../.env') });
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceKey);
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
    }
    else {
        console.log('Successfully seeded 500 more news items.');
    }
}
seedMoreNews();
