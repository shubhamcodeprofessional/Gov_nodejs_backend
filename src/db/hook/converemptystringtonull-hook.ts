import { Model } from "sequelize";

export const convertEmptyStringsToNull = (instance: Model) => {
  for (const key in instance.dataValues) {
    if (instance.dataValues[key] === "") {
      instance.dataValues[key] = null;
    }
  }
};
