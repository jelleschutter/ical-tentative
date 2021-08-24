export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const iCalUrl = decodeURIComponent(url.pathname).substring(1);
  if (!iCalUrl.startsWith('https://')) {
    return new Response('Invalid URL. See: https://github.com/jelleschutter/tentative-ical#-how-to', { status: 400 });
  }
  const iCalendar = await getICalendar(iCalUrl);
  const iCalPath = new URL(iCalUrl).pathname;
  const iCalFilename = iCalPath.substring(iCalPath.lastIndexOf('/') + 1);
  return new Response(`${iCalendar}`, {
    headers: {
      'Content-Type': 'text/calendar',
      'Content-Disposition': `attachment; filename="${iCalFilename}"`
    }
  });
}

function getICalendar(url: string): Promise<string> {
  return fetch(url)
    .then(response => response.text())
    .then(text => {
      return text.replace(/(\r?\n?)END:VEVENT/g, '$1X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE$1END:VEVENT');
    });
}