let uploadBTN = document.querySelector('#uploadBTN');

const uploadImageHandler = async (event) => {
  event.preventDefault();

  const image = document.querySelector('#fileUpload');
  console.log(image);
  const formData = new FormData();

  formData.append('image', image);

  const response = await fetch('./api/image', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

uploadBTN.addEventListener('click', uploadImageHandler);
