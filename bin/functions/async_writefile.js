module.exports = async function (path, data) {
  const promise = () => new Promise((resolve, reject) => {
    require('fs').writeFile(path, data, (error, item) => {
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