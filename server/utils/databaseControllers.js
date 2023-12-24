import { v4 } from "uuid";
import fs from "fs/promises";

export const database_getAllDoc = async (path) => {
  const res = JSON.parse(await fs.readFile(path));
  return res;
};

export const database_getIdDoc = async (path, id) => {
  const res = JSON.parse(await fs.readFile(path));
  const data = await res.find((item) => String(item._id) === String(id));
  return data;
};

export const database_addDoc = async (path, data) => {
  const res = JSON.parse(await fs.readFile(path));
  const newData = {
    _id: v4(),
    create_at: new Date().toUTCString(),
    ...data,
  };
  await res.push(newData);
  await fs.writeFile(path, JSON.stringify(res));
  return newData;
};

export const database_updateIdDoc = async (path, id, data) => {
  const res = JSON.parse(await fs.readFile(path));
  const newData = await res.map((item) =>
    String(item._id) === String(id)
      ? { ...item, ...data, create_at: new Date().toUTCString() }
      : item
  );
  await fs.writeFile(path, JSON.stringify(newData));
  return JSON.parse(await fs.readFile(path)).find(
    (item) => String(item._id) === String(id)
  );
};

export const database_deleteIdDoc = async (path, id) => {
  const res = JSON.parse(await fs.readFile(path));
  const newId = await res.find((item) => String(item._id) === String(id));
  const newData = await res.filter((item) => String(item._id) !== String(id));
  await fs.writeFile(path, JSON.stringify(newData));
  return newId;
};
