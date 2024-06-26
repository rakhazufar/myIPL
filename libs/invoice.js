const { v4: uuidv4 } = require('uuid');

function generateInvoice() {
  const timestamp = Math.floor(Date.now() / 1000);
  const shortUuid = uuidv4().split('-')[0].slice(0, 4);
  return `INV${timestamp}${shortUuid}`;
}

module.exports = { generateInvoice };
