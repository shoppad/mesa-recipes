const Mesa = require('vendor/Mesa.js');const Shopify = require('vendor/Shopify.js');/** * A Mesa Script exports a class with a script() method. */module.exports = new class {  /**   * Mesa Script   *   * @param {object} payload The payload data   * @param {object} context Additional context about this task   */  script = (payload, context) => {    const response = Shopify.get(`admin/orders/${payload}.json`);    const order = response.order;    Mesa.log.debug('Loaded order from id passed in payload from Shopify Flow', order);    Mesa.output.send('out-cognito-verification', order);  }}