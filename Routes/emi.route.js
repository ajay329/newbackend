const { Router } = require("express");
const EmiModel = require("../Models/Emi.model");

const Emi = Router();


Emi.post("/emi", async (req, res) => {
  
  let new_data=new EmiModel(req.body);
  await new_data.save()


 
});
module.exports = Emi;
