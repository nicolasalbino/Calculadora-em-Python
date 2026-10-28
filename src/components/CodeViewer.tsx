import React, { useState } from 'react';
import {
  CODE_SNIPPETS,
  BASIC_ANNOTATIONS,
  CodeBlockAnnotation,
} from '../data/calculatorCode';
import {
  Copy,
  Check,
  Download,
  Info,
  AlertTriangle,
  Lightbulb,
  Code2,
} from 'lucide-react';

export const CodeViewer: React.FC = () => {
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>('basic');
  const [selectedAnnotation, setSelectedAnnotation] = useState<CodeBlockAnnotation | null>(
    BASIC_ANNOTATIONS[2] // default to input_numeros (float conversion)
  );
  const [copied, setCopied] = useState(false);

  const currentSnippet =
    CODE_SNIPPETS.find((s) => s.id === selectedSnippetId) || CODE_SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentSnippet.pythonCode], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentSnippet.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Syntax highlighting helper for Python
  const renderHighlightedLine = (line: string) => {
    // Check if line is a comment
    if (line.trim().startsWith('#')) {
      return <span className="text-slate-400 italic">{line}</span>;
    }

    // Split preserving delimiters for strings, keywords, etc.
    const parts = line.split(
      /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:def|return|if|elif|else|while|break|continue|try|except|in|not|and|or|True|False)\b|\b(?:print|input|float|int|len|strip)\b|\b\d+(?:\.\d+)?\b)/g
    );

    return (
      <>
        {parts.map((part, i) => {
          if (!part) return null;
          // String
          if (
            (part.startsWith('"') && part.endsWith('"')) ||
            (part.startsWith("'") && part.endsWith("'"))
          ) {
            return (
              <span key={i} className="text-emerald-300">
                {part}
              </span>
            );
          }
          // Keywords
          if (
            [
              'def',
              'return',
              'if',
              'elif',
              'else',
              'while',
              'break',
              'continue',
              'try',
              'except',
              'in',
              'not',
              'and',
              'or',
              'True',
              'False',
            ].includes(part)
          ) {
            return (
              <span key={i} className="text-amber-300 font-medium">
                {part}
              </span>
            );
          }
          // Builtin functions
          if (['print', 'input', 'float', 'int', 'len', 'strip'].includes(part)) {
            return (
              <span key={i} className="text-sky-400 font-medium">
                {part}
              </span>
            );
          }
          // Numbers
          if (/^\d+(\.\d+)?$/.test(part)) {
            return (
              <span key={i} className="text-purple-300">
                {part}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </>
    );
  };

  const lines = currentSnippet.pythonCode.split('\n');

  return (
    <div className="space-y-6">
      {/* Version Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-2 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950/70 rounded-lg border border-slate-800/80">
          {CODE_SNIPPETS.map((snippet) => {
            const isActive = snippet.id === selectedSnippetId;
            return (
              <button
                key={snippet.id}
                onClick={() => {
                  setSelectedSnippetId(snippet.id);
                  if (snippet.id !== 'basic') setSelectedAnnotation(null);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <span>{snippet.title}</span>
                <span className="ml-1.5 opacity-80 text-[10px] uppercase font-mono">
                  [{snippet.badge}]
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Copiar código para a área de transferência"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copiar Código</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            title="Baixar arquivo Python (.py)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Code Editor + Explanation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Code Box (7 columns on large screens) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
              </span>
              <span className="font-mono text-slate-300 font-medium ml-2">
                {currentSnippet.filename}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
              <span>Python 3.10+</span>
              <span>·</span>
              <span>UTF-8</span>
            </div>
          </div>

          {/* Code Text with Line Numbers */}
          <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed max-h-[580px] overflow-y-auto">
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isHighlighted =
                selectedAnnotation &&
                selectedAnnotation.lines.includes(lineNum);

              return (
                <div
                  key={idx}
                  className={`flex items-start group rounded transition-colors ${
                    isHighlighted
                      ? 'bg-sky-500/15 border-l-2 border-sky-400 pl-1'
                      : 'hover:bg-slate-900/50 pl-1.5'
                  }`}
                >
                  <span
                    className={`select-none w-8 text-right pr-4 shrink-0 font-mono text-[11px] ${
                      isHighlighted
                        ? 'text-sky-400 font-bold'
                        : 'text-slate-600 group-hover:text-slate-400'
                    }`}
                  >
                    {lineNum}
                  </span>
                  <span className="text-slate-200 whitespace-pre">
                    {renderHighlightedLine(line)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Explanation Footer on Code Box */}
          <div className="px-4 py-2.5 bg-slate-900/50 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              <span>{currentSnippet.description}</span>
            </span>
            <span className="text-slate-500">{lines.length} linhas</span>
          </div>
        </div>

        {/* Explanations & Line Inspector (5 columns on large screens) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Interactive Inspection Guide */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Info className="w-4 h-4 text-sky-400" />
                <span>Explorador de Blocos de Código</span>
              </h3>
              <span className="text-[11px] text-slate-400">Clique para inspecionar</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Selecione um conceito abaixo para ver exatamente como ele funciona no código e evitar os erros mais comuns cometidos por iniciantes:
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {BASIC_ANNOTATIONS.map((ann) => {
                const isSelected = selectedAnnotation?.id === ann.id;
                return (
                  <button
                    key={ann.id}
                    onClick={() => setSelectedAnnotation(ann)}
                    className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                      isSelected
                        ? 'bg-sky-950/60 border-sky-500 text-sky-200 shadow-sm'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold truncate">{ann.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {ann.tag} · Linhas {ann.lines[0]}-{ann.lines[ann.lines.length - 1]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Concept Detailed Card */}
          {selectedAnnotation && (
            <div className="p-5 bg-slate-900/90 border border-sky-500/30 rounded-xl space-y-4">
              <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-sky-400 font-semibold">
                    {selectedAnnotation.tag}
                  </span>
                  <h4 className="text-base font-bold text-slate-100 mt-0.5">
                    {selectedAnnotation.title}
                  </h4>
                </div>
                <span className="px-2 py-0.5 text-[11px] font-mono bg-sky-500/10 text-sky-300 rounded border border-sky-500/20">
                  L{selectedAnnotation.lines[0]} - L{selectedAnnotation.lines[selectedAnnotation.lines.length - 1]}
                </span>
              </div>

              {/* Summary */}
              <div>
                <p className="text-xs font-medium text-slate-200">
                  {selectedAnnotation.summary}
                </p>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {selectedAnnotation.explanation}
                </p>
              </div>

              {/* Common Beginner Mistake */}
              <div className="p-3 bg-rose-950/30 border border-rose-900/40 rounded-lg text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-rose-300 font-semibold text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Erro comum de quem está começando:</span>
                </div>
                <p className="text-rose-200/80 leading-relaxed text-[11px]">
                  {selectedAnnotation.commonMistake}
                </p>
              </div>

              {/* Pro Tip */}
              <div className="p-3 bg-amber-950/30 border border-amber-900/40 rounded-lg text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-[11px]">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Dica de ouro do Python:</span>
                </div>
                <p className="text-amber-200/80 leading-relaxed text-[11px]">
                  {selectedAnnotation.tip}
                </p>
              </div>
            </div>
          )}

          {/* Quick instructions on how to run */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
            <h4 className="font-semibold text-slate-300 flex items-center gap-1.5">
              <span>Como rodar este código no seu computador:</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px] leading-relaxed">
              <li>
                Instale o Python pelo site oficial{' '}
                <span className="text-sky-400">python.org</span> (marque "Add to PATH").
              </li>
              <li>
                Crie um arquivo chamado <code className="text-amber-300">calculadora.py</code> e cole o código.
              </li>
              <li>
                Abra seu terminal ou prompt de comando na pasta e digite:{' '}
                <code className="text-emerald-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded">
                  python calculadora.py
                </code>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
