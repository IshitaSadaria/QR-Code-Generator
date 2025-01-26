document.addEventListener("DOMContentLoaded", () => {
  const qrcodeContainer = document.getElementById("qrcode");
  const urlInput = document.getElementById("url-input");
  const generateBtn = document.getElementById("generate-btn");
  const downloadBtn = document.getElementById("download-btn");
  const copyBtn = document.getElementById("copy-btn");

  let qrCode;

  generateBtn.addEventListener("click", () => {
    const url = urlInput.value.trim();
    if (!url) {
      alert("Please enter a URL");
      document.querySelector(".qrcode-container").style.display = "none";
      document.querySelector(".actions").style.display = "none";
      return;
    }

    qrcodeContainer.innerHTML = "";
    qrCode = new QRCode(qrcodeContainer, {
      text: url,
      width: 128,
      height: 128,
    });
    document.querySelector(".qrcode-container").style.display = "block";
    document.querySelector(".actions").style.display = "block";
  });

  downloadBtn.addEventListener("click", () => {
    if (!qrCode) {
      alert("Please generate a QR code first");
      return;
    }

    const qrCanvas = qrcodeContainer.querySelector("canvas");
    const dataUrl = qrCanvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "qrcode.png";
    link.click();
  });

  copyBtn.addEventListener("click", async () => {
    if (!qrCode) {
      alert("Please generate a QR code first");
      return;
    }

    const qrCanvas = qrcodeContainer.querySelector("canvas");
    const dataUrl = qrCanvas.toDataURL("image/png");

    try {
      await navigator.clipboard.writeText(dataUrl);
      alert("QR code copied to clipboard as a data URL");
    } catch (error) {
      console.error("Failed to copy QR code:", error);
      alert("Copying QR code failed. Please try again.");
    }
  });
});
