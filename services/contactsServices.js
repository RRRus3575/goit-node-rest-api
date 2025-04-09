import Contact from '../db/Models/Contact.js';


export const listContacts =  () => Contact.findAll();
  
export  const getContactById = (id) => Contact.findByPk(id)
  
export  const addContact= async(data) => Contact.create(data)

export const changeContact = async(id, data) => {
  const user = await getContactById(id);

  if (!user) {
    return null;
  }

  return user.update(data, {
    returning: true,
  });
};

export  const removeContact = (id) => Contact.destroy({
  where: {
    id
  }
})
  

  

