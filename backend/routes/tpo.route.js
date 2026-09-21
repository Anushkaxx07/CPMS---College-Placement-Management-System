const express = require('express');

// router after /tpo/
const router = express.Router();

const authenticateToken = require('../middleware/auth.middleware');


// tpo login controller
const Login = require('../controllers/TPO/tpo.login.controller');

const PostJob = require('../controllers/TPO/tpo.post-job.controller');
// Import the new controller
const ScreenCandidate = require('../controllers/TPO/tpo.screen-candidate.controller');



const { AllJobs, DeleteJob, JobData, JobWithApplicants, StudentJobsApplied } = require('../controllers/user/user.all-jobs.controller');

// login post request for student
router.post('/login', Login);
// Add this route (e.g. protected with your authenticateToken middleware)
router.post('/screen-candidate', authenticateToken, ScreenCandidate);
// post job listing data
router.post('/post-job', authenticateToken, PostJob);

// all jobs 
router.get('/jobs',authenticateToken, AllJobs);

// delete job 
router.post('/delete-job',authenticateToken, DeleteJob);

// view a job 
router.get('/job/:jobId', authenticateToken, JobData);

// job with its applicants 
router.get('/job/applicants/:jobId', authenticateToken, JobWithApplicants)

// student jobs applied 
router.get('/myjob/:studentId', authenticateToken, StudentJobsApplied)


module.exports = router;
