const { , validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'coffee-recipe-finder',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

