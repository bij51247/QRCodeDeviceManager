var encoding = require('encoding-japanese');
var toSJIS = require('qrcode/helper/to-sjis');
const QRCode = require('qrcode');
const { createCanvas } = require('canvas');
const { urlencoded } = require('body-parser');
const canvas = createCanvas(200, 200);
const options = {};

module.exports = (req, res) => {
   var text = req.body.name;
  QRCode.toCanvas(canvas, req.body.uuid, options, function (error) {
    const ctx = canvas.getContext('2d');
    ctx.font = '/Users/kimuratsutomu/QRCode_Device_Manager/.fonts/RictyDiminished-Regular.ttf';
    ctx.fillStyle = 'black';
    ctx.fillText(text, 15, 10);
    var image_src = canvas.toDataURL();
    res.send(image_src);
  });
};