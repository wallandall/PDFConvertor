const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const options = { format: 'A4' };

//@dec Convert an HTML File to a PDF
//@route Post /api/v1/files/from-file
//@access Public

exports.createPDFile = (req, res, next) => {
  if (req.url === '/favicon.ico') new ErrorResponse('Resource not found, 404');

  const title = req.body.title;
  const filePath = `PDF/${title}.pdf`;
  const content = req.body.content;

  pdf.create(content, options).toFile(filePath, function (err, res) {
    if (err) {
      res.status(500).json({
        msg: 'Could not create the file',
      });
    }
  });
  res.status(200).json({
    file: filePath,
  });
};

//@dec Convert an HTML String to a PDF
//@route Post /api/v1/files/from-string
//@access Public

exports.createBufferedPDF = (req, res, next) => {
  const content = req.body.content;
  if (req.url === '/favicon.ico') new ErrorResponse('Resource not found, 404');
  pdf.create(content).toStream((err, pdfStream) => {
    if (err) {
      // handle error and return a error response code
      console.log(err);
      return res.sendStatus(500);
    } else {
      // send a status code of 200 OK
      res.statusCode = 200;

      // once we are done reading end the response
      pdfStream.on('end', () => {
        // done reading
        return res.end();
      });

      // pipe the contents of the PDF directly to the response
      pdfStream.pipe(res);
    }
  });
};
