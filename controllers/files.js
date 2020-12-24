//@dec Get an HTML File
//@route Get /api/v1/files
//@access Public
exports.getHTML = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'GET an HTML File' });
};

exports.createPDF = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create PDF from HTML' });
};
