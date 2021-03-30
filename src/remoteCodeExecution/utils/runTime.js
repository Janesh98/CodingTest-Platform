exports.getRunTime = (startDT, endDT) => {
  const startTime = new Date(startDT);
  const endTime = new Date(endDT);
  return Math.abs(endTime - startTime) / 1000;
};
