import User from '../db/Models/Contact.js';


export const listContacts =  () => User.findAll();
  
export  const getContactById = (id) => User.findByPk(id)
  
export  const addContact= async(data) => User.create(data)

export const changeContact = async(id, data) => {
  const user = await getContactById(id);

  if (!user) {
    return null;
  }

  return user.update(data, {
    returning: true,
  });
};

export  const removeContact = (id) => User.destroy({
  where: {
    id
  }
})
  

  

