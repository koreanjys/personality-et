import type { Question } from "@shared/schema";

export const questions: Question[] = [
  {
    id: 1,
    question: "새로운 사람들과 만날 때, 당신은 어떤 편인가요?",
    optionA: "먼저 다가가서 대화를 시작한다",
    optionB: "상대방이 먼저 말을 걸어주기를 기다린다",
    type: "EI",
  },
  {
    id: 2,
    question: "파티에서 당신의 모습은?",
    optionA: "여러 사람들과 활발하게 대화하며 에너지를 얻는다",
    optionB: "친한 몇몇 사람들과 깊이 있는 대화를 나눈다",
    type: "EI",
  },
  {
    id: 3,
    question: "일을 처리할 때 당신의 스타일은?",
    optionA: "구체적인 사실과 세부사항에 집중한다",
    optionB: "전체적인 그림과 가능성을 먼저 본다",
    type: "SN",
  },
  {
    id: 4,
    question: "새로운 아이디어를 받아들일 때:",
    optionA: "현실적이고 실용적인지 먼저 따져본다",
    optionB: "창의적이고 혁신적인 가능성에 흥미를 느낀다",
    type: "SN",
  },
  {
    id: 5,
    question: "결정을 내릴 때 당신은:",
    optionA: "논리적 분석과 객관적 사실을 중시한다",
    optionB: "사람들의 감정과 가치관을 우선 고려한다",
    type: "TF",
  },
  {
    id: 6,
    question: "갈등 상황에서 당신의 접근법은?",
    optionA: "문제의 원인을 분석하고 합리적 해결책을 찾는다",
    optionB: "관련된 사람들의 기분을 먼저 살피고 화합을 추구한다",
    type: "TF",
  },
  {
    id: 7,
    question: "계획을 세울 때 당신은:",
    optionA: "세부적인 일정표를 만들고 단계별로 진행한다",
    optionB: "큰 틀만 정하고 상황에 따라 유연하게 조정한다",
    type: "JP",
  },
  {
    id: 8,
    question: "마감일이 있는 일을 할 때:",
    optionA: "미리미리 계획을 세워서 여유있게 완성한다",
    optionB: "마감일이 다가와야 집중력이 생기고 효율이 높아진다",
    type: "JP",
  },
  {
    id: 9,
    question: "휴가를 계획할 때:",
    optionA: "여행 일정과 숙소를 미리 예약하고 계획한다",
    optionB: "대략적인 목적지만 정하고 현지에서 즉흥적으로 결정한다",
    type: "JP",
  },
  {
    id: 10,
    question: "스트레스를 받을 때 당신의 대처법은?",
    optionA: "혼자만의 시간을 가지며 차분히 생각을 정리한다",
    optionB: "친구들과 만나서 이야기하며 기분을 풀어낸다",
    type: "EI",
  },
];
