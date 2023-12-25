import { BRANDS } from "../fixtures/constants";

const getTestId = (index) => {
    let hostName = getHostName();

    return `${BRANDS[hostName].toUpperCase()}-0${index}:`;
  },
  getHostName = () => {
    let host = Cypress.env("host");
    host = host.replace(".com", "");

    return host
      .replace(/www.|staging.|.preview|.prod|https:\/\/|http:\/\//g, "")
      .toUpperCase();
  },
  //prepare data to assert without special characters and whitespaces
  prepareData = (pageData, csData) => {
    return [
      pageData.replace(/[^a-zA-Z ]|\s/g, ""),
      csData.replace(/[^a-zA-Z ]|\s/g, ""),
    ];
  },
  extractTextFromCSExport = (html) => {
    let temp = document.createElement("div");
    temp.innerHTML = html;

    return temp.textContent || temp.innerText;
  },
  getPreparedData = (pageData, csData) => {
    return prepareData(
      extractTextFromCSExport(pageData),
      extractTextFromCSExport(csData)
    );
  },
  getNewUrl = (uid) => {
    const exportData = require("../fixtures/exportData.json");

    return exportData.filter((entry) => {
      return entry.legacy_uid == uid;
    });
  };

export default {
  getTestId,
  getPreparedData,
  extractTextFromCSExport,
  getNewUrl
};
