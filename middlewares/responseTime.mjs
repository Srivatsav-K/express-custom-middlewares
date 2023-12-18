const AVG_CALCULATION_INTERVAL_MS = 60_000;
const responseTimes = [];

export const responseTime = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const end = Date.now();
    const responseTime = end - start;
    responseTimes.push(responseTime);
    console.log(`Request took ${responseTime}ms`);
  });

  next();
};

// Calculate average response time periodically
setInterval(() => {
  const totalResponseTime = responseTimes.reduce((acc, time) => acc + time, 0);

  const averageResponseTime = totalResponseTime / responseTimes.length || 0;

  console.log(`Average Response Time: ${averageResponseTime.toFixed(3)}ms`);

  // Reset the array for the next period
  responseTimes.length = 0;
}, AVG_CALCULATION_INTERVAL_MS);
