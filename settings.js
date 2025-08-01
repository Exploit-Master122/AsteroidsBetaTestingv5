window.settings = {
  showFPS: true,
  cloaker: {
    enabled: false,
    title: "Home"
  }
};

document.getElementById("fpsToggle").addEventListener("change", function () {
  window.settings.showFPS = this.checked;
});

function activateCloak() {
  document.title = window.settings.cloaker.title;
}

function openAboutBlankCloak() {
  const win = window.open("about:blank", "_blank");
  if (win) {
    const doc = win.document;
    doc.write("<title>Home</title><iframe src='" + window.location.href + "' style='border:none;width:100vw;height:100vh;'></iframe>");
    doc.close();
  } else {
    alert("Popup blocked. Please allow popups.");
  }
}