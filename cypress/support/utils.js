import * as constants from "../fixtures/constants";

const getTestId = (index) => {
  let hostName = getHostName();

  return `${constants.BRANDS[hostName]}-0${index}:`;
};

const getHostName = () => {
  let host = Cypress.env("host");
  host = host.replace(".com", "");

  return host.replace(/www.|staging.|.preview|.prod|https:\/\/|http:\/\//g, "");
};

//prepare data to assert without special characters and whitespaces
const prepareData = (pageData, csData) => {
  return [
    pageData.replace(/[^a-zA-Z ]|\s/g, ""),
    csData.replace(/[^a-zA-Z ]|\s/g, ""),
  ];
};

const extractTextFromCSExport = (html) => {
  let temp = document.createElement("div");
  temp.innerHTML = html;

  return temp.textContent || temp.innerText;
};

const getSanitizedData = (pageData, csData) => {
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
