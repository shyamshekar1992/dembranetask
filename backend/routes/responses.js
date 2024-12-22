const express = require("express");
const router = express.Router();
const Response = require("../models/Response");

// POST route to submit responses
router.post("/", async (req, res) => {
  try {
    const { linkId, responses } = req.body;
    const response = await Response.create({ linkId, responses });
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET route to fetch responses by linkId
router.get("/", async (req, res) => {
  try {
    const { linkId } = req.query;

    if (!linkId) {
      return res.status(400).json({ message: "Missing linkId" });
    }

    const responses = await Response.find({ linkId });

    if (responses.length === 0) {
      return res.status(404).json({ message: "Responses not found!" });
    }

    res.status(200).json(responses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
