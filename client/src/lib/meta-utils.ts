// 동적 메타데이터 업데이트 유틸리티

export interface MetaDataConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

export function updateMetaData(config: MetaDataConfig) {
  // Title 업데이트
  if (config.title) {
    document.title = config.title;
  }

  // Description 메타태그 업데이트
  updateMetaTag('name', 'description', config.description);

  // Keywords 메타태그 업데이트
  if (config.keywords) {
    updateMetaTag('name', 'keywords', config.keywords);
  }

  // Open Graph 메타태그 업데이트
  if (config.ogTitle || config.title) {
    updateMetaTag('property', 'og:title', config.ogTitle || config.title);
  }
  
  if (config.ogDescription || config.description) {
    updateMetaTag('property', 'og:description', config.ogDescription || config.description);
  }

  if (config.ogUrl) {
    updateMetaTag('property', 'og:url', config.ogUrl);
  }

  // Twitter Card 메타태그 업데이트
  if (config.twitterTitle || config.title) {
    updateMetaTag('name', 'twitter:title', config.twitterTitle || config.title);
  }
  
  if (config.twitterDescription || config.description) {
    updateMetaTag('name', 'twitter:description', config.twitterDescription || config.description);
  }
}

function updateMetaTag(attributeType: 'name' | 'property', attributeName: string, content: string) {
  let metaTag = document.querySelector(`meta[${attributeType}="${attributeName}"]`);
  
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attributeType, attributeName);
    document.head.appendChild(metaTag);
  }
  
  metaTag.setAttribute('content', content);
}

// 결과 페이지용 메타데이터 생성
export function generateResultMetaData(personalityType: string, isKorean: boolean) {
  const baseUrl = 'https://personality-et.jybr.me';
  
  if (isKorean) {
    return {
      title: `${personalityType} 성격 유형 | 무료 MBTI 성향 테스트 결과`,
      description: `당신의 성격 유형은 ${personalityType}입니다! 상세한 성격 분석과 에겐-테토와의 궁합을 확인해보세요.`,
      keywords: `${personalityType}, 성격테스트결과, MBTI테스트결과, 성향분석, 궁합테스트, 에겐테토`,
      ogTitle: `${personalityType} 성격 유형 결과`,
      ogDescription: `나의 성격 유형: ${personalityType} - 무료 성격 테스트로 알아본 나의 성향과 궁합!`,
      ogUrl: `${baseUrl}?result=${encodeURIComponent(personalityType)}`,
      twitterTitle: `나의 성격 유형: ${personalityType}`,
      twitterDescription: `무료 성격 테스트 결과를 확인해보세요! ${personalityType}의 특징과 궁합 분석`
    };
  } else {
    return {
      title: `${personalityType} Personality Type | Free MBTI Test Results`,
      description: `Your personality type is ${personalityType}! Discover detailed personality analysis and compatibility with Egen-Teto characters.`,
      keywords: `${personalityType}, personality test results, MBTI test results, personality analysis, compatibility test, Egen Teto`,
      ogTitle: `${personalityType} Personality Type Results`,
      ogDescription: `My personality type: ${personalityType} - Discover your traits and compatibility with free personality test!`,
      ogUrl: `${baseUrl}?result=${encodeURIComponent(personalityType)}`,
      twitterTitle: `My personality type: ${personalityType}`,
      twitterDescription: `Check out my free personality test results! ${personalityType} traits and compatibility analysis`
    };
  }
}

// 브라우저 언어 감지
export function detectBrowserLanguage(): boolean {
  const browserLanguage = navigator.language || navigator.languages?.[0] || 'en';
  return browserLanguage.toLowerCase().startsWith('ko');
}
