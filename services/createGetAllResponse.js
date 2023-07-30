const createGetAllResponse = (res, contacts) => {
  if (contacts.length === 0) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json({ message: "Success", contacts });
};

module.exports = createGetAllResponse;
