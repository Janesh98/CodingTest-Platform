class Runtime {
  static getRunTime = (startDT, endDT) => {
    const startTime = new Date(startDT);
    const endTime = new Date(endDT);
    return Math.abs(endTime.getTime() - startTime.getTime()) / 1000;
  };
}

module.exports = Runtime;
