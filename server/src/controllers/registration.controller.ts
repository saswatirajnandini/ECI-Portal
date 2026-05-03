import { Request, Response } from 'express';

export const getRegistrationInfo = (req: Request, res: Response) => {
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

export const setReminder = (req: Request, res: Response) => {
  const { email, phone, state, deadline } = req.body;

  // Mock reminder setting
  res.status(200).json({ success: true, reminderId: `rem-${Date.now()}` });
};

export const registerVoter = (req: Request, res: Response) => {
  const { name, mobile, voterId, aadhaarId } = req.body;

  console.log('Received new voter registration:', { name, mobile, voterId, aadhaarId });

  // Mock DB Insertion 
  // In a real scenario, this is where we'd insert into Supabase

  res.status(201).json({ success: true, message: "Registration successful" });
};
