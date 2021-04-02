// extracts memory used which is printed in stderr
// returns memory used and filtered stderr
exports.extractMemory = (stderr) => {
  if (!stderr || stderr.length === 0) return { stderr: '', memory: '0' };

  const i = stderr.indexOf('MEM:');
  let memory = '0';
  if (i !== -1) {
    memory = stderr.slice(i).split(' ')[1].trim();
    stderr = stderr.slice(0, i).trim();
  }

  return {
    stderr,
    memory,
  };
};
