const uploadImageHandler = async (event) => {
  const image = document.querySelector('#fileUpload');
  const form = new FormData();
  form.append('image', image.files[0]);

  const options = {
    method: 'POST',
  };

  options.body = form;

    // local for testing, this branch should be on local by default
    // fetch('http://localhost:3001/api/image', options)
    // heroku for live
    fetch('https://mediaphile.herokuapp.com/api/image', options)
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

uploadBTN.addEventListener('click', uploadImageHandler);
