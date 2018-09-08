module.exports = async function (path) {
  const promise = () => {
    return new Promise((resolve, reject) => {
      require('fs').mkdir(path, (error, data) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(data)
        }
      })
    });
  };
  let a = await promise().catch(e => {
    return undefined
  });

  return a;

}