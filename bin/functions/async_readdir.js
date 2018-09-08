module.exports = async function (path) {
  const promise = () => new Promise((resolve, reject) => {
    require('fs').readdir(path, (error, data) => {
      if (error) {
        reject(error)
      }
      else {
        resolve(data)
      }
    })
  })

  let a = await promise().catch(e => {
    return undefined
  });
  return a;
}