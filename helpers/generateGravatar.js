
import crypto from 'crypto';

const  generateGravatarUrl = (email, size = 200) => {
    const emailHash = crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');
    return `https://www.gravatar.com/avatar/${emailHash}?s=${size}&d=identicon`; 
  }

  export default generateGravatarUrl