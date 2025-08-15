
import type { Answer } from "@shared/schema";

export interface ResultDescription {
  description: string;
  bestMatch: string;
  bestMatchDesc: string;
  worstMatch: string;
  worstMatchDesc: string;
}

export function calculatePersonalityType(answers: Answer[]): string {
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0,
    에겐: 0, 테토: 0
  };

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    if (question.type === "EI") {
      if (answer.answer === "A") scores.E++;
      else scores.I++;
    } else if (question.type === "SN") {
      if (answer.answer === "A") scores.S++;
      else scores.N++;
    } else if (question.type === "TF") {
      if (answer.answer === "A") scores.T++;
      else scores.F++;
    } else if (question.type === "JP") {
      if (answer.answer === "A") scores.J++;
      else scores.P++;
    } else if (question.type === "ET") {
      if (answer.answer === "A") scores.에겐++;
      else scores.테토++;
    }
  });

  const mbti = 
    (scores.E > scores.I ? "E" : "I") +
    (scores.S > scores.N ? "S" : "N") +
    (scores.T > scores.F ? "T" : "F") +
    (scores.J > scores.P ? "J" : "P");
  
  const egenTeto = scores.에겐 > scores.테토 ? "에겐" : "테토";
  
  return `${mbti} + ${egenTeto}`;
}

