const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

//   const arrayBufferToBase64 = (buffer) => {
//     var binary = '';
//     var bytes = [].slice.call(new Uint8Array(buffer));
//     bytes.forEach((b) => binary += String.fromCharCode(b));
//     return window.btoa(binary);
// };

let arrayBufferToBase64 = (buffer) => {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  console.log(binary);
  return window.btoa(binary);
};


  export {convertBase64,
    arrayBufferToBase64,
  }