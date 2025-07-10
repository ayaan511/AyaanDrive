const dotenv = require('dotenv');
dotenv.config();

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'ayaan511';
const REPO_NAME = process.env.REPO_NAME || 'AyaanDrive';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

module.exports = { GITHUB_USERNAME, REPO_NAME, GITHUB_TOKEN };
