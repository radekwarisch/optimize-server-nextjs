export async function middleware(request) {
  const country = request.geo.country || "US";

  console.log("url", request.url);

  return new Response(`Hello, World. I'm in ${country}`);
}
