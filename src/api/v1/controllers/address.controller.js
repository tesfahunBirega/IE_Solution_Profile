const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createAddress = asyncHandler(async(req, res) => {


    try{
        let{country,town,city,postal_code} = req.body;

        const address = await prisma.address.create({
            data: {
                country:country,
                city:city,
                town:town,
                postal_code:postal_code
            }
        });
        if(address){
            return res.status(201).json({
                success:true,
                status:201,
                message: "address created successfully!!!",
                data: address,
            });
        }
    }catch(error){
        res.status(400).json({
            error: error,
            message:error.code,
        });
    }
});
module.exports = {createAddress};