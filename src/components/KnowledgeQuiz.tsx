import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/calculatorCode';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award } from 'lucide-react';

export const KnowledgeQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalCount = QUIZ_QUESTIONS.length;

  const correctCount = QUIZ_QUESTIONS.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Quiz Rápido de Fixação para Iniciantes</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            4 perguntas objetivas para garantir que você absorveu a essência da lógica e sintaxe Python.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {showResults ? (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refazer Quiz</span>
            </button>
          ) : (
            <button
              disabled={answeredCount < totalCount}
              onClick={() => setShowResults(true)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                answeredCount === totalCount
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Conferir Respostas ({answeredCount}/{totalCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Banner */}
      {showResults && (
        <div className="p-5 bg-slate-900 border border-emerald-500/40 rounded-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">
                Seu Desempenho: {correctCount} de {totalCount} acertos!
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {correctCount === totalCount
                  ? 'Parabéns! Você dominou perfeitamente os conceitos da calculadora em Python.'
                  : 'Ótima tentativa! Leia as explicações detalhadas em cada questão para tirar dúvidas.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-5">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const selectedOption = selectedAnswers[q.id];
          const isAnswered = selectedOption !== undefined;
          const isCorrect = selectedOption === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3.5"
            >
              <div className="flex items-start justify-between gap-4">
                <h4 className="text-sm font-semibold text-slate-100 leading-snug">
                  <span className="text-sky-400 font-mono mr-2">0{idx + 1}.</span>
                  {q.question}
                </h4>
                {showResults && (
                  <span
                    className={`px-2 py-0.5 text-[11px] font-semibold rounded shrink-0 ${
                      isCorrect
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}
                  >
                    {isCorrect ? 'Acertou!' : 'Incorreto'}
                  </span>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((option, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  let borderStyle = 'border-slate-800 bg-slate-950/60 hover:border-slate-700 text-slate-300';

                  if (showResults) {
                    if (optIdx === q.correctIndex) {
                      borderStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-medium';
                    } else if (isThisSelected && !isCorrect) {
                      borderStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
                    } else {
                      borderStyle = 'border-slate-900 bg-slate-950/20 text-slate-600';
                    }
                  } else if (isThisSelected) {
                    borderStyle = 'border-sky-500 bg-sky-950/50 text-sky-200 font-medium shadow-sm';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={showResults}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`text-left p-3 rounded-lg border text-xs transition-all flex items-start gap-2.5 ${borderStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current/40 shrink-0 flex items-center justify-center text-[10px] font-mono mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when results are shown */}
              {showResults && (
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 text-xs text-slate-300 space-y-1">
                  <span className="text-[11px] font-semibold text-sky-400 uppercase font-mono tracking-wider">
                    Explicação didática:
                  </span>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
