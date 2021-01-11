const QRCode = require('qrcode');
const { createCanvas } = require('canvas');
const canvas = createCanvas(200, 200);
const options = {};

module.exports = (req, res) => {
  console.log(unescape(encodeURIComponent(req.body.name)));
  QRCode.toCanvas(canvas, req.body.uuid, options, function (error) {
    const ctx = canvas.getContext('2d');
    ctx.font = '10px Impact';
    ctx.fillStyle = 'blue';
    ctx.fillText(unescape(encodeURIComponent(req.body.name)), 15, 10);
    var image_src = canvas.toDataURL();
    res.send(image_src);
  });
};