async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/upload', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();
  if (response.ok) {
    alert(`File uploaded! View it at: ${result.url}`);
  } else {
    alert(`Upload failed: ${result.error || 'Unknown error'}`);
  }
}

document.getElementById('uploadForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const fileInput = document.getElementById('fileInput');
  if (fileInput.files.length > 0) {
    uploadFile(fileInput.files[0]);
  } else {
    alert('Please select a file!');
  }
});
