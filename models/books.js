const{Sequelize,DataTypes}= require("sequelize");

// const sequelize= require("sequelize");
const sequelize = new Sequelize(
    'library',
    'root',
    'meloA@3903.',
    {
        host:'localhost',
        dialect:'mysql'
    }
);
sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

const Book = sequelize.define("books",{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    author:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    release_date:{
        type:DataTypes.DATEONLY
    }
});
sequelize.sync().then(()=>{
    console.log('Book stable created successfully');
}).catch((error)=>{
    console.error('unable to create table:',error)
})

sequelize.sync().then(() => {
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
 
 module.exports = Book;