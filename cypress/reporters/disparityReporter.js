const chalk = require("chalk"),
  fs = require("fs"),
  report = {
    low: [],
    medium: [],
    high: [],
    critical: [],
    skipped: [],
    undetermined: []
  };

class Reporter {
  constructor(runner, options) {
    this._options = options;
    this._runner = runner;
    this.startTime = new Date();
    this.reportName = "disparity_report.json";

    this.onStart();
    this.onPass();
    this.onFail();
    this.onSkip();
    this.onEnd();
  }

  DIFF_TRESHOLDS = {
    LOW: 50,
    MEDIUM: 150,
    HIGH: 250,
    CRITICAL: 350,
  };
  startTime;
  reportName;

  onStart = () => {
    this._runner.on("start", () => {
      this.startTime = new Date();
      console.log(
        `Test execution started at ${this.startTime.toLocaleTimeString()}`
      );
    });
  };

  onPass = () => {
    this._runner.on("pass", (test) => {
      console.log(chalk.green("PASSED"), test.title);
    });
  };

  onSkip = () => {
    this._runner.on("pending", (test) => {
      let field = this.extractFromTestTitle(test.title, " ", 2),
        uid = this.extractFromTestTitle(test.title, "-", 2),
        testId = this.extractFromTestTitle(test.title, " ", 0);

      console.log(
        chalk.blue("SKIPPED"),
        `${testId} ${field} value missing, entry UID - ${uid}`
      );
      report.skipped.push({ UID: Number(uid), missing: field });
    });
  };

  onFail = () => {
    this._runner.on("fail", (test, err) => {
      console.log(chalk.red("FAILED"), test.title);

      let uid = this.extractFromTestTitle(test.title, "-", 2),
        diff = err.actual,
        field = this.extractFromTestTitle(test.title, " ", 2),
        severity = this.determineDiffSeverity(diff);
      report[severity].push({
        UID: Number(uid),
        field: field,
        diff: Number(diff),
      });
    });
  };

  onEnd = () => {
    this._runner.on("end", () => {
      let executionTime = new Date() - this.startTime;

      console.log(`Test execution time: ${this.msToTime(executionTime)}`);
      console.log("Generating report...");

      fs.writeFileSync(
        this.reportName,
        JSON.stringify(report),
        "UTF-8"
      );
    });
  };

  extractFromTestTitle = (title, separator, index) => {
    return title.split(separator)[index].trim();
  };

  determineDiffSeverity = (diff) => {
    if (diff < this.DIFF_TRESHOLDS.LOW) {
      return "low";
    } else if (
      diff > this.DIFF_TRESHOLDS.LOW &&
      diff < this.DIFF_TRESHOLDS.MEDIUM
    ) {
      return "medium";
    } else if (
      diff > this.DIFF_TRESHOLDS.MEDIUM &&
      diff < this.DIFF_TRESHOLDS.HIGH
    ) {
      return "high";
    } else if (diff > this.DIFF_TRESHOLDS.HIGH) {
      return "critical";
    } else {
      return "undetermined"
    }
  };

  msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
  }
}

module.exports = Reporter;
