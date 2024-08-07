const multer = require('multer');
const File = require('../models/File');
const { storeOnIPFS } = require('../utils/blockchain');
const { redactFile } = require('../utils/redaction');
const { uploadFileToBlockchain, verifyFileOwnership } = require('../utils/blockchain');

const upload = multer({ dest: 'uploads/' });

exports.uploadFile = upload.single('file'), async (req, res) => {
  try {
    const file = new File({
      userId: req.user.id,
      filePath: req.file.path,
    });

    await file.save();
    res.status(200).json(file);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.redactFile = async (req, res) => {
  const { fileId, level } = req.body;

  try {
    const file = await File.findById(fileId);
    if (!file) return res.status(404).json({ msg: 'File not found' });

    const redactedPath = await redactFile(file.filePath, level);
    file.redactedPath = redactedPath;

    const ipfsHash = await storeOnIPFS(redactedPath);
    file.ipfsHash = ipfsHash;

    await uploadFileToBlockchain(ipfsHash, req.user.blockchainId);

    await file.save();
    res.status(200).json(file);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
