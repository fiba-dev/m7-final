import {Sequelize} from "sequelize"


const sequelize= new Sequelize({
    dialect:"postgres",
    username:"wnvcyfkjalicic",
    password:"89a1f5d9864f751f1c17502fd739ea84951b9e2b0146ed0427b391e159e8178b",
    database:"dd948uf1bmcju1",
    port:5432,
    host:"ec2-18-235-4-83.compute-1.amazonaws.com",
   
    ssl:true,
    dialectOptions:{
        ssl:{
            require:true,
            rejectUnauthorized:false
        }
    }
 
 
 });

 export{sequelize}