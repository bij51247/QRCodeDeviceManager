$(function () {
  var file = null; // 選択ファイルが格納される変数
  var blob = null; // 画像(BLOBデータ)が格納される変数
  var base64 = null;
  const THUMBNAIL_MAX_WIDTH = 500; // 画像がヨコ長の場合、横サイズがこの値になるように縮小される
  const THUMBNAIL_MAX_HEIGHT = 500; // 画像がタテ長の場合、縦サイズがこの値になるように縮小される

  // ファイルが選択されたら実行される関数
  $('input[type=file]').change(function () {

    // ファイルを取得する
    file = $(this).prop('files')[0];

    // 選択されたファイルが画像かどうか判定する
    // ここでは、jpeg形式とpng形式のみを画像をみなす
    if (file.type != 'image/jpeg' && file.type != 'image/png') {
      // 画像でない場合は何もせず終了する
      console.log('do nothing')
      file = null;
      blob = null;
      return;
    }

    // 画像をリサイズする
    var image = new Image();
    var reader = new FileReader();
    reader.onload = function (e) {
      image.onload = function () {

        // 縮小後のサイズを計算する
        var width, height;
        if (image.width > image.height) {
          // ヨコ長の画像は横サイズを定数にあわせる
          var ratio = image.height / image.width;
          width = THUMBNAIL_MAX_WIDTH;
          height = THUMBNAIL_MAX_WIDTH * ratio;
        } else {
          // タテ長の画像は縦のサイズを定数にあわせる
          var ratio = image.width / image.height;
          width = THUMBNAIL_MAX_HEIGHT * ratio;
          height = THUMBNAIL_MAX_HEIGHT;
        }

        // 縮小画像を描画するcanvasのサイズを上で算出した値に変更する
        var canvas = $('#canvas')
          .attr('width', width)
          .attr('height', height);

        var ctx = canvas[0].getContext('2d');

        // canvasに既に描画されている画像があればそれを消す
        ctx.clearRect(0, 0, width, height);

        // canvasに縮小画像を描画する
        ctx.drawImage(image,
          0, 0, image.width, image.height,
          0, 0, width, height
        );

        // canvasから画像をbase64として取得する
        base64 = canvas.get(0).toDataURL('image/jpeg');
        // console.log(base64);
        $('#image').attr("value", base64);
        // base64から画像データを作成する
        var barr, bin, i, len;
        bin = atob(base64.split('base64,')[1]);
        len = bin.length;
        barr = new Uint8Array(len);
        i = 0;
        while (i < len) {
          barr[i] = bin.charCodeAt(i);
          i++;
        }
        blob = new Blob([barr], { type: 'image/jpeg' });

      }
      image.src = e.target.result;
    }
    reader.readAsDataURL(file);
  });

});