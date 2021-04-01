const Queue = require('bull');
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const submissionQueue = new Queue('submissions', REDIS_URL);

module.exports = submissionQueue;
