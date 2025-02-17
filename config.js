import dotenv from "dotenv";
dotenv.config();

const GITHUB_USERNAME = "ayaan511";
const REPO_NAME = "AyaanDrive";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Now using .env

export { GITHUB_USERNAME, REPO_NAME, GITHUB_TOKEN };
