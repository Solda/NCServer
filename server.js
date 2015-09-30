var Config = require('config');

var Express = require("express"),
  App = Express(),
  Http = require("http"),
  BodyParser = require("body-parser");

App.use(BodyParser.urlencoded({
  extended: true
}));
Http.createServer(App).listen(5000);

var Nodemailer = require('nodemailer');
var SmtpTransport = require('nodemailer-smtp-transport');

var transporter = Nodemailer.createTransport(
  SmtpTransport(Config.get('MailgunConfig'))
);

App.get("/callback", function (req, res) {
  var to = req.query.to;
  var network_code = req.query['network-code'];
  var msisdn = req.query.msisdn;
  var status = req.query.status;
  var err_code = req.query['err-code'];
  var price = req.query.price;
  var scts = req.query.scts;
  var message_timestamp = req.query['message-timestamp'];
  var client_ref = req.query['client-ref'];

  var content = '說明：https://docs.nexmo.com/index.php/sms-api/handle-delivery-receipt \n' +
    'to:' + to + '\n' +
    'network_code:' + network_code + '\n' +
    'msisdn:' + msisdn + '\n' +
    'status:' + status + '\n' +
    'err_code:' + err_code + '\n' +
    'price:' + price + '\n' +
    'scts:' + scts + '\n' +
    'message_timestamp:' + message_timestamp + '\n' +
    'client_ref:' + client_ref;

  if (req.query.status != 'delivered') {

    transporter.sendMail({
      from: 'postmaster@mailgun.solda.io',
      to: 'support@solda.io',
      subject: '簡訊寄送失敗',
      text: content
    });
  }

  res.status(200).json(req.query);
});
