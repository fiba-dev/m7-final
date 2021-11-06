import { sequelize } from "./models/conn";
import { User, Pet, Auth } from "./models";

User.sequelize.sync({ force: true }).then((res) => {
  console.log(res);
});
Pet.sequelize.sync({ force: true }).then((res) => {
  console.log(res);
});
// Auth.sequelize.sync({ force: true }).then((res) => {
//   console.log(res);
// });
