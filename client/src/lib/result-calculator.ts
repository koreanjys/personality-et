import type { Answer, ResultDescription } from "@shared/schema";

export interface PersonalityScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
  에겐: number;
  테토: number;
}

export const typeDescriptions: Record<string, ResultDescription> = {
  "ENFP + 에겐": {
    description: "열정적이고 창의적인 당신은 감수성이 풍부한 영혼입니다. 사람들과의 깊은 교감을 중시하며, 연애에서도 감정적인 소통과 로맨틱한 분위기를 추구합니다.",
    bestMatch: "INTJ + 테토",
    bestMatchDesc: "체계적이고 목표지향적인 성향이 당신의 자유로운 영혼과 완벽한 조화를 이룹니다.",
    worstMatch: "ESTJ + 테토",
    worstMatchDesc: "너무 현실적이고 직설적인 성향으로 감정적 충돌이 잦을 수 있습니다."
  },
  "ENFP + 테토": {
    description: "활발하고 에너지 넘치는 당신은 새로운 도전을 즐기는 모험가입니다. 연애에서도 적극적이고 활동적인 관계를 선호하며, 파트너와 함께 성장하길 원합니다.",
    bestMatch: "INFJ + 에겐",
    bestMatchDesc: "깊이 있고 이해심 많은 성향이 당신의 열정을 안정적으로 받아줄 수 있습니다.",
    worstMatch: "ISFP + 에겐",
    worstMatchDesc: "소극적이고 내향적인 성향으로 에너지 레벨의 차이가 클 수 있습니다."
  },
  "INTJ + 에겐": {
    description: "독립적이면서도 감성적인 당신은 깊은 사고와 섬세한 감정을 모두 가진 복합적인 성격입니다. 연애에서는 진정한 이해와 정신적 교감을 추구합니다.",
    bestMatch: "ENFP + 테토",
    bestMatchDesc: "활발하고 열정적인 에너지가 당신의 내면세계에 활력을 불어넣어줍니다.",
    worstMatch: "ESFP + 테토",
    worstMatchDesc: "즉흥적이고 감각적인 성향이 당신의 계획적 성격과 맞지 않을 수 있습니다."
  },
  "INTJ + 테토": {
    description: "전략적이고 목표지향적인 당신은 강한 의지력과 추진력을 가진 리더형입니다. 연애에서도 장기적 관점에서 관계를 발전시키려 합니다.",
    bestMatch: "ENFP + 에겐",
    bestMatchDesc: "자유롭고 감성적인 성향이 당신의 체계적 사고에 창의성을 더해줍니다.",
    worstMatch: "ISFP + 테토",
    worstMatchDesc: "두 테토 성향이 만나 주도권 다툼이나 갈등이 생길 수 있습니다."
  },
  "ENTP + 에겐": {
    description: "창의적이고 호기심 많은 당신은 끊임없이 새로운 것을 탐구하는 혁신가입니다. 연애에서도 지적인 자극과 감성적 교감을 모두 추구합니다.",
    bestMatch: "INFJ + 테토",
    bestMatchDesc: "깊이 있는 통찰력과 강한 의지력이 당신의 아이디어를 현실로 만들어줍니다.",
    worstMatch: "ISFJ + 에겐",
    worstMatchDesc: "전통적이고 안정적인 성향이 당신의 변화 욕구와 충돌할 수 있습니다."
  },
  "ENTP + 테토": {
    description: "역동적이고 도전적인 당신은 새로운 가능성을 현실로 만드는 추진력을 가진 개척자입니다. 파트너와 함께 모험을 즐기며 성장하는 관계를 선호합니다.",
    bestMatch: "INFJ + 에겐",
    bestMatchDesc: "차분하고 이해심 깊은 성향이 당신의 활발한 에너지에 안정감을 제공합니다.",
    worstMatch: "ISTJ + 테토",
    worstMatchDesc: "보수적이고 체계적인 성향이 당신의 창의적 자유분방함과 맞지 않을 수 있습니다."
  }
};

export function calculateScores(answers: Answer[]): PersonalityScores {
  const scores: PersonalityScores = {
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0, 에겐: 0, 테토: 0
  };

  answers.forEach(answer => {
    const questionType = getQuestionType(answer.questionId);
    
    if (questionType === "EI") {
      if (answer.selectedOption === "A") scores.E++;
      else scores.I++;
    } else if (questionType === "SN") {
      if (answer.selectedOption === "A") scores.S++;
      else scores.N++;
    } else if (questionType === "TF") {
      if (answer.selectedOption === "A") scores.T++;
      else scores.F++;
    } else if (questionType === "JP") {
      if (answer.selectedOption === "A") scores.J++;
      else scores.P++;
    } else if (questionType === "ET") {
      if (answer.selectedOption === "A") scores.테토++;
      else scores.에겐++;
    }
  });

  return scores;
}

function getQuestionType(questionId: number): "EI" | "SN" | "TF" | "JP" | "ET" {
  const typeMap: Record<number, "EI" | "SN" | "TF" | "JP" | "ET"> = {
    1: "EI", 2: "EI", 3: "SN", 4: "SN", 5: "TF", 
    6: "TF", 7: "JP", 8: "JP", 9: "ET", 10: "ET"
  };
  return typeMap[questionId];
}

export function getPersonalityType(scores: PersonalityScores): string {
  const mbtiType = 
    (scores.E > scores.I ? "E" : "I") +
    (scores.S > scores.N ? "S" : "N") +
    (scores.T > scores.F ? "T" : "F") +
    (scores.J > scores.P ? "J" : "P");
  
  const egenTetoType = scores.에겐 > scores.테토 ? "에겐" : "테토";
  
  return `${mbtiType} + ${egenTetoType}`;
}

export function getResultDescription(personalityType: string): ResultDescription {
  return typeDescriptions[personalityType] || {
    description: "당신은 독특하고 매력적인 성향을 가지고 있습니다. 자신만의 방식으로 사랑하고 관계를 발전시켜 나가는 스타일입니다.",
    bestMatch: "다양한 유형과 좋은 궁합",
    bestMatchDesc: "열린 마음으로 다양한 성향의 사람들과 잘 어울릴 수 있습니다.",
    worstMatch: "극단적 성향",
    worstMatchDesc: "너무 상반된 성향과는 조율이 필요할 수 있습니다."
  };
}
