const path = require("path"),
  chalk = require("chalk"),
  fs = require("fs"),
  jq = require("node-jq"),
  inputData = require(path.join(
    path.dirname(__filename),
    "../fixtures",
    "inputData.json"
  )),
  exportData = require(path.join(
    path.dirname(__filename),
    "../fixtures",
    "exportData.json"
  )),
  filter = "[.[] | {legacy_uid,url}]";

const mergeJsons = () => {
  console.log(chalk.bgYellowBright("Starting data preparation..."));
  exportData.reduce((acc, curr) => {
    console.log(`Processing entry: ${curr.legacy_uid}`);

    const entry = inputData.find((el) => el.post_id == curr.legacy_uid);
    if (entry) {
      acc.push({ ...curr, summary: entry.summary, body: entry.body });
    }
    fs.writeFileSync("cypress/fixtures/inputData.json", JSON.stringify(acc));

    return acc;
  }, []);
  console.log(chalk.bgGreenBright("Data preparation done."));
};

const stripExport = async () =>
  await jq
    .run(filter, exportData, { input: "json", output: "json" })
    .then((output) => {
      fs.writeFileSync(
        "cypress/fixtures/exportData.json",
        JSON.stringify(output)
      );
    })
    .catch((error) => {
      console.error(error);
    });

const prepareTestData = async () => {
  await stripExport().then(() => {
    mergeJsons();
  });
};

prepareTestData();
