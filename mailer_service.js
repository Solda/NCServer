var path = require('path')
var templateDir = path.join(__dirname, 'templates', 'pasta-dinner')
var EmailTemplate = require('email-templates').EmailTemplate

var template = new EmailTemplate(templateDir)
var Moment = require('moment')

var Query = require('./query')

var exec = require('child_process').exec
module.exports = {
  sendCancelEmail: function (invoice_id) {
    if (process.env["NODE_ENV"] === 'production'){
          var run_sidekiq = "/bin/bash -l -c 'cd /home/deploy/www/SoldaBackend/current && bin/rails runner -e production" +
          " \"SmsFailNotificationAndConversionWorker.perform_async("+ invoice_id +");\"'";
        }else{
          var run_sidekiq = "/bin/bash -l -c 'cd /home/deploy/www/alpha/SoldaBackend/current && bin/rails runner -e alpha" +
          " \"SmsFailNotificationAndConversionWorker.perform_async("+ invoice_id +");\"'";
        }
    console.log(run_sidekiq)
    exec(
      run_sidekiq,
      function (error, stdout, stderr) {
        if (error){ console.log('error:' + error)};
        if (stdout){ console.log('stdout:' + stdout)};
        if (stderr){ console.log('stderr:' + stderr)};

        // command output is in stdout
    });
    // Query.getMailerDataByInvoiceId(invoice_id).then(function (row) {
    //   if (!row) throw 'invoice_id: ' + invoice_id + ' no data';
    //   exec(
    //     "'cd /home/deploy/www/SoldaBackend/current && bin/rails runner -e " +
    //     process.env["NODE_ENV"] +
    //     " SmsFailNotificationAndConversionWorker.perform_async(row.id);'",
    //     function (error, stdout, stderr) {
    //       if (error){ console.log('error:' + error)};
    //       if (stdout){ console.log('stdout:' + stdout)};
    //       if (stderr){ console.log('stderr:' + stderr)};
    //
    //       // command output is in stdout
    //     });
    //
    //   row.shipped_at = Moment(row.shipped_at).format('MM/DD');
    //   var invoices = [{
    //     title: '訂單 #' + row.id + ' 到貨簡訊寄送失敗',
    //     email: row.email,
    //     invoice: row
    //   }]
    //
    //   return invoices;
    // }).then(function (invoices) {
    //   var templates = invoices.map(function (invoice) {
    //     return template.render(invoice)
    //   })
    //
    //   Promise.all(templates)
    //     .then(function (results) {
    //       console.log(results);
    //       transporter.sendMail({
    //         from: 'postmaster@mailgun.solda.io',
    //         to: invoices[0].email,
    //         subject: invoices[0].title,
    //         html: results[0].html,
    //         text: results[0].text
    //       });
    //     })
    // }).catch(function(e) {
    //   console.error(e);
    // });
  }
}
