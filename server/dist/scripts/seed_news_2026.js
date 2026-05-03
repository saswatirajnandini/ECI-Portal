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
    }
    else {
        console.log('Successfully seeded latest 2026 news articles.');
    }
}
seed2026News();
