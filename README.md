# AyaanDrive

This project provides a very small "Google Drive"-like app. Files uploaded through the web interface are committed to a GitHub repository so they can be downloaded later.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

The application will run on [http://localhost:3000](http://localhost:3000).

Uploads are pushed to your GitHub repository under the `files/` directory.
Set the following environment variables before running the server:

```bash
export GITHUB_TOKEN=<your token>
export GITHUB_USERNAME=<github username>
export REPO_NAME=<repo name>
```

You can place these in a `.env` file as well.

## Usage

* Visit `/upload.html` to upload a file.
* Visit `/download.html` to see a list of uploaded files and download them.
