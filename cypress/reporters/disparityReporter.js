const chalk = require("chalk");
const fs = require("fs");

const report = {
  low: [],
  medium: [],
  high: [],
  critical: [],
};

class Reporter {
  constructor(runner, options) {
    this._options = options;
    this._runner = runner;

    this.onPass();
    this.onFail();
    this.onEnd();
  }

  DIFF_TRESHOLDS = {
    low: 50,
    medium: 150,
    high: 250,
    critical: 350,
  };

  onPass = () => {
    this._runner.on("pass", (test) => {
      console.log(chalk.green("PASSED"), test.title);
    });
  };

  onFail = () => {
    this._runner.on("fail", (test, err) => {
      console.log(chalk.red("FAILED"), test.title);
      
      let uid = test.title.split("-")[2].trim();
      let diff = err.actual;
      let entry = {
        UID: Number(uid),
        Diff: Number(diff),
      };

      let severity = this.determineDiffSeverity(diff);
      report[severity].push(entry);
    });
  };

  onEnd = () => {
    this._runner.on("end", () => {
      console.log("Generating report...");
      fs.writeFileSync("disparity-report.json", JSON.stringify(report), "utf-8");
    });
  };

  determineDiffSeverity = (diff) => {
    if (diff < this.DIFF_TRESHOLDS["low"] === true) {
      return "low";
    } else if (
      diff > this.DIFF_TRESHOLDS["low"] === true &&
      diff < this.DIFF_TRESHOLDS["medium"] === true
    ) {
      return "medium";
    } else if (
      diff > this.DIFF_TRESHOLDS["medium"] === true &&
      diff < this.DIFF_TRESHOLDS["high"] === true
    ) {
      return "high";
    } else {
      return "critical";
    }
  };
}

module.exports = Reporter;
