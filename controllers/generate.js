const QRCode = require('qrcode');
const { createCanvas } = require('canvas');
const canvas = createCanvas(200, 200);
const options = {};

module.exports = (req, res) => {
  // console.log(typeof (req.body.name));
  console.log(unescape(req.body.name));
  QRCode.toCanvas(canvas, req.body.uuid, options, function (error) {
    const ctx = canvas.getContext('2d');
    ctx.font = '10px Impact';
    ctx.fillStyle = 'blue';
    ctx.fillText(unescape(req.body.name), 15, 10);
    var image_src = canvas.toDataURL();
    res.send(image_src);
  });
};