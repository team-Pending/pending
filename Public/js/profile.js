const newUploadHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#upload-name').value.trim();
  const description = document.querySelector('#upload-desc').value.trim();
  const image = document.querySelector('#file-upload');

  if (title && description) {
    const form = new FormData();
    form.append('image', image.files[0]);
    form.append('title', title);
    form.append('description', description);
    console.log(Array.from(form));
    const options = {
      method: 'POST',
    };

    options.body = form;

    console.log(form);
    fetch('http://localhost:3001/api/image', options)
      .then((response) => {
        console.log(response);

        if (response.ok) {
          // document.location.replace('/profile');
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
    // const {deletePhoto} = require('../controllers/s3');
    // deletePhoto(id);

    //   const response = await fetch(`/api/notes/${id}`, {
    //     method: 'DELETE',
    //   });

    //   if (response.ok) {
    //     document.location.replace('/profile');
    //   } else {
    //     alert('Failed to delete upload');
    //   }
  }
};
const newUploadFormElement = document.querySelector('.new-upload-form');
console.log(newUploadFormElement);
newUploadFormElement.addEventListener('submit', newUploadHandler);
const delButtonHandlerElement = document.querySelector('.btn-danger');
delButtonHandlerElement.addEventListener('click', delButtonHandler);
