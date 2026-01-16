import express from "express";
import * as controller from "../controllers/controller.js";

const router = express.Router();

// Public route
router.get("/status", controller.getStatus);

// Protected routes
router.use(controller.requireApiKey);

router.get("/bounties", controller.listBounties);
router.get("/bounties/:id", controller.getBountyById);
router.post("/bounties", controller.createBounty);
router.post("/bounties/:id/claim", controller.claimBounty);
router.get("/claims", controller.listClaims);

export default router;