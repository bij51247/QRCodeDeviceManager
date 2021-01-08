new Vue({
  el: '#app',
  data: function () {
    return {
      ready: true,
      video: null,
      canvas: null,
      context: null,
      uuid: '',
      completed: false,
      device_name: null,
      flag: null,
      error_message: '',
      user: '',
      location: '',
    }
  },
  computed: {
    hasUuid() {

      return (this.uuid !== '');

    },
    checkReady() {
      return [this.location, this.user];
    }
  },
  watch: {
    checkReady(ready) {
      if (ready[0] != '' && ready[1] != '') {
        this.ready = false;
      }else{
        this.ready = true;
      }
    }
  },
  methods: {
    retry: function () {
      console.log("OK");
      this.completed = false;
      this.uuid = ''
    },
    renderFrame() {

      requestAnimationFrame(this.renderFrame);   // 描画を繰り返す

      if (!this.hasUuid && !this.completed) { // まだQRコードが読み込まれていない場合

        const video = this.video;
        const canvas = this.canvas;
        const context = this.context;

        if (video.readyState === video.HAVE_ENOUGH_DATA) {

          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            this.uuid = code.data;
            console.log(this.uuid);
            axios.post('/read', { uuid: this.uuid })
              .then((response) => {
                console.log(response.data);
                const result = response.data;
                if (result == 'このQRコードは登録されていません') {
                  this.error_message = result;
                }
                this.device_name = response.data.device_name;
                this.flag = response.data.flag;
                this.uuid = response.data.uuid;
                // this.flag = false;
                console.log(user);
                if (result) {
                  this.completed = true;

                  // location.href = '/user'; // ここでリダイレクト
                  this.video.pause();
                } else {

                  console.log('ログイン失敗..');

                }

              })
              .catch((error) => { })
              .then(() => {
                //   this.uuid = '';
              });

          }

        }

      }

    }

  },
  mounted() {

    this.video = document.createElement('video');
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {

        this.video.srcObject = stream;
        this.video.play();
        requestAnimationFrame(this.renderFrame);

      });

  }
});
