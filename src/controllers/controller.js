import * as helpers from '../utility/helpers.util.js';
import { bounties } from '../model/data.js';

const API_KEY = process.env.API_KEY;
const claims = [];

// --- Middleware ---

export const requireApiKey = (req, res, next) => {
    const key = req.header("x-api-key");

    if (key !== API_KEY) {
        return res.status(401).json({
            error: "Unauthorized",
            message: "Missing or invalid x-api-key"
        });
    }

    return next();
};

// --- Controllers ---

export const getStatus = (req, res) => {
    const time = helpers.nowIso();
    return res.status(200).json({
        ok: true,
        service: "Quest Board API",
        time
    });
};

export const listBounties = (req, res) => {
    const region = req.query.region?.toLowerCase() || "";
    const threat = req.query.threat?.toLowerCase() || "";
    const status = req.query.status?.toLowerCase() || "";

    const page = Math.max(1, helpers.clampInt(req.query.page, 1));
    const pageSize = Math.min(25, Math.max(1, helpers.clampInt(req.query.pageSize, 5)));

    let results = bounties.slice();

    if (region) {
        results = results.filter((b) => b.region === region);
    }
    if (threat) {
        results = results.filter((b) => b.threat === threat);
    }
    if (status) {
        results = results.filter((b) => b.status === status);
    }

    results.sort((a, b) => b.rewardGold - a.rewardGold);

    const total = results.length;
    const start = (page - 1) * pageSize;

    return res.status(200).json({
        page,
        pageSize,
        total,
        data: results.slice(start, start + pageSize)
    });
};

export const getBountyById = (req, res) => {
    const id = String(req.params.id);
    const bounty = bounties.find((b) => b.id === id);

    if (!bounty) {
        return res.status(404).json({
            error: "NotFound",
            message: `No bounty with id '${id}'`
        });
    }

    return res.status(200).json(bounty);
};

export const createBounty = (req, res) => {
    const { title, region, threat, rewardGold, postedBy, details } = req.body || {};

    const errors = [];

    if (!title || title.trim().length < 6) {
        errors.push({ field: "title", message: "Title must be at least 6 characters." });
    }

    const allowedRegions = new Set(["swamp", "mountains", "plains", "forest", "coast", "desert"]);
    if (!allowedRegions.has(region)) {
        errors.push({ field: "region", message: "Invalid region." });
    }

    const allowedThreats = new Set(["low", "medium", "high"]);
    if (!allowedThreats.has(threat)) {
        errors.push({ field: "threat", message: "Invalid threat level." });
    }

    if (!Number.isFinite(rewardGold) || rewardGold <= 0) {
        errors.push({ field: "rewardGold", message: "rewardGold must be positive." });
    }

    if (errors.length > 0) {
        return res.status(400).json({
            error: "ValidationError",
            errors
        });
    }

    const createdAt = helpers.nowIso();

    const bounty = {
        id: `b_${helpers.randomId()}`,
        title: title.trim(),
        region,
        threat,
        rewardGold,
        postedBy: postedBy || "Anonymous",
        details: details || "",
        status: "open",
        createdAt,
        updatedAt: createdAt
    };

    bounties.push(bounty);

    return res.status(201).json(bounty);
};

export const claimBounty = (req, res) => {
    const id = String(req.params.id);
    const bounty = bounties.find((b) => b.id === id);

    if (!bounty) {
        return res.status(404).json({
            error: "NotFound",
            message: `No bounty with id '${id}'`
        });
    }

    if (bounty.status !== "open") {
        return res.status(409).json({
            error: "Conflict",
            message: "Bounty is not open."
        });
    }

    const claimant = req.body?.claimant?.trim();
    if (!claimant) {
        return res.status(400).json({
            error: "ValidationError",
            errors: [{ field: "claimant", message: "claimant is required." }]
        });
    }

    bounty.status = "claimed";
    bounty.updatedAt = helpers.nowIso();

    const claim = {
        id: `c_${helpers.randomId()}`,
        bountyId: id,
        claimant,
        note: req.body?.note || "",
        claimedAt: helpers.nowIso()
    };

    claims.push(claim);

    return res.status(201).json({ bounty, claim });
};

export const listClaims = (req, res) => {
    const bountyId = req.query.bountyId || "";

    let results = claims.slice();

    if (bountyId) {
        results = results.filter((c) => c.bountyId === bountyId);
    }

    return res.status(200).json({
        total: results.length,
        data: results
    });
};
