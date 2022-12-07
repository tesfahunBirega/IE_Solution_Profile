const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createClient = async(req, res)=> {
    try{
        let { name, email, contact_no, address, logo, website,} = req.body;

        const client = await prisma.clients.create({
            data: {
                name: name,
                email: email,
                contact_no:contact_no,
                address:address,
                logo:logo,
                website:website,

            },
        });
    
if(client){
    return res.status(201).json({
        success: true,
        status: true,
        message: "Client created seccessfully",
        data: client,
    });
}

}catch(error){
    res.status(400).json({
        error: error,
        message: error.code,
    });
}
   
};

module.exports = {
    createClient,
}