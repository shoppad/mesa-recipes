const Mesa = require('vendor/Mesa.js');
const Shopify = require('vendor/Shopify.js');
const ShopifyUtil = require('./ShopifyUtil.js');

module.exports = new class {

  script = (payload, context) => {
    const vars = context.steps;

    let order = vars.webhook;

    order.name = vars.transform.name;
    order.tags = order.tags != "" ? order.tags : null; 
    if (! order.po_number) {
      delete order.po_number;
    }
    order.source_name = 'mesa_sync';
    order.inventory_behaviour = 'decrement_ignoring_policy';

    delete order.id;
    delete order.customer.id;
    delete order.customer.default_address.customer_id;

    // One or more of these cause a 422 error when present - haven't drilled down into
    // which it is.
    delete order.source_identifier
    delete order.source_url;
    delete order.customer.default_address.id;
    delete order.checkout_id;
    delete order.confirmation_number
    delete order.number
    delete order.order_number
    delete order.order_status_url
    delete order.reference;

    // You don't seem to need to delete the shipping line id
    /*
    for (let shippingLine of order.shipping_lines) {
      delete shippingLine.id;
    }
    */

    for (let lineItem of order.line_items) {
      this.handleLineItem(lineItem);
    }

    Mesa.output.next(order);
  }

  handleLineItem = (lineItem) => { 
    delete lineItem.id;

    let [variantId, productId] = ShopifyUtil.variantIdFromSku(lineItem.sku);
    lineItem.variant_id = variantId;
    lineItem.product_id = productId;
  }
}
