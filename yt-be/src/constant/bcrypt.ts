import getEnvToVar from "../helpers/getEnvToVar";

export const saltBcrypt = 12;

export const secretCryptoAes = getEnvToVar("CRYPTO_SECRET");
