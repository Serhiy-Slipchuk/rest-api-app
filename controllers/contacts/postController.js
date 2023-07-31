const { Contact } = require("../../models/contact");

const postController = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const newContact = await Contact.create({...req.body, owner});

    res.status(201).json(newContact);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  postController,
};
