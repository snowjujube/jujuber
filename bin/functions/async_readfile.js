module.exports = async function (path, encoding = 'utf-8') {
  const promise = () => new Promise((resolve, reject) => {
    require('fs').readFile(path, encoding, (error, data) => {
      if (error) {
        reject(error)
      }
      else {
        resolve(data)
      }
    })
  });

  return await promise().catch(e => {
    return undefined
  });
};