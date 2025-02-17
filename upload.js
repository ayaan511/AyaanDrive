const GLITCH_API_URL = "https://ayaandrive-backend.glitch.me/upload";

async function uploadFile(file) {
    const reader = new FileReader();

    reader.onload = async function (event) {
        const content = btoa(event.target.result); // Convert to Base64

        const response = await fetch(GLITCH_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                filename: file.name,
                content: content
            })
        });

        const result = await response.json();
        if (response.ok) {
            alert(`File uploaded successfully! Download it here: ${result.fileUrl}`);
        } else {
            alert(`Upload failed: ${result.error}`);
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
