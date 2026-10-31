import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async (params: any) => {
  // Support both next-intl v3.22+ (requestLocale) and standard (locale)
  let locale = params.requestLocale ? await params.requestLocale : params.locale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
