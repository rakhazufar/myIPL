function convertTimestampToDateTime(timestamp) {
  const date = new Date(timestamp * 1000); // Mengonversi ke milidetik
  return date.toISOString();
}

module.exports = { convertTimestampToDateTime };
