const { spawn } = require('child_process');
const path = require('path');

// Helper function to call the Python RAG screener
const runAiScreening = (resumeText, jobDescription) => {
  return new Promise((resolve, reject) => {
    // Points to backend/services/ai_screener.py
    const scriptPath = path.join(__dirname, '../../services/ai_screener.py');

    const pythonProcess = spawn('python', [
      scriptPath,
      resumeText,
      jobDescription
    ]);

    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`Python process exited with code ${code}: ${errorOutput}`));
      }
      try {
        resolve(JSON.parse(output));
      } catch (err) {
        reject(new Error(`Failed to parse AI output: ${output}`));
      }
    });
  });
};

const ScreenCandidate = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ msg: 'Both resume text and job description are required.' });
    }

    const aiResult = await runAiScreening(resumeText, jobDescription);

    return res.status(200).json({
      success: true,
      data: aiResult
    });
  } catch (error) {
    console.error('AI Screening Error:', error.message);
    return res.status(500).json({ msg: 'Server error during AI screening.' });
  }
};

module.exports = ScreenCandidate;
