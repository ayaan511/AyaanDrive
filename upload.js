import { GITHUB_USERNAME, REPO_NAME, GITHUB_TOKEN } from "./config.js";

async function uploadFile(file) {
    const reader = new FileReader();

    reader.onload = async function (event) {
        const content = btoa(event.target.result); // Encode to base64

        const filePath = `files/${file.name}`;
        const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${filePath}`;

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `token ${GITHUB_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: `Upload ${file.name}`,
                content: content
            })
        });

        const result = await response.json();
        if (response.ok) {
            alert(`File uploaded successfully! Download it here: https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${filePath}`);
        } else {
            alert(`Upload failed: ${result.message}`);
        }
    };

    reader.readAsBinaryString(file);
}

document.getElementById("uploadForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files.length > 0) {
        uploadFile(fileInput.files[0]);
    } else {
        alert("Please select a file!");
    }
});
