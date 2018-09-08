module.exports = async function (path, data) {
  const promise = () => new Promise((resolve, reject) => {
    require('fs').appendFile(path, data, (error, item) => {
      if (error) {
        reject(error)
      }
      else {
        resolve(item)
      }
    })
  });

  return await promise().catch(e => {
    return undefined
  });
};