new Vue({
  el: '#app',
  data: {
    name: null,
    uuid: '',
    image_src: null,
  },
  methods: {
    getImageSrc: function () {
      // console.log("OK");
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