import type { QuestionBase, Responses } from './types';

/** Whether a conditional question should be shown given the current responses. */
export function isQuestionVisible(q: QuestionBase, responses: Responses): boolean {
  if (q.required !== 'conditional' || !q.showWhen || q.showWhen.length === 0) return true;
  return q.showWhen.some(({ questionId, answerIndices }) => {
    const val = responses[questionId];
    return typeof val === 'number' && answerIndices.includes(val);
  });
}
