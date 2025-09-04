import * as borsh from "borsh";

const value = { x: 255, y: BigInt(20), z: "123", arr: [1, 2, 3] };

const schema = {
  struct: {
    x: "u8",
    y: "u64",
    z: "string",
    arr: { array: { type: "u8" } },
  },
};

const encoded = borsh.serialize(schema, value);
const decoded = borsh.deserialize(schema, encoded);
// const decoded = borsh.deserialize("u8", new Uint8Array([1, 0, 0, 0]));


console.log("Encoded: ", encoded);
console.log("Decoded: ", typeof(decoded), decoded);
