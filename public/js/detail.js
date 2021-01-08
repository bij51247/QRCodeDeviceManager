
new Vue({
  el: '#app',
  data: function () {
    return {
    }
  },
  methods: {
    async getQRcode() {
      var qrImgSrc = document.getElementById('qrImgSrc').getAttribute('src');
      const response = await axios.get(qrImgSrc, { responseType: "blob" });
      this.downloadImage(response);
    },
    downloadImage(response) {
      var deviceName = document.getElementById('deviceName').getAttribute('value');
      let dLink = document.createElement('a');
      const dataUrl = URL.createObjectURL(response.data);
      var fileName = deviceName + `.${response.data.type.replace("image/", "")}`
      dLink.href = dataUrl;

      document.body.insertAdjacentElement('beforeend', dLink);
      dLink.download = fileName;
      dLink.click();
      dLink.remove();

      setTimeout(function () {
        window.URL.revokeObjectURL(dataUrl);
      }, 1000);
    }
  }
}) 