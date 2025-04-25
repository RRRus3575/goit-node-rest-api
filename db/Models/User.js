import { DataTypes } from "sequelize";
import sequelize from "../Sequelize.js";
import { emailRegex } from "../../constants/auth.js";
import { PLAN_TYPES } from "../../constants/auth.js";

const User = sequelize.define(
    'user', {
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            is: emailRegex
          },
          unique: true,
          
        },
        avatarURL: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        subscription: {
            type: DataTypes.ENUM,
            values: PLAN_TYPES,
            defaultValue: "starter"
        },
        token: {
          type: DataTypes.STRING,
          defaultValue: null,
        },
        verify: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        verificationToken: {
          type: DataTypes.STRING,
        },
      }    
)
// User.sync({ alter: true })

export default User;