const {Post} = require ('../models');

const postData = [
    {
        title:'Regex',
        content:'A regex, which is short for regular expression, is a sequence of characters that defines a specific search pattern. When included in code or search algorithms, regular expressions can be used to find certain patterns of characters within a string, or to find and replace a character or sequence of characters within a string. They are also frequently used to validate input.',
        date:'2021-07-20',
        user_id:1
    },
    {
        title: 'React',
        content: 'React (React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies.',
        date:'2021-07-25',
        user_id:2,
    },
    {
        title: 'The Complete Guide to Advanced React Component PatternsRegular Expressions',
        content: 'I just find this course. Build reusable React components without relying on if statements or more props! Use hooks & trusted advanced patterns!',
        date:'2021-08-11',
        user_id:2,
    },
]

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
