import * as constants from "../fixtures/constants";

const getTestId = (index) => {
    let hostName = getHostName();
    console.log(hostName);
    return `${constants.BRANDS[hostName].toUpperCase()}-0${index}:`;
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
  getSanitizedData = (pageData, csData) => {
    return prepareData(
      extractTextFromCSExport(pageData),
      extractTextFromCSExport(csData)
    );
  };

export default {
  getTestId,
  getSanitizedData,
  extractTextFromCSExport,
};
