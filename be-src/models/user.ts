import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";

class User extends Model {}
User.init(
  {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);

export { User };