export const typeDescriptions: Record<string, ResultDescription> = {
  "ENFP + 에겐": {
    description: "열정적이고 창의적인 당신은 감수성이 풍부한 영혼입니다. 사람들과의 깊은 교감을 중시하며, 연애에서도 감정적인 소통과 로맨틱한 분위기를 추구합니다. 직관적이고 유연한 사고로 새로운 가능성을 탐구하길 좋아하며, 파트너와 함께 꿈을 키워나가고 서로의 감정을 깊이 이해하는 관계를 원합니다. 때로는 변덕스럽지만 진심 어린 사랑을 표현하는 로맨티스트입니다.",
    bestMatch: "INTJ + 테토",
    bestMatchDesc: "최고의 궁합인 INTJ + 테토는 체계적이고 목표지향적인 성향이 당신의 자유로운 영혼과 완벽한 조화를 이룹니다.",
    worstMatch: "ESTJ + 테토",
    worstMatchDesc: "최악의 궁합인 ESTJ + 테토는 너무 현실적이고 직설적인 성향으로 감정적 충돌이 잦을 수 있습니다."
  },
  "ENFP + 테토": {
    description: "활발하고 에너지 넘치는 당신은 새로운 도전을 즐기는 모험가입니다. 연애에서도 적극적이고 활동적인 관계를 선호하며, 파트너와 함께 성장하길 원합니다. 창의적이고 혁신적인 아이디어로 가득하며, 사람들과의 소통을 통해 에너지를 얻습니다. 연인과 함께 다양한 경험을 나누고 새로운 것을 시도하며, 서로를 격려하고 응원하는 역동적인 관계를 추구하는 열정적인 연인입니다.",
    bestMatch: "INFJ + 에겐",
    bestMatchDesc: "최고의 궁합인 INFJ + 에겐은 깊이 있고 이해심 많은 성향이 당신의 열정을 안정적으로 받아줄 수 있습니다.",
    worstMatch: "ISFP + 에겐",
    worstMatchDesc: "최악의 궁합인 ISFP + 에겐은 소극적이고 내향적인 성향으로 에너지 레벨의 차이가 클 수 있습니다."
  },
  "INTJ + 에겐": {
    description: "독립적이면서도 감성적인 당신은 깊은 사고와 섬세한 감정을 모두 가진 복합적인 성격입니다. 연애에서는 진정한 이해와 정신적 교감을 추구합니다. 체계적이고 장기적인 계획을 세우며 목표를 향해 꾸준히 나아가는 성향을 가지고 있습니다. 감정 표현에는 서툴지만 한번 마음을 연 상대에게는 깊은 애정과 헌신을 보여주며, 지적인 대화와 서로의 성장을 지지하는 성숙한 관계를 원합니다.",
    bestMatch: "ENFP + 테토",
    bestMatchDesc: "최고의 궁합인 ENFP + 테토는 활발하고 자유로운 에너지가 당신의 체계적인 성향과 완벽한 균형을 만듭니다.",
    worstMatch: "ESFP + 테토",
    worstMatchDesc: "최악의 궁합인 ESFP + 테토는 즉흥적이고 감정적인 성향으로 당신의 계획적인 스타일과 충돌할 수 있습니다."
  },
  "INTJ + 테토": {
    description: "전략적이고 독립적인 당신은 명확한 목표와 강한 의지를 가진 리더형입니다. 연애에서도 진지하고 깊이 있는 관계를 추구하며, 파트너와 함께 미래를 설계하길 원합니다. 논리적 사고와 체계적인 접근을 통해 문제를 해결하며, 감정보다는 실용성을 중시합니다. 한번 사랑하면 깊고 진실하며, 서로의 개인적 성장과 발전을 지지하는 성숙하고 안정적인 파트너십을 추구합니다.",
    bestMatch: "ENFP + 에겐",
    bestMatchDesc: "최고의 궁합인 ENFP + 에겐은 창의적이고 감성적인 에너지가 당신의 체계적 사고와 완벽한 조화를 이룹니다.",
    worstMatch: "ESFJ + 에겐",
    worstMatchDesc: "최악의 궁합인 ESFJ + 에겐은 감정 중심적이고 전통적인 성향으로 가치관 충돌이 있을 수 있습니다."
  },
  "INFJ + 에겐": {
    description: "신비롭고 깊이 있는 당신은 직관적이면서도 감정이 풍부한 이상주의자입니다. 연애에서는 영혼의 교감과 깊은 정서적 연결을 중시하며, 진정한 사랑을 추구합니다. 타인의 감정을 잘 이해하고 공감능력이 뛰어나며, 파트너의 내면세계를 깊이 탐구하고 이해하려 노력합니다. 조용하지만 강한 내적 에너지를 가지고 있으며, 서로의 꿈과 이상을 함께 추구하는 의미 있는 관계를 원합니다.",
    bestMatch: "ENFP + 테토",
    bestMatchDesc: "최고의 궁합인 ENFP + 테토는 활발하고 에너지 넘치는 성향이 당신의 깊이 있는 내면과 아름다운 균형을 만듭니다.",
    worstMatch: "ESTP + 테토",
    worstMatchDesc: "최악의 궁합인 ESTP + 테토는 현실적이고 즉흥적인 성향으로 당신의 이상주의와 맞지 않을 수 있습니다."
  },
  "INFJ + 테토": {
    description: "통찰력 있고 결단력 있는 당신은 비전을 가지고 목표를 향해 나아가는 실행력 있는 이상주의자입니다. 연애에서는 깊은 정서적 연결과 함께 실질적인 발전도 중시합니다. 상대방의 잠재력을 보고 함께 성장하려 하며, 감정적 지지와 실용적 조언을 균형있게 제공합니다. 조용하지만 강한 의지력을 가지고 있으며, 서로를 이해하고 존중하면서도 함께 발전해나가는 성숙한 파트너십을 추구합니다.",
    bestMatch: "ENTP + 에겐",
    bestMatchDesc: "최고의 궁합인 ENTP + 에겐은 창의적이고 유연한 사고가 당신의 통찰력과 완벽한 시너지를 만듭니다.",
    worstMatch: "ESTJ + 에겐",
    worstMatchDesc: "최악의 궁합인 ESTJ + 에겐은 권위적이고 전통적인 성향으로 당신의 독창적 사고와 충돌할 수 있습니다."
  }
};

// Import questions from test-data
import { questions } from "./test-data";

export function getResultDescription(personalityType: string): ResultDescription {
  return typeDescriptions[personalityType] || {
    description: "당신은 독특하고 특별한 성향을 가지고 있습니다.",
    bestMatch: "다양한 유형",
    bestMatchDesc: "열린 마음으로 다양한 사람들과 좋은 관계를 만들어갈 수 있습니다.",
    worstMatch: "없음",
    worstMatchDesc: "모든 관계는 서로의 이해와 노력으로 발전할 수 있습니다."
  };
}
