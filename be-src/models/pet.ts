import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";

export class Pet extends Model {}
Pet.init(
  {
    petName: DataTypes.STRING,
    imagen: DataTypes.STRING,
    loc: DataTypes.ARRAY(DataTypes.FLOAT),

    search: DataTypes.STRING,
    estado: DataTypes.STRING,
  },
  { sequelize, modelName: "pet" }
);
