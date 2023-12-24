import express from "express";
import {
  database_addDoc,
  database_deleteIdDoc,
  database_getAllDoc,
  database_getIdDoc,
  database_updateIdDoc,
} from "../utils/databaseControllers.js";
import { uploadFile, zodiac_name } from "../utils/commons.js";
const actorRoute = express.Router();

actorRoute.get("/get-all", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 30;
    const page = parseInt(req.query.page) || 1;
    const sort_age = req.query.sort_age || 1;
    const sort_name = req.query.sort_name || 1;
    const sort_create_at = req.query.sort_create_at || 1;
    const skip = limit * (page - 1);
    const search_name = req.query.search_name || "";
    const filter_country = req.query.filter_country || "all";

    const dataOld = await database_getAllDoc("public/datas/actor.json");

    const searchAndFilter = dataOld.filter((item) => {
      if (filter_country.toLowerCase() === "all".toLowerCase()) {
        return item.name.toLowerCase().includes(search_name.toLowerCase());
      } else if (filter_country.toLowerCase() === item.country.toLowerCase()) {
        return item.name.toLowerCase().includes(search_name.toLowerCase());
      }
    });
    // searchAndFilter.sort((a, b) => {
    //   if (sort_age) {
    //     return (
    //       new Date(a?.birthday).getTime() - new Date(b?.birthday).getTime()
    //     );
    //   } else if (sort_create_at) {
    //     return (
    //       new Date(a?.create_at).getTime() - new Date(b?.create_at).getTime()
    //     );
    //   } else if (sort_name) {
    //     return a?.name - b?.name;
    //   }
    // });

    //pagination
    const newData = [];
    for (let index = skip; index < skip + limit; index++) {
      if (index < searchAndFilter.length) {
        newData.push(searchAndFilter[index]);
      }
    }

    return res.status(200).json({
      total_row: dataOld.length,
      data_row: newData.length,
      data: newData,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

actorRoute.get("/get-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataOld = await database_getIdDoc("public/datas/actor.json", id);
    return res.status(200).json(dataOld);
  } catch (error) {
    return res.status(500).json(error);
  }
});

actorRoute.post(
  "/add-one",
  uploadFile("public/images/actor").single("file"),
  async (req, res) => {
    try {
      const data = {
        ...req.body,
        file: req.file ? req.file : "",
        zodiac: zodiac_name(req.body?.birthday) || "",
      };
      const dataCreate = await database_addDoc("public/datas/actor.json", data);
      return res.status(201).json(dataCreate);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

actorRoute.put(
  "/update-id/:id",
  uploadFile("public/images/actor").single("file"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const datOld = await database_getIdDoc("public/datas/actor.json", id);
      const data = {
        ...req.body,
        file: req.file ? req.file : datOld.file,
        zodiac: zodiac_name(req.body?.birthday) || "",
      };
      const dataUpdate = await database_updateIdDoc(
        "public/datas/actor.json",
        id,
        data
      );
      return res.status(200).json(dataUpdate);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

actorRoute.delete("/delete-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await database_deleteIdDoc("public/datas/actor.json", id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default actorRoute;
