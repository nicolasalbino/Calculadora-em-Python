import React, { useState } from 'react';
import { CodeViewer } from './components/CodeViewer';
import { TerminalSimulator } from './components/TerminalSimulator';
import { VisualExecution } from './components/VisualExecution';
import { ComponentExplainer } from './components/ComponentExplainer';
import { KnowledgeQuiz } from './components/KnowledgeQuiz';
import { BASIC_CALCULATOR_CODE } from './data/calculatorCode';
import {
  Code2,
  Terminal,
  Calculator,
  BookOpen,
  HelpCircle,
  Download,
  Copy,
  Check,
  CheckCircle2,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'code' | 'terminal' | 'visual' | 'explainer' | 'quiz'
  >('code');
  const [copiedMain, setCopiedMain] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(BASIC_CALCULATOR_CODE);
    setCopiedMain(true);
    setTimeout(() => setCopiedMain(false), 2000);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([BASIC_CALCULATOR_CODE], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculadora_simples.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500/30 selection:text-sky-200">
      {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav Links) - Zone 3 (1 Primary Action) */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text wordmark */}
          <a
            href="/"
            className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-6 h-6 rounded bg-sky-500 text-slate-950 flex items-center justify-center font-mono font-black text-xs">
              Py
            </span>
            <span>PyCalc Guia Python</span>
          </a>

          {/* Zone 2: Concise navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
            <button
              onClick={() => setActiveTab('code')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'code' ? 'text-sky-400 font-semibold' : ''
              }`}
            >
              Código & Anotações
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'terminal' ? 'text-sky-400 font-semibold' : ''
              }`}
            >
              Terminal Interativo
            </button>
            <button
              onClick={() => setActiveTab('visual')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'visual' ? 'text-sky-400 font-semibold' : ''
              }`}
            >
              Simulador Visual
            </button>
            <button
              onClick={() => setActiveTab('explainer')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'explainer' ? 'text-sky-400 font-semibold' : ''
              }`}
            >
              Guia de Componentes
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'quiz' ? 'text-sky-400 font-semibold' : ''
              }`}
            >
              Quiz de Fixação
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              {copiedMain ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar .py</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadCode}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Arquivo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
        {/* Hero Section */}
        <div className="space-y-3 pb-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Guia para Iniciantes</span>
            <span aria-hidden="true">·</span>
            <span>Python 3 Básico</span>
            <span aria-hidden="true">·</span>
            <span>4 Operações Matemáticas</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
            Calculadora Simples em Python:{' '}
            <span className="text-sky-400">Código, Explicação e Execução Passo a Passo</span>
          </h1>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            Seja bem-vindo ao mundo da programação! Criar uma calculadora com as 4 operações básicas (adição, subtração, multiplicação e divisão) é o projeto perfeito para dominar variáveis, capturar entradas do teclado com <code className="text-sky-300 font-mono text-xs">input()</code>, converter tipos numéricos com <code className="text-sky-300 font-mono text-xs">float()</code>, tomar decisões com <code className="text-sky-300 font-mono text-xs">if/elif/else</code> e prevenir erros matemáticos como a divisão por zero.
          </p>
        </div>

        {/* Workspace Segmented Controls (Visible on all devices) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'code'
                ? 'bg-slate-800 text-sky-400 font-semibold shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Código & Anotações</span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'terminal'
                ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal Interativo</span>
          </button>

          <button
            onClick={() => setActiveTab('visual')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'visual'
                ? 'bg-slate-800 text-sky-400 font-semibold shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulador Visual</span>
          </button>

          <button
            onClick={() => setActiveTab('explainer')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'explainer'
                ? 'bg-slate-800 text-amber-400 font-semibold shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guia de Componentes</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'quiz'
                ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Quiz de Fixação</span>
          </button>
        </div>

        {/* Tab Views */}
        {activeTab === 'code' && <CodeViewer />}
        {activeTab === 'terminal' && <TerminalSimulator />}
        {activeTab === 'visual' && <VisualExecution />}
        {activeTab === 'explainer' && <ComponentExplainer />}
        {activeTab === 'quiz' && <KnowledgeQuiz />}

        {/* Footer Proof & Summary Bar */}
        <div className="pt-6 border-t border-slate-900 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="p-3.5 bg-slate-900/40 rounded-lg border border-slate-800/60 space-y-1">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Sintaxe Python 3 Limpa</span>
            </span>
            <p className="text-[11px] text-slate-500">
              Compatível com qualquer versão do Python 3 (3.8 a 3.13+) sem dependências externas.
            </p>
          </div>

          <div className="p-3.5 bg-slate-900/40 rounded-lg border border-slate-800/60 space-y-1">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Segurança Matemática</span>
            </span>
            <p className="text-[11px] text-slate-500">
              Verificação preventiva para evitar o travamento por divisão por zero (ZeroDivisionError).
            </p>
          </div>

          <div className="p-3.5 bg-slate-900/40 rounded-lg border border-slate-800/60 space-y-1">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Didática Acessível</span>
            </span>
            <p className="text-[11px] text-slate-500">
              Comentários em português simples explicando cada função e variável em detalhes.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 px-6 py-4 text-xs text-slate-500 text-center">
        <p>PyCalc · Guia Didático de Programação em Python para Iniciantes</p>
      </footer>
    </div>
  );
}
