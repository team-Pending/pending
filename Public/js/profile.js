// modal
var modal = document.getElementById("mymodal");
var span = document.getElementsByClassName("close");

function showModal() {
    modal.style.display="block";
}

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

const newUploadHandler = async (event) => {
  event.preventDefault();
console.log("in function")
  const title = document.querySelector('#upload-name').value.trim();
  const description = document.querySelector('#upload-desc').value.trim();
  const image = document.querySelector('#file-upload');
console.log(title)
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
    
    console.log(form)
    fetch('http://localhost:3001/api/image', options)
    // fetch('https://mediaphile.herokuapp.com/api/image', options)
      .then((response) => { 
        console.log(response);

        if (response.ok) {
          
          showModal();
          document.replace('/')
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
      showModal()
      document.location.replace('/profile');
    } else {
      alert('Failed to delete upload');
    }
  }
};

const newUploadFormElement = document.querySelector('.new-upload-form');
console.log("event");
newUploadFormElement.addEventListener('submit', newUploadHandler);
const delButtonHandlerElement = document.querySelector('.btn-danger');
delButtonHandlerElement.addEventListener('click', delButtonHandler);
