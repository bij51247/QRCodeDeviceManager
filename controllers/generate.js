var encoding = require('encoding-japanese');
var toSJIS = require('qrcode/helper/to-sjis');
const QRCode = require('qrcode');
const { createCanvas } = require('canvas');
const canvas = createCanvas(200, 200);
const options = {};

module.exports = (req, res) => {
  // var text =  encoding.convert(req.body.name,'UNICODE','AUTO');

  QRCode.toCanvas(canvas, req.body.uuid, options, function (error) {
    const ctx = canvas.getContext('2d');
    ctx.font = '10px';
    ctx.fillStyle = 'blue';
    ctx.fillText(req.body.name, 15, 10);
    var image_src = canvas.toDataURL();
    res.send(image_src);
  });
};