export function getRequiredEnv(primaryName: string, fallbackName?: string): string {
  const value =
    resolveEnvValue(process.env[primaryName]) ||
    (fallbackName ? resolveEnvValue(process.env[fallbackName]) : undefined);
  if (!value) {
    const names = fallbackName ? `${primaryName} or ${fallbackName}` : primaryName;
    throw new Error(`Missing required environment variable: ${names}`);
  }
  return value.trim();
}

function resolveEnvValue(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const match = value.match(/^\$\{([A-Z0-9_]+)\}$/);
  if (match) {
    return process.env[match[1]];
  }

  return value;
}

const targetEnv = (process.env.TEST_ENV || process.env.ENV_NAME || 'STG3').toUpperCase();

export const boEnv = {
  url: () => getRequiredEnv(`${targetEnv}_BO_URL`, 'BO_BASE_URL'),
  user: () => getRequiredEnv(`${targetEnv}_BO_ADMIN_EMAIL`, 'BO_ADMIN_EMAIL'),
  pass: () => getRequiredEnv(`${targetEnv}_BO_ADMIN_PASSWORD`, 'BO_ADMIN_PASSWORD'),
};

export const wmtEnv = {
  url: () => getRequiredEnv(`${targetEnv}_WMT_URL`, 'BASE_URL'),
  user: () => getRequiredEnv(`${targetEnv}_FO_EMAIL`, 'FO_ADMIN_EMAIL'),
  pass: () => getRequiredEnv(`${targetEnv}_FO_PASSWORD`, 'FO_ADMIN_PASSWORD'),
};
