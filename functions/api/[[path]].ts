// Cloudflare Pages Functions - API 라우터
import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';
import { cors } from 'hono/cors';

// 메모리 스토리지 with 만료 시간 (24시간)
interface StoredResult {
  data: any;
  expiresAt: number;
}

const storage = new Map<string, StoredResult>();

// 만료된 결과 정리 함수
const cleanupExpiredResults = () => {
  const now = Date.now();
  for (const [key, value] of storage.entries()) {
    if (now > value.expiresAt) {
      storage.delete(key);
      console.log(`만료된 결과 삭제: ${key}`);
    }
  }
};

// 5분마다 만료된 데이터 정리
setInterval(cleanupExpiredResults, 5 * 60 * 1000);

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
    const now = new Date();
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24시간 후 만료
    
    const result = {
      ...body,
      id,
      createdAt: now.toISOString(),
      expiresAt: new Date(expiresAt).toISOString()
    };
    
    // 만료 시간과 함께 저장
    storage.set(id, {
      data: result,
      expiresAt: expiresAt
    });
    
    console.log(`새 결과 저장: ${id}, 만료 시간: ${new Date(expiresAt).toISOString()}`);
    
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
    const storedResult = storage.get(id);
    
    if (!storedResult) {
      return c.json({ error: 'Test result not found' }, 404);
    }
    
    // 만료 시간 확인
    const now = Date.now();
    if (now > storedResult.expiresAt) {
      storage.delete(id);
      console.log(`만료된 결과 접근 시도 및 삭제: ${id}`);
      return c.json({ error: 'Test result has expired' }, 410); // 410 Gone
    }
    
    return c.json(storedResult.data);
  } catch (error) {
    console.error('Error fetching test result:', error);
    return c.json({ error: 'Failed to fetch test result' }, 500);
  }
});

// 헬스 체크 및 통계
app.get('/api/health', (c) => {
  cleanupExpiredResults(); // 헬스 체크 시 정리 실행
  
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    storedResults: storage.size,
    memoryUsage: process.memoryUsage ? process.memoryUsage() : null
  });
});

export const onRequest = handle(app);
