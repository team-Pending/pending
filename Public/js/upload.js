let uploadBTN = document.querySelector('#uploadBTN');

const uploadImageHandler = async (event) => {
  event.preventDefault();

  const image = document.querySelector('#fileUpload');

  const response = await fetch('/api/image', {
    method: 'POST',
    body: JSON.stringify({ image }),
    headers: { 'Content-Type': 'application/json' },
  });
};

uploadBTN.addEventListener('click', uploadImageHandler);
