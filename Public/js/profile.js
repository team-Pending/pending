const newUploadHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#upload-name').value.trim();
  const description = document.querySelector('#upload-desc').value.trim();
  const image = document.querySelector('#file-upload');

  if (title && description) {
    const form = new FormData();
    form.append('image', image.files[0]);

    const options = {
      method: 'POST',
    };

    options.body = form;

    fetch('http://localhost:3001/api/image', options)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to create upload');
        }
      })
      .catch((err) => console.error(err));
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

document.querySelector('.new-upload-form').addEventListener('submit', newUploadHandler);

document.querySelector('.upload-list').addEventListener('click', delButtonHandler);
