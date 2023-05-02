const { validationr } = require('express-validator');
const net = require('net');


 const validateIpformat = (req, res, next) => {
 
     if (!req.params.ip) {
    return res.status(400).json({ message: 'IP address is not in correct format' });
      }

  
    if (!net.isIP(req.params.ip)) {
    return res.status(400).json({ message: 'Not valid' });
  }


  const errors = validationr(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message:'validation error', errors: errors.array() });
  }


  next();
};


module.exports = {validateIpformat}