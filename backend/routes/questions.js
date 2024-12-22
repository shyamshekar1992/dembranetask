const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// POST route to create questions
router.post("/", async (req, res) => {
  try {
    const { linkId, questions } = req.body;
    const question = await Question.create({ linkId, questions });
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET route to fetch questions by linkId
router.get("/", async (req, res) => {
  try {
    const { linkId } = req.query;

    console.log("Received linkId:", linkId); // Log the linkId being received.

    if (!linkId) {
      return res.status(400).json({ message: "Missing linkId" });
    }

    const question = await Question.findOne({ linkId });

    console.log("Question found:", question); // Log the result of the find query.

    if (!question) {
      return res.status(404).json({ message: "Questions not found!" });
    }

    res.status(200).json(question);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
