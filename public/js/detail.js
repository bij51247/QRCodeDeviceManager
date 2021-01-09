
new Vue({
  el: '#app',
  data: function () {
    return {
      borrowedTime: '',
    }
  },
  computed: {
    getBorrowedTime: function () {
      var borrowedTime = document.getElementById('borrowedTime').getAttribute('src');

      console.log(typeof (borrowedTime));
      // new Date(borrowedTime)
      // var year = borrowedTime.getFullYear();
      // var month = borrowedTime.getMonth() + 1;
      // var day = borrowedTime.getDate();
      console.log(borrowedTime);
      // return this.borrowedTime= year + '年' + month + '月' + '日';
      return;
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