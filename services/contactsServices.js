import Contact from '../db/Models/Contact.js';


export const listContacts =  async({ owner, favorite, page, limit }) => {
  const offset = (page - 1) * limit;
  const filter = { owner };

  if (favorite !== undefined) {
    filter.favorite = favorite === "true"; 
  }

  const totalContacts = await Contact.count({ where: filter });

  const contacts = await Contact.findAll({
    where: filter,
    limit, 
    offset
  });

  return{
    totalContacts,
    contacts,
    totalPages: Math.ceil(totalContacts / limit),
    currentPage: page,
  }


}
  
  
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
  



  

