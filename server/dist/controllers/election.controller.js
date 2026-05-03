"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpcoming = exports.getTimeline = void 0;
const getTimeline = (req, res) => {
    const { year, type, state } = req.query;
    // Mock data for election timeline
    const timeline = {
        phases: [
            { id: 1, name: "Phase 1", date: "2024-04-19", status: "completed" },
            { id: 2, name: "Phase 2", date: "2024-04-26", status: "upcoming" }
        ],
        milestones: [
            { id: 1, title: "Notification", date: "2024-03-20" },
            { id: 2, title: "Last date of nomination", date: "2024-03-27" }
        ]
    };
    res.status(200).json(timeline);
};
exports.getTimeline = getTimeline;
const getUpcoming = (req, res) => {
    const { zip, state } = req.query;
    // Mock data for upcoming elections
    const elections = [
        { id: "gen-2024", name: "General Elections 2024", date: "2024-04-19" },
        { id: "state-mh", name: "Maharashtra Assembly Elections", date: "2024-10-01" }
    ];
    res.status(200).json({ elections });
};
exports.getUpcoming = getUpcoming;
