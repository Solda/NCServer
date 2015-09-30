var Config = require('config');
var Express = require("express"),
  App = Express(),
  Http = require("http"),
  BodyParser = require("body-parser");

App.use(BodyParser.urlencoded({
  extended: true
}));
Http.createServer(App).listen(8080);

var Nodemailer = require('nodemailer');
var SmtpTransport = require('nodemailer-smtp-transport');

var transporter = Nodemailer.createTransport(
  SmtpTransport(Config.get('MailgunConfig'))
);

App.get("/callback", function (req, res) {
  console.log(req.query);
  transporter.sendMail({
    from: 'postmaster@mailgun.solda.io',
    to: 'support@solda.io',
    subject: '簡訊寄送失敗',
    text: req.query
  });

  res.status(200).json({});
});
