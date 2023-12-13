import { BRANDS } from "../fixtures/brands";

const getTestId = (index) => {
  let hostName = getHostName();

  return `${BRANDS[hostName].toUpperCase()}-0${index}:`;
};

const getHostName = () => {
  let host = Cypress.env("host");
  host = host.replace(".com", "");

  return host.replace(/www.|staging.|.preview|.prod|https:\/\/|http:\/\//g, "");
};

//prepare data to assert without special characters and whitespaces
const prepareData = (pageData, csData) => {
  pageData = pageData.text().replace(/[^a-zA-Z ]|\s/g, "");
  csData = csData.replace(/[^a-zA-Z ]|\s/g, "");

  return [pageData, csData];
};

const extractTextFromCSExport = (html) => {
  let temp = document.createElement("div");
  temp.innerHTML = html;

  return temp.textContent || temp.innerText;
};

const getSanitizedData = (pageData, csData) => {
  return prepareData(pageData, extractTextFromCSExport(csData))
}

export default {
  getTestId,
  getSanitizedData
};
