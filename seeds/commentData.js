const {Comment} = require ('../models');

const commentData = [
    {
        content:'Help! I dont understand todays class topic, need some assitance.',
        date:'2021-09-01',
        user_id:3,
        post_id:1,
    },
    {
        content:'This will be very helpful for next class: https://www.youtube.com/watch?v=sa-TUpSx1JA',
        date:'2021-09-05',
        user_id:3,
        post_id:1,
    },
    {
        content:'Thanks for your information',
        date:'2021-09-10',
        user_id:4,
        post_id:2,
    },
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;

