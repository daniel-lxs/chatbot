const BYTE_UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB"] as const;

export function formatBytes(bytes: number) {
  if (bytes === 0) {
    return "0 B";
  }

  const sign = bytes < 0 ? "-" : "";
  const absoluteBytes = Math.abs(bytes);
  const unitIndex = Math.min(
    Math.floor(Math.log(absoluteBytes) / Math.log(1024)),
    BYTE_UNITS.length - 1
  );
  const value = absoluteBytes / 1024 ** unitIndex;
  const formattedValue =
    unitIndex === 0 || value >= 10
      ? Math.round(value).toString()
      : value.toFixed(1).replace(/\.0$/, "");

  return `${sign}${formattedValue} ${BYTE_UNITS[unitIndex]}`;
}
