var Knexfile = require("./config/knexfile.js")
var Knex = require("knex")(Knexfile);

module.exports = {
  getMailerDataByInvoiceId: function (invoiceId) {
    var query = Knex.first('a1.id','a1.shipped_at','a3.display_name','a3.email')
      .from('invoices as a1')
      .leftJoin('stores as a2', 'a1.seller_id', 'a2.id')
      .leftJoin('users as a3', 'a2.user_id', 'a3.id')

    .where('a1.id', '=', invoiceId)
    // console.log(query.toString());

    return query;
  }
}
