const UTM_PARAMS = {
  utm_source: "create-next-app",
  utm_medium: "appdir-template-tw",
  utm_campaign: "create-next-app",
};

export function withUtm(url: string): string {
  const parsed = new URL(url);
  for (const [key, value] of Object.entries(UTM_PARAMS)) {
    parsed.searchParams.set(key, value);
  }
  return parsed.toString();
}
