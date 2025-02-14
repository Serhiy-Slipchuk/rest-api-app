const { Contact } = require("../../models/contact");
const { createGetAllResponse } = require("../../services")

const getAllController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page, limit, favorite } = req.query;
  const pageNumber = Number(page);
  const pageLimit = Number(limit);
  const skip = (pageNumber - 1) * pageLimit;

  try {
    if (page && limit && favorite) {
      const contacts = await Contact.find({owner, favorite: !!favorite}).skip(skip).limit(pageLimit);
      createGetAllResponse(res, contacts);

    } else if (page && limit) {
      const contacts = await Contact.find({owner}).skip(skip).limit(pageLimit).exec();
      createGetAllResponse(res, contacts);

    } else if (favorite) {
      const contacts = await Contact.find({owner, favorite: !!favorite})
      createGetAllResponse(res, contacts);

    } else {
      const contacts = await Contact.find({owner});
      createGetAllResponse(res, contacts);
    } 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllController,
};
