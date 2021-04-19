// escapes double quotes with backslash
exports.escapeQuotes = (cmd) => {
  escapedCmd = '';
  for (const i in cmd) {
    s = cmd[i];
    if (s === '"') {
      escapedCmd += `\\${s}`;
    } else {
      escapedCmd += s;
    }
  }

  return escapedCmd;
};
