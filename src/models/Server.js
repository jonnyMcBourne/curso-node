require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {ConnectionDB} = require('../database/config');
class Server{

    constructor(){
        this.app =express();
        this.port = process.env.PORT || 300;
        this.middleware();
        this.routes();
        this.connectDB()
    }

    async connectDB(){
        await ConnectionDB();
    }

    middleware(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes(){
        this.app.use('/api/users',require('../routes/usersRoute'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Server running at port', this.port);
        })
    }

}
module.exports = Server;