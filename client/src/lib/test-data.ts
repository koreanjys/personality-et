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
    question: "중요한 결정을 내릴 때:",
    optionA: "논리적 분석과 객관적 사실을 우선한다",
    optionB: "사람들의 감정과 가치관을 고려한다",
    type: "TF",
  },
  {
    id: 6,
    question: "친구가 고민을 털어놓을 때:",
    optionA: "문제 해결을 위한 구체적인 조언을 준다",
    optionB: "공감하며 감정적 지지를 보여준다",
    type: "TF",
  },
  {
    id: 7,
    question: "계획을 세울 때 당신은:",
    optionA: "미리 세세하게 계획하고 일정을 지킨다",
    optionB: "대략적인 방향만 정하고 유연하게 대처한다",
    type: "JP",
  },
  {
    id: 8,
    question: "여행을 갈 때:",
    optionA: "일정과 예약을 미리 완벽하게 준비한다",
    optionB: "즉흥적으로 그 순간의 기분에 따라 결정한다",
    type: "JP",
  },
  {
    id: 9,
    question: "연애에서 당신의 스타일은:",
    optionA: "직접적이고 적극적으로 감정을 표현한다",
    optionB: "섬세하고 은은하게 마음을 전달한다",
    type: "ET",
  },
  {
    id: 10,
    question: "갈등 상황에서 당신은:",
    optionA: "문제를 정면으로 마주하고 해결하려 한다",
    optionB: "상황을 피하거나 부드럽게 넘어가려 한다",
    type: "ET",
  },
];
