const requestCounters = {};

const TIME_OUT_MS = 30_000;
const MAX_REQUESTS = 5;

export const rateLimitMiddleware = (req, res, next) => {
  const ip = req.ip;

  // initialize counter for this ip if it doesn't exist yet
  if (!requestCounters[ip]) {
    requestCounters[ip] = {
      count: 1,
      lastReset: Date.now(),
    };
  }

  const counter = requestCounters[ip];

  // reset the counter if the time window has passed
  if (Date.now() - counter.lastReset > TIME_OUT_MS) {
    counter.count = 0;
    counter.lastReset = Date.now();
  }

  // return a 429 status code if the number of requests exceeds the limit
  if (counter.count > MAX_REQUESTS) {
    return res
      .status(429)
      .send(
        `Too many requests. Wait for ${
          (TIME_OUT_MS - (Date.now() - counter.lastReset)) / 1000
        } s`
      );
  }

  // increment the counter for this ip and continue to the next middleware or route handler
  counter.count++;
  next();
};
