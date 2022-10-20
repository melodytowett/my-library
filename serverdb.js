const sequelize= require("sequelize");
const Sequelize = new sequelize(
    'library',
    'root',
    'meloA@3903.',
    {
        host:'localhost',
        dialect:'mysql'
    }
);
Sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

Sequelize.sync().then(() => {
   console.log('Book table created successfully!');
   Book.create({
       title: "Clean Code",
       author: "Robert Cecil Martin",
       description:"Teaches on how to write clean code that can be reviewd and understood by other people",
       release_date: "2021-12-14",
   }).then(res => {
       console.log(res)
   }).catch((error) => {
       console.error('Failed to create a new record : ', error);
   });

}).catch((error) => {
   console.error('Unable to create table : ', error);
});