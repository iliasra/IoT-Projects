const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(cors());

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Aucune image téléchargée.');
    console.log('Aucune image téléchargée.');
  }

  console.log('Image reçue:', req.file.filename);

  res.json({ success: true, filename: req.file.filename });
    exec('matlab -nodisplay -nosplash -nodesktop -r "run(\'test.m\');exit;"', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
});
app.get('/', (req, res) => {
    res.send('Hello World!');
    console.log('Hello World!');
    }
);

app.get('/danger', (req, res) => {
    res.sendFile(__dirname + '/output.txt');
    console.log('fichier envoyé');
    }
); 

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
