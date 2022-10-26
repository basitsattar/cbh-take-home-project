const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey With String Key as input", () => {
  it("Returns the correct hash when passed normal key", () => {
    const event = { key: "home" };
    const expected = "3796a537d76e2413c753693fc06d9944a748a7e2331cb7352685dfa9e1032f437e6061ec0b9efd245a108639e42ab348ec8991e62671ddb565bf28b9724529f5";
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(expected);
  });
});


describe("deterministicPartitionKey With Partition Key as input", () => {
  it("Returns the same hash when directly passed partition key", () => {
    const event = { partitionKey: "3796a537d76e2413c753693fc06d9944a748a7e2331cb7352685dfa9e1032f437e6061ec0b9efd245a108639e42ab348ec8991e62671ddb565bf28b9724529f5" };
    const expected = "3796a537d76e2413c753693fc06d9944a748a7e2331cb7352685dfa9e1032f437e6061ec0b9efd245a108639e42ab348ec8991e62671ddb565bf28b9724529f5";
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(expected);
  });
});

describe("deterministicPartitionKey with non string partial key event", () => {
  it("Returns just the stringified partitionKey if partitionKey is an object", () => {
    const event = { partitionKey: { key: "3796a537d76e2413c753693fc06d9944a748a7e2331cb7352685dfa9e1032f437e6061ec0b9efd245a108639e42ab348ec8991e62671ddb565bf28b9724529f5" } };
    const expected = JSON.stringify(event.partitionKey);
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(expected);
  });
});

describe("deterministicPartitionKey exceeding max key lenght", () => {
  it("Returns the partition key object after stringifying and hashing again if length exceeds 256", () => {
    const event = { partitionKey: { key: "A quick brown fox jumped over the lazy dog. A quick brown fox jumped over the lazy dog. A quick brown fox jumped over the lazy dog. A quick brown fox jumped over the lazy dog. A quick brown fox jumped over the lazy dog.A quick brown fox jumped over the lazy dog." }}
    const trivialKey = deterministicPartitionKey(event);
    const expected = "9bb5ec6ab9bbe3765dca32c8ed8994ce97353b23516ff919b5d7cd4bb6c502b21604722f48ee1b18ed53d4f6df61d3ebb8133c0f6745f68f25dd172c973cd17a";
    expect(trivialKey).toBe(expected);
  });
});


describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});




