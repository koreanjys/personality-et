// Cloudflare Pages Functions - API 라우터
import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';
import { cors } from 'hono/cors';

// 메모리 스토리지 (실제 운영에서는 D1 데이터베이스 사용 권장)
const storage = new Map();

const app = new Hono();

// CORS 설정
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// 테스트 결과 저장
app.post('/api/test-results', async (c) => {
  try {
    const body = await c.req.json();
    const id = crypto.randomUUID();
    const result = {
      ...body,
      id,
      createdAt: new Date().toISOString()
    };
    
    storage.set(id, result);
    
    return c.json(result, 201);
  } catch (error) {
    console.error('Error saving test result:', error);
    return c.json({ error: 'Failed to save test result' }, 500);
  }
});

// 테스트 결과 조회
app.get('/api/test-results/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const result = storage.get(id);
    
    if (!result) {
      return c.json({ error: 'Test result not found' }, 404);
    }
    
    return c.json(result);
  } catch (error) {
    console.error('Error fetching test result:', error);
    return c.json({ error: 'Failed to fetch test result' }, 500);
  }
});

// 헬스 체크
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export const onRequest = handle(app);
