import { Request, Response } from 'express';

export const getLocalElections = (req: Request, res: Response) => {
  const { zip, state } = req.query;

  // Mock local elections / polling booth data
  const localInfo = {
    pollingStation: {
      name: "Government High School, Sector 12",
      address: "Sector 12, Main Road",
      distance: "1.2 km"
    },
    upcomingElections: [
      { name: "Municipal Corporation Elections", date: "2024-11-15" }
    ]
  };

  res.status(200).json(localInfo);
};
