const exportData = require("cypress/fixtures/exportData.json"),
  fs = require("fs"),
  inputData = require("cypress/fixtures/inputData.json"),
  jq = require("node-jq"),
  filter = "[.[] | {legacy_uid,url}]";

const mergeJsons = () => {
  exportData.reduce((a, p) => {
    const test = inputData.find((u) => u.post_id == p.legacy_uid);
    if (test) {
      a.push({ ...p, summary: test.summary, body: test.body });
    }
    fs.writeFileSync(inputData, JSON.stringify(a));
    return a;
  }, []);
};

const stripExport = () =>
  jq
    .run(filter, exportData, { output: "json" })
    .then((output) => {
      fs.writeFileSync(exportData, JSON.stringify(output));
    })
    .catch((error) => {
      console.error(error);
    });

const prepareTestData = () => {
  stripExport();
  mergeJsons();
};

prepareTestData();
