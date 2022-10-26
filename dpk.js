const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = "0";

  if (event) {
    if (event.partitionKey) {
      candidate = typeof event.partitionKey === "string" ? event.partitionKey : JSON.stringify(event.partitionKey);

      if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
        candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
      }
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }
  
  return candidate;
};