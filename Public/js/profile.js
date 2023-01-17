// modal
var modal = document.getElementById('mymodal');
var span = document.getElementsByClassName('close')[0];
var btn = document.getElementById('myBtn');

btn.onclick = function () {
  modal.style.display = 'block';
};

span.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

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
    const options = {
      method: 'POST',
    };

    options.body = form;

    // local for testing, this branch should be on local by default
    fetch('http://localhost:3001/api/image', options)
      // heroku for live
      // fetch('https://mediaphile.herokuapp.com/api/image', options)
      .then((response) => {
        if (response.ok) {
          showModal();
          document.replace('/');
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

    const response = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      key: id,
    });

    if (response.ok) {
      showModal();
      document.location.replace('/');
    } else {
      alert('Failed to delete upload');
    }
  }
};
const newUploadFormElement = document.querySelector('.new-upload-form');
newUploadFormElement.addEventListener('submit', newUploadHandler);

document.body.addEventListener('click', function (event) {
  console.log('this button did not register correctly');
  if (event.target.className === 'btn btn-sm btn-danger') {
    console.log('you clicked a button');
    delButtonHandler(event);
  }
});
