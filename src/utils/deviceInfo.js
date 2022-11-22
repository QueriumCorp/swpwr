export default function deviceIsMobile() {
  console.info(
    "isMobile:",
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
  );
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
}
