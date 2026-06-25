import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/auth/login', async () => {
    return HttpResponse.json({
      data: {
        token: 'mock-token',
        user: {
          id: 'u1',
          name: 'Demo User',
          email: 'demo@flowdesk.com',
          permissions: ['request:read', 'request:create'],
        },
      },
    });
  }),

  http.get('/requests', async () => {
    return HttpResponse.json({
      data: [
        {
          id: 'r1',
          title: 'Laptop talebi',
          type: 'purchase',
          status: 'submitted',
          createdAt: new Date().toISOString(),
          requesterId: 'u1',
        },
      ],
    });
  }),

  http.post('/requests', async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json({
      data: {
        id: 'r-new',
        ...(body as object),
        status: 'draft',
        createdAt: new Date().toISOString(),
        requesterId: 'u1',
      },
    });
  }),
];
