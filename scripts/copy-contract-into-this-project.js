const path = require("path");
const fs = require("fs-extra");

// this script copies the smart contract into this project to have everything in one place.
// this is only being done for having a complete project, it is not essential for development purposes.

const SOURCE_FOLDER_NAME = "partnerly";
const DESTINATION_FOLDER_NAME = "contract-development";

const SOURCE_FOLDER = path.join(__dirname, "..", "..", SOURCE_FOLDER_NAME);
const DESTINATION_FOLDER = path.join(__dirname, "..", DESTINATION_FOLDER_NAME);

function main() {
  console.log(`Copying from Source folder: ${SOURCE_FOLDER}`);
  console.log(`To destination folder: ${DESTINATION_FOLDER}`);

  const sourceFolderExists = fs.pathExistsSync(SOURCE_FOLDER);
  if (!sourceFolderExists) {
    throw new Error(`Source folder: ${SOURCE_FOLDER} does not exist.`);
  }
  const destinationFolderExists = fs.pathExistsSync(DESTINATION_FOLDER);

  if (destinationFolderExists) {
    fs.removeSync(DESTINATION_FOLDER);
  }
  fs.ensureDirSync(DESTINATION_FOLDER);

  try {
    fs.copySync(SOURCE_FOLDER, DESTINATION_FOLDER, {
      filter: (src, _dest) => {
        const filteredKeywords = [
          `${SOURCE_FOLDER_NAME}/.git`,
          `${SOURCE_FOLDER_NAME}/.prettierrc.js`,
          `${SOURCE_FOLDER_NAME}/artifacts`,
          `${SOURCE_FOLDER_NAME}/cache`,
          `${SOURCE_FOLDER_NAME}/sample-frontend-code`,
        ];

        for (let i = 0; i < filteredKeywords.length; i++) {
          const filteredKeyword = filteredKeywords[i];
          if (src.includes(filteredKeyword)) {
            return false;
          }
        }

        return true;
      },
    });
    console.log("success!");
  } catch (err) {
    console.error(err);
    return false;
  }

  return true;
}

main();
