// Cloudflare Pages Functions - API 라우터
import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';
import { cors } from 'hono/cors';

const app = new Hono();

// CORS 설정
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// 성향별 결과 URL 생성 (MBTI-Character 형식)
// 예: INTJ-eigen, ENFP-teto
app.post('/api/test-results', async (c) => {
  try {
    const body = await c.req.json();
    const { personalityType, character, ...resultData } = body;
    
    // 영문 캐릭터명 변환
    const characterEn = character === '에겐' ? 'eigen' : 'teto';
    const resultId = `${personalityType}-${characterEn}`;
    
    const result = {
      ...resultData,
      id: resultId,
      personalityType,
      character,
      createdAt: new Date().toISOString()
    };
    
    console.log(`결과 생성: ${resultId}`);
    
    return c.json(result, 201);
  } catch (error) {
    console.error('Error processing test result:', error);
    return c.json({ error: 'Failed to process test result' }, 500);
  }
});

// 성향별 결과 조회 (실제로는 클라이언트에서 동적 생성)
app.get('/api/test-results/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    // ID 형식 검증 (MBTI-character)
    const match = id.match(/^([A-Z]{4})-(eigen|teto)$/);
    if (!match) {
      return c.json({ error: 'Invalid result ID format' }, 400);
    }
    
    const [, personalityType, characterEn] = match;
    const character = characterEn === 'eigen' ? '에겐' : '테토';
    
    // 클라이언트에서 재계산할 수 있도록 기본 정보만 반환
    const result = {
      id,
      personalityType,
      character,
      message: 'Result found - redirect to client for calculation'
    };
    
    return c.json(result, 200);
  } catch (error) {
    console.error('Error retrieving test result:', error);
    return c.json({ error: 'Failed to retrieve test result' }, 500);
  }
});

// 헬스 체크
app.get('/api/health', async (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Personality test API is running'
  });
});

// 404 핸들러
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

// 에러 핸들러
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

export const onRequest = handle(app);
