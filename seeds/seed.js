const sequelize = require('../config/connection');

const userData = require('./userData');
const postData = require('./postData');
const commentData = require('./commentData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await userData();
  console.log('\n----- USERS SEEDED -----\n');
  await postData();
  console.log('\n----- POSTS SEEDED -----\n');
  await commentData();
  console.log('\n----- COMMENTS SEEDED -----\n');
  process.exit(0);
};

seedDatabase();