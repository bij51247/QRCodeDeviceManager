var encoding = require('encoding-japanese');
const QRCode = require('qrcode');
const { createCanvas } = require('canvas');
const { render } = require('ejs');
const canvas = createCanvas(200, 200);
const options = {};

module.exports = (req, res) => {
  // var text = req.body.name;
  var text = encoding.convert(req.body.name, 'UTF16', 'AUTO');
  // var detected = encoding.detect(req.body.name);
  // console.log(detected);
  // var text = encoding.convert(req.body.name,{
  //   to:'UTF8',
  //   from:'UNICODE'
  // })
  QRCode.toCanvas(canvas, req.body.uuid, options, function (error) {
    const ctx = canvas.getContext('2d');
    ctx.font = '10px Impact';
    ctx.fillStyle = 'blue';
    ctx.fillText(text, 15, 10);
    var image_src = canvas.toDataURL();
    res.send(image_src);
  });
};