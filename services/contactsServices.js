import Contact from '../db/Models/Contact.js';


export const listContacts =  (query) => Contact.findAll({where: query});
  
export  const getContact = (query) => Contact.findOne({where: query})
  
export  const addContact= async(data) => Contact.create(data)

export const changeContact = async(query, data) => {
  const user = await getContact(query);
  console.log("data", data)

  if (!user) {
    return null;
  }

  return user.update(data, {
    returning: true,
  });
};

export  const removeContact = (query) => Contact.destroy({
  where: query  
})
  

  

