export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const iCalUrl = decodeURIComponent(url.pathname).substring(6);
  if (!(iCalUrl.startsWith('https://') || iCalUrl.startsWith('http://'))) {
    return new Response('Invalid URL. See: https://github.com/jelleschutter/tentative-ical#-how-to', { status: 400 });
  }
  const iCalendar = await getICalendar(iCalUrl);
  if (iCalendar === '') {
    return new Response('Could not detect a iCalendar.', { status: 400 });
  }
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
    .then(response => {
      if (response.headers.get('content-type') !== 'text/calendar') {
        return '';
      }
      return response.text();
    })
    .then(text => {
      if (!text) {
        return '';
      }
      return text.replace(/(\r?\n?)END:VEVENT/g, '$1X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE$1END:VEVENT');
    });
}