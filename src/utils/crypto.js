import crypto from "crypto-js";
import randomBytes from "./randomBytes";

const secretKey = crypto.enc.Utf8.parse("vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3");
const iv = crypto.enc.Hex.parse(randomBytes(16));

export const encrypt = (text) => {
  const encrypted = crypto.AES.encrypt(text, secretKey, {
    iv,
    mode: crypto.mode.CTR,
    format: crypto.format.Hex,
  });

  return {
    iv: encrypted.iv.toString(crypto.enc.Hex),
    content: encrypted.ciphertext.toString(crypto.enc.Hex),
  };
};
