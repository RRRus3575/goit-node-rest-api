import { DataTypes } from "sequelize";
import sequelize from "../Sequelize.js";

const User = sequelize.define(
    'Contact', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          is: /^\+?[0-9\s\-()]{10,20}$/
        }
      },
      favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }
)

// User.sync()

export default User

