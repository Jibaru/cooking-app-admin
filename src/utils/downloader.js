const downloadBase64Url = (base64Url, fileName, mimeType) => {
  if (mimeType && mimeType.includes("image")) {
    const link = document.createElement("a");
    link.download = fileName;
    link.href = base64Url;
    link.click();
  }
};

export { downloadBase64Url };
