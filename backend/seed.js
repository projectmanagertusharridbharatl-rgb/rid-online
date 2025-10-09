// const mongoose = require('mongoose');
// const Category = require('./models/Category');
// const Instructor = require('./models/Instructor');
// const Course = require('./models/Course');

// module.exports = async function seed() {
//   // check existing
//   const cCount = await Category.countDocuments();
//   if (cCount > 0) return;
//   // categories
//   const cats = [
//     { name: 'Web Development', slug: 'web-development' },
//     { name: 'Data Science', slug: 'data-science' },
//     { name: 'Design', slug: 'design' },
//     { name: 'Marketing', slug: 'marketing' }
//   ];
//   const savedCats = await Category.insertMany(cats);
//   // instructors
//   const ins = await Instructor.insertMany([
//     { name: 'John Smith', bio: 'Senior Developer' },
//     { name: 'Sarah Johnson', bio: 'Data Scientist' },
//     { name: 'Emily Davis', bio: 'Marketing Expert' }
//   ]);
//   // courses
//   const courses = [
//     { title: 'Complete Web Development Bootcamp', slug:'complete-web-development-bootcamp', shortDesc:'HTML, CSS, JS, Node, React', instructor: ins[0]._id, category: savedCats[0]._id, price: 3499, rating:4.8, students:12500, badge:'Bestseller' },
//     { title: 'Data Science and Machine Learning', slug:'data-science-machine-learning', shortDesc:'Python, ML, Pandas', instructor: ins[1]._id, category: savedCats[1]._id, price:4199, rating:4.7, students:8900, badge:'Hot' },
//     { title: 'UI/UX Design Masterclass', slug:'ui-ux-design-masterclass', shortDesc:'Figma and research', instructor: ins[2]._id, category: savedCats[2]._id, price:2999, rating:4.9, students:6700, badge:'Top Rated' }
//   ];
//   await Course.insertMany(courses);
//   console.log('Seed data inserted');
// };





const Category = require('./models/Category');
const Instructor = require('./models/Instructor');
const Course = require('./models/Course');

module.exports = async function seed() {
  const cats = await Category.insertMany([
    { name: 'Web Development', slug: 'web-dev' },
    { name: 'Data Science', slug: 'data-science' },
    { name: 'UI/UX Design', slug: 'uiux' }
  ]);
  const ins = await Instructor.insertMany([
    { name: 'John Smith', bio: 'Full Stack Developer' },
    { name: 'Sarah Johnson', bio: 'Data Scientist' }
  ]);
  const courses = [
    { title: 'MERN Full Stack Course', slug: 'mern-stack', shortDesc: 'Mongo, Express, React, Node', instructor: ins[0]._id, category: cats[0]._id, price: 3499, rating: 4.8, students: 1200, badge: 'Bestseller' },
    { title: 'Python for Data Science', slug: 'python-data', shortDesc: 'Python, ML, Pandas', instructor: ins[1]._id, category: cats[1]._id, price: 2999, rating: 4.7, students: 900, badge: 'Hot' }
  ];
  await Course.insertMany(courses);
  console.log('Seed inserted ✅');
};
