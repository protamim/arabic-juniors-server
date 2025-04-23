import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  console.log('Get / hit')
  res.send({
    message: `You're landed in an empty ocean! 😊`,
    today: `${Date.now()}`,
  });
});

export default router;
