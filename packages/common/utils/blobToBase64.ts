export const blobToBase64 = (blobData: Blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blobData);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const dataUrl = reader.result;
      const base64 = dataUrl && (dataUrl as string).split(',')[1];
      base64
        ? resolve(base64)
        : reject(Error('There was an error converting blob to base64 string.'));
    };
  });
};
