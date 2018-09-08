let fs = require('fs');
/*获得命令行参数*/
let fileName = process.argv[2];
/*获取路径*/
let path = __dirname + '/../src/post/' + fileName + '.md';

const createNewPost = () => {
  let title = fileName;
  let category = '';
  let time = new Date().toUTCString()
  let info = {title, category, time};
  fs.writeFile(path, '-------------------------------------\n\n' + JSON.stringify(info) + '\n\n-------------------------------------\n\n', (error, success) => {
    if (error) {
      console.log('oops! something bad happened');
    }
    else {
      console.log('success create post ' + title)
    }
  })
};

fs.readFile(path, (error, success) => {
  if (success) {
    console.log('there is a file named ' + fileName);
    return;
  }
  createNewPost()
});