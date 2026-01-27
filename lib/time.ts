export function getNow(req: Request) {
  if (process.env.TEST_MODE === "1") {
    const testNow = req.headers.get("x-test-now-ms");
    if (testNow) {
      const parsed = Number(testNow);
      if (!isNaN(parsed)) return parsed;
    }
  }
  return Date.now();
}
