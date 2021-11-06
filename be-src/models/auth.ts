import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";

class Auth extends Model {}
Auth.init(
  {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  },
  { sequelize, modelName: "auth" }
);
export { Auth };
