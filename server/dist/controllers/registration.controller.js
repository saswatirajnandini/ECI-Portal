"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerVoter = exports.setReminder = exports.getRegistrationInfo = void 0;
const getRegistrationInfo = (req, res) => {
    const { stateCode } = req.params;
    // Mock data for registration
    const registrationInfo = {
        state: stateCode,
        deadline: "2024-03-31",
        requirements: ["Must be a citizen", "Must be 18 years old by election day", "Valid ID required"],
        registrationUrl: `https://voters.eci.gov.in/`
    };
    res.status(200).json(registrationInfo);
};
exports.getRegistrationInfo = getRegistrationInfo;
const setReminder = (req, res) => {
    const { email, phone, state, deadline } = req.body;
    // Mock reminder setting
    res.status(200).json({ success: true, reminderId: `rem-${Date.now()}` });
};
exports.setReminder = setReminder;
const registerVoter = (req, res) => {
    const { name, mobile, voterId, aadhaarId } = req.body;
    console.log('Received new voter registration:', { name, mobile, voterId, aadhaarId });
    // Mock DB Insertion 
    // In a real scenario, this is where we'd insert into Supabase
    res.status(201).json({ success: true, message: "Registration successful" });
};
exports.registerVoter = registerVoter;
