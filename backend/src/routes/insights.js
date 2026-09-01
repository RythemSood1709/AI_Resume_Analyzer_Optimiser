const asyncHandler = require("../utils/asyncHandler");
const { requireAuth } = require("../middleware/auth");

const Resume = require("../models/Resume");
const ResumeVersion = require("../models/ResumeVersion");
const Analysis = require("../models/Analysis");

const router = express.Router();

router.use(requireAuth);

function topN(items, getKey, n = 8) {
  const counts = new Map();
  const extra = new Map();

  for (const item of items) {
    const key = getKey(item);

    if (!key) continue;

    counts.set(key, (counts.get(key) || 0) + 1);
    if (!extra.has(key)) extra.set(key, item);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, count]) => ({ key, count, sample: extra.get(key) }));
}

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const resumes = await Resume.find({ userId })
      .sort({ updatedAt: -1 })
      .lean();

    const resumeMap = new Map(resumes.map((r) => [r._id.toString(), r]));

    const analyses = await Analysis.find({ userId })
      .sort({ createdAt: 1 })
      .lean();

    if (!analyses.length) {
      return res.json({
        empty: true,
        totalAnalyses: 0,
        resumes: resumes.map((r) => ({
          _id: r._id,
          title: r.title,
          latestVersionNumber: r.latestVersionNumber,
        })),
      });
    }

    const totalScore = analyses.reduce((s, a) => s + a.atsScore, 0);
    const averageScore = Math.round(totalScore / analyses.length);

    const bestEntry = analyses.reduce((best, a) =>
      a.atsScore > best.atsScore ? a : best,
    );

    const bestResume = resumeMap.get(bestEntry.resumeId.toString());


    //score trend (all analyses chronologically)
    const scoreTrend = analyses.map((a) => ({
      at: a.createdAt,
      score: a.atsScore,
      resumeId: a.resumeId,
      resumeTitle: resumeMap.get(a.resumeId.toString())?.title || "Resume",
    }));

    //issue frequency 
    const allIssues = analyses.flatMap((a) => a.issues || []);

    const topIssues = topN(
      allIssues,
      (i) => i.title?.trim().toLowerCase(),
      6,
    ).map((row) => ({
      title: row.sample?.title || row.key,
      count: row.count,
      severity: row.sample?.severity || "medium",
    }));
  }),
);
