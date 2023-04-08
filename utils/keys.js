const crypto = require("crypto");

// const { privateKey, publicKey } = crypto.generateKeyPair("rsa", {
//   modulusLength: 2048,
//   publicKeyEncoding: {
//     type: "spki",
//     format: "pem",
//   },
//   privateKeyEncoding: {
//     type: "pkcs8",
//     format: "pem",
//   },
// });

const public_key = crypto.createPublicKey({
  key: Buffer.from(process.env.public_KEY),
  type: "spki",
  format: "pem",
});

const private_key = crypto.createPrivateKey({
  key: Buffer.from(process.env.private_KEY),
  type: "pkcs8",
  format: "pem",
});

module.exports = { private_key, public_key };
