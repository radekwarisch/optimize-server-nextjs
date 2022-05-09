import chromium from "chrome-aws-lambda";

export async function middleware(request) {
  const country = request.geo.country || "US";

  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });

  console.log(browser);

  return new Response(`Hello, World. I'm in ${country}`);
}
