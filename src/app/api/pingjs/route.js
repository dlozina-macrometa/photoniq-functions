export function GET(req) {
  return new Response('[GET] PhotonIQ FaaS function is working.', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}

export function POST(req) {
  return new Response('[POST] PhotonIQ FaaS function is working.', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}