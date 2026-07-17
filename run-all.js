require('dotenv').config({ path: require('path').join(__dirname, '.env') });

console.log('[System] Starting Myster Manager...');
require('./bot/index.js');

console.log('[System] Starting Web Dashboard...');
require('./dashboard/server.js');
