import { DataTypes } from "sequelize";
import sequelize from "../Sequelize.js";
import { phonePattern } from "../../constants/contact.js";

const Contact = sequelize.define(
    'Contact', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Contacts must have a name"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Contacts must have an email"
          }          
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          is: phonePattern,
          notNull: {
            msg: "Contacts must have a phone"
          }
        }
      },
      favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      owner: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }
)

// Contact.sync()



export default Contact

