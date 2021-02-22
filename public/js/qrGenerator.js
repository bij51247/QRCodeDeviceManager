new Vue({
  el: '#app',
  data: {
    name: '',
    picture: null,
    uuid: '',
    image_src: null,
    generateReady: true,
    registReady: true,
    count: 0,
  },
  computed: {
    checkGenerateReady() {
      return [this.name, this.picture];
    }
  },
  watch: {
    name: function (val) {
      console.log(this.picture)
      console.log(this.count);
      this.image_src = ''
      this.count = 0
    },
    count: function (val) {
      if (this.count > 0) {
        this.registReady = false;
      } else {
        this.registReady = true;
      }
    },
    checkGenerateReady(e) {
      if (e[0] != '' && e[1] != null) {
        this.generateReady = false;
      } else {
        this.generateReady = true;
      }
    }
  },
  methods: {
    async getQRcode() {
      const response = await axios.get(this.image_src, { responseType: "blob" });
      this.downloadImage(response);
    },
    downloadImage(response) {
      let dLink = document.createElement('a');
      const dataUrl = URL.createObjectURL(response.data);
      var fileName = this.name + `.${response.data.type.replace("image/", "")}`
      dLink.href = dataUrl;

      document.body.insertAdjacentElement('beforeend', dLink);
      dLink.download = fileName;
      dLink.click();
      dLink.remove();

      setTimeout(function () {
        window.URL.revokeObjectURL(dataUrl);
      }, 1000);

    },
    getImageSrc: function () {
      this.count++;
      axios.post('/generate', { name: this.name, uuid: this.uuid })
        .then((response) => {
          const result = response;
          if (result) {
            this.image_src = result.data;
            console.log(result.data);
          } else {
            console.log("failed...")
          }
        });
    }
  },
  mounted() {
    let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
      switch (chars[i]) {
        case "x":
          chars[i] = Math.floor(Math.random() * 16).toString(16);
          break;
        case "y":
          chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
          break;
      }
    }
    this.uuid = chars.join("");
  }
}) 