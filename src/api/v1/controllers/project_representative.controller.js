const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createProject_representative = asyncHandler(async (req, res) => {
//   try {
//     let {  project_id  } = req.body;

//     const project_idd = await prisma.project.findUnique({
//       where: {
//         project_id: project_id,
//       }
//     });

//     representative_id: representative_id

//     if (project_idd) {
//         const representative_id = await prisma.member.update({
//           where: {
//             representative_id:representative_id
//           },
//           update: {
//             representatives:representative_id,
//           }
//     //   return res.status(201).json({
//     //     success: true,
//     //     status: 201,
//     //     message: "project_representative created successfully!!!",
//     //     data: project_representative,
//       });
//       if(representative_id){
//         res.status(200).send("OK");
//     } else {
//       generateError("Failed", req, next);
//     }
      
//     }}catch (error) {
//     res.status(400).json({
//       error: error,
//       message: error.code,
//     });
//   }
try {
    const { project_id, representative_id } = req.body;

    // Find the event by it's ID
    const _event = await prisma.project.findUnique({ where: { project_id: project_id} });

    // Find the member by their ID
    if(_event){
    const _member = await prisma.representative_info.findUnique({
      where: { representative_id: representative_id },
    //   data: {
    //     // events: {
    //     //   connect: [{ id: _event.id }], // connect that member with the event ID
    //     // },
    //   },
    update: {
        events: _event,
      },
    });
    const gladiatorRatingByBob = await prisma.project_representative.create({
        data: {
            project_id: _event.id,
            representative_id: _member.id,
        },
      });
    if(_member) {
        res.status(200).send("ok")
    }
  } }catch (error) {
        res.status(400).json({
          error: error,
          message: error.code,
        });
      }
});
// const oneProject = asyncHandler(async (req, res) => {
//     try {
//       const { id } = req.params;
//       const project = await prisma.project.findUniqueOrThrow({
//         where: {
//           id: Number(id),
//         },
//       });
//       if (project) {
//         return res.status(201).json({
//           success: true,
//           status: 201,
//           message: `${project.name} find successfully!!!`,
//           data: project,
//         });
//       }
//     } catch (error) {
//       res.status(400).json({
//         error: error,
//         message: error.code,
//       });
//     }
//   });
module.exports = {
    createProject_representative
    // oneClient,
    // allClients,
    // updateClient,
    // deleteClient,
  };
  