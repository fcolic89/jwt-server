const {exec} = require('child_process');
const util = require('node:util');
const path = require('path');
const express = require('express');

const execPromise = util.promisify(exec);
const app = express();

const { SCRIPT_PATH } = process.env;
const PORT = process.env.PORT || 8080;

const emails = [
    'admin@email.com',
    'test0@email.com',
    'test1@email.com',
    'test2@email.com',
    'test3@email.com',
    'test4@email.com',
    'test5@email.com',
    'test6@email.com',
    'test7@email.com',
    'test8@email.com',
    'test9@email.com',
]

const generateJwts = async () => {
  let emailString = '';
  emails.forEach(email => {
      emailString = emailString.concat(' ', email);
  })

  await execPromise(`${SCRIPT_PATH} --jwt ${emailString} > jwt.json`);
};

app.get('/', async(req, res) => {
  const jsonFilePath = path.join(__dirname, 'jwt.json');
  res.sendFile(jsonFilePath);
});

app.get('/generate', async(req, res, next) => {
  try{
    await generateJwts();
    res.redirect('/');
  }catch(error){
    console.log(error);
    next(error);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

