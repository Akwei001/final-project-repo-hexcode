import express from "express";
import { debugOut, infoOut } from "../utils/logging.js";
import {
    getAllAppUsers,
    getAppUserById,
    getAppUserFromEmail,
} from "../models/appUsers.js";
import { getAllEventsByAppUserId } from "../models/events.js"; //NB - note this imports from events not from AppUsers, which is  slightly unusual for the AppUsers routes script
import { getAllContactsByOwnerUserId } from "../models/contacts.js"; //NB - note this imports from events not from AppUsers, which is  slightly unusual for the AppUsers routes script

const appUserRoutes = express.Router();
debugOut(`/routes/appUsers.js`, `script start`);

// ************************************************
//       GET ALL APP USERS
// ************************************************
appUserRoutes.get("/", async (req, res) => {
    const searchResults = await getAllAppUsers();

    res.json({
        success: true,
        message: `Retrieved all app users`,
        payload: searchResults,
    });

    return;
});

// ***********************************************************
//       GET  APP USER for a given APP USER EMAIL (query)
// ***********************************************************
// FRONT END SENDs:   GET to  /appusers/search?email=user@user.com
// eg http://localhost:3000/appusers/search?email=belinda@belinda.com
//
// FYI: Express parses query string parameters by default, and puts them into the req.query property
appUserRoutes.get(`/search`, async (req, res) => {
    // const appUserEmail = req.query["email"];

    //TODO: need try/catch eror code around this!
    const appUserEmail = req.query.email;

    const searchResults = await getAppUserFromEmail(appUserEmail);

    res.json({
        success: true,
        message: `Retrieved app user with app user email of ${appUserEmail}`,
        payload: searchResults,
    });
});

// ************************************************
//     GET ONE APP USER for a given APP USER ID
// ************************************************
// FYI: Express also supports named route parameters and puts them in the req.params object. Named route parameters are always strings, and Express automatically decodes them using decodeUriComponent().
appUserRoutes.get(`/:id`, async (req, res) => {
    const appUserId = req.params.id;
    const searchResults = await getAppUserById(appUserId);

    res.json({
        success: true,
        message: `Retrieved app user with app user id ${appUserId}`,
        payload: searchResults,
    });
});

//********************************************************
//       GET ALL EVENTS for a given APP USER ID
//       e.g.
//       /appusers/:2/events/, where 2 is an app_user_id
//********************************************************
appUserRoutes.get("/:id/events", async (req, res) => {
    const appUserId = req.params.id;

    const searchResults = await getAllEventsByAppUserId(appUserId);

    res.json({
        success: true,
        message: `Retrieved all events (invited and organised) for user ${appUserId}`,
        payload: searchResults,
    });
});

// *********************************************************
//       GET ALL CONTACTS for a given APP USER ID
//       e.g.
//       /appusers/:2/contacts/, where 2 is an app_user_id
//********************************************************

appUserRoutes.get("/:id/contacts", async (req, res) => {
    const appUserId = req.params.id;

    const searchResults = await getAllContactsByOwnerUserId(appUserId);

    res.json({
        success: true,
        message: `Retrieved all contacts for user ${appUserId}`,
        payload: searchResults,
    });
});
//********************************************************
// INSERT ONE APP USER (POST) - Beyond MVP
//********************************************************

//********************************************************
// UPDATE ONE APP USER (PUT or PATCH) - Beyond MVP
//********************************************************

debugOut(`/routes/appUsers.js`, `script end`);

export default appUserRoutes;
