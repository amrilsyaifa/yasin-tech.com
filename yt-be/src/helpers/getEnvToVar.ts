type EnvVariableKey =
  | "DATABASE_URL"
  | "JWT_SECRET_KEY"
  | "JWT_EXPIRES_IN"
  | "JWT_REFRESH_EXPIRES_IN"
  | "CRYPTO_SECRET"
  | "SEED_SECRET"
  | "NODE_ENV"
  | "GOOGLE_USER_INFO_URL"
  | "BASE_URL"
  | "PORT";

function getEnvToVar(key: EnvVariableKey): string {
  const value = process.env[key];

  if (!value || value.length === 0) {
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
}

export default getEnvToVar;
