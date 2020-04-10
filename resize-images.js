const path = require("path")
const sharp = require("sharp")
const isImage = require("is-image")
const fs = require("fs")
const { COPYFILE_EXCL } = fs.constants

const processFiles = (baseDir) => {
  fs.readdir(baseDir, (err, items) => {
    if (err) console.error(err)

    items.map((item) => {
      const itemPath = `${baseDir}/${item}`

      const stats = fs.lstatSync(itemPath)

      if (stats.isFile()) {
        if (isImage(itemPath)) {
          sharp(itemPath)
            .metadata()
            .then(({ width }) => {
              if (width > 1200) {
                const dirName = path.dirname(itemPath)
                const fileName = path.basename(itemPath)
                const tmpPath = `${dirName}/tmp_${fileName}`

                fs.copyFileSync(itemPath, tmpPath, COPYFILE_EXCL)
                console.log("copied", fileName)

                sharp(tmpPath)
                  .resize({ width: 1200 })
                  .toFile(itemPath)
                  .then(() => {
                    console.log("resized", fileName)
                    fs.unlinkSync(tmpPath)
                    console.log("tmp removed", fileName)
                  })
              }
            })
        }
      }

      if (stats.isDirectory()) {
        processFiles(itemPath)
      }
    })
  })
}

const BASEPATH = "static/wordsby/uploads"

processFiles(BASEPATH)
