const newUploadHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#upload-name').value.trim();
    const description = document.querySelector('#upload-desc').value.trim();
    const image = document.querySelector('#file-upload').value.trim();
  
    if (title && description) {
      const response = await fetch(`/api/image`, {
        method: 'POST',
        body: JSON.stringify({ title, description, image }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create upload');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/uploads/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete upload');
      }
    }
  };
  
  document
    .querySelector('.new-upload-form')
    .addEventListener('submit', newUploadHandler);
  
  document
    .querySelector('.upload-list')
    .addEventListener('click', delButtonHandler);
  