import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Terminal,
  Cpu,
  CornerDownLeft,
  Sparkles,
} from 'lucide-react';

type Step = 'NOT_STARTED' | 'WAITING_OP' | 'WAITING_NUM1' | 'WAITING_NUM2' | 'FINISHED';

interface TerminalLine {
  text: string;
  type: 'system' | 'output' | 'input' | 'error' | 'success';
}

export const TerminalSimulator: React.FC = () => {
  const [step, setStep] = useState<Step>('WAITING_OP');
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: '$ python calculadora.py', type: 'system' },
    { text: '==============================', type: 'output' },
    { text: '     CALCULADORA EM PYTHON    ', type: 'output' },
    { text: '==============================', type: 'output' },
    { text: '1 - Adição (+)', type: 'output' },
    { text: '2 - Subtração (-)', type: 'output' },
    { text: '3 - Multiplicação (*)', type: 'output' },
    { text: '4 - Divisão (/)', type: 'output' },
    { text: '==============================', type: 'output' },
    { text: 'Digite o número da operação desejada (1/2/3/4): ', type: 'system' },
  ]);

  const [currentInput, setCurrentInput] = useState('');
  const [opValue, setOpValue] = useState<string>('');
  const [num1Value, setNum1Value] = useState<number | null>(null);
  const [num2Value, setNum2Value] = useState<number | null>(null);
  const [pythonThought, setPythonThought] = useState<string>(
    'O programa está pausado no primeiro `input()`, aguardando você digitar a operação desejada (1, 2, 3 ou 4) e teclar Enter.'
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const restart = () => {
    setStep('WAITING_OP');
    setOpValue('');
    setNum1Value(null);
    setNum2Value(null);
    setLines([
      { text: '$ python calculadora.py', type: 'system' },
      { text: '==============================', type: 'output' },
      { text: '     CALCULADORA EM PYTHON    ', type: 'output' },
      { text: '==============================', type: 'output' },
      { text: '1 - Adição (+)', type: 'output' },
      { text: '2 - Subtração (-)', type: 'output' },
      { text: '3 - Multiplicação (*)', type: 'output' },
      { text: '4 - Divisão (/)', type: 'output' },
      { text: '==============================', type: 'output' },
      { text: 'Digite o número da operação desejada (1/2/3/4): ', type: 'system' },
    ]);
    setPythonThought(
      'O programa está pausado no primeiro `input()`, aguardando você digitar a operação desejada (1, 2, 3 ou 4) e teclar Enter.'
    );
    setCurrentInput('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleUserInput = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed && step !== 'FINISHED') return;

    if (step === 'WAITING_OP') {
      const newLines = [...lines, { text: trimmed, type: 'input' as const }];
      setOpValue(trimmed);

      if (['1', '2', '3', '4'].includes(trimmed)) {
        const opName =
          trimmed === '1'
            ? 'Adição (+)'
            : trimmed === '2'
            ? 'Subtração (-)'
            : trimmed === '3'
            ? 'Multiplicação (*)'
            : 'Divisão (/)';

        newLines.push({
          text: `> Operação válida selecionada: ${opName}`,
          type: 'output',
        });
        newLines.push({
          text: 'Digite o primeiro número: ',
          type: 'system',
        });

        setStep('WAITING_NUM1');
        setPythonThought(
          `Variável operacao guardou '${trimmed}'. A condição if operacao in ['1','2','3','4'] deu Verdadeiro! Agora executando: num1 = float(input(...))`
        );
      } else {
        newLines.push({
          text: '\nOpção inválida! Escolha um número de 1 a 4.',
          type: 'error',
        });
        newLines.push({
          text: 'Processo finalizado com status 1 (código encerrou no bloco else).',
          type: 'system',
        });
        setStep('FINISHED');
        setPythonThought(
          `Como '${trimmed}' não está entre 1 e 4, o Python pulou para o bloco 'else' final e encerrou a execução.`
        );
      }
      setLines(newLines);
      setCurrentInput('');
    } else if (step === 'WAITING_NUM1') {
      const parsedNum = parseFloat(trimmed.replace(',', '.'));
      const newLines = [...lines, { text: trimmed, type: 'input' as const }];

      if (isNaN(parsedNum)) {
        newLines.push({
          text: `ValueError: could not convert string to float: '${trimmed}'`,
          type: 'error',
        });
        newLines.push({
          text: 'O Python tentou converter o texto com float(), mas falhou pois não é um número válido.',
          type: 'system',
        });
        setStep('FINISHED');
        setPythonThought(
          `Erro no Python! A função float('${trimmed}') quebrou o programa porque você digitou letras. Na versão com 'try/except' poderíamos tratar isso!`
        );
      } else {
        setNum1Value(parsedNum);
        newLines.push({
          text: 'Digite o segundo número: ',
          type: 'system',
        });
        setStep('WAITING_NUM2');
        setPythonThought(
          `Sucesso: num1 = ${parsedNum} (tipo float guardado na memória). Agora executando a linha: num2 = float(input(...))`
        );
      }
      setLines(newLines);
      setCurrentInput('');
    } else if (step === 'WAITING_NUM2') {
      const parsedNum2 = parseFloat(trimmed.replace(',', '.'));
      const newLines = [...lines, { text: trimmed, type: 'input' as const }];

      if (isNaN(parsedNum2)) {
        newLines.push({
          text: `ValueError: could not convert string to float: '${trimmed}'`,
          type: 'error',
        });
        setStep('FINISHED');
        setPythonThought(
          `Erro de conversão! O Python não conseguiu transformar '${trimmed}' em número.`
        );
      } else {
        setNum2Value(parsedNum2);
        const n1 = num1Value ?? 0;
        const n2 = parsedNum2;

        if (opValue === '1') {
          const res = n1 + n2;
          newLines.push({
            text: `\nResultado: ${n1} + ${n2} = ${res}`,
            type: 'success',
          });
          setPythonThought(
            `O Python entrou em 'if operacao == "1":' e executou 'resultado = num1 + num2'. Imprimiu na tela usando f-string: ${n1} + ${n2} = ${res}`
          );
        } else if (opValue === '2') {
          const res = n1 - n2;
          newLines.push({
            text: `\nResultado: ${n1} - ${n2} = ${res}`,
            type: 'success',
          });
          setPythonThought(
            `O Python testou o primeiro if (falso), caiu em 'elif operacao == "2":' e calculou 'resultado = num1 - num2'. Resultado: ${res}`
          );
        } else if (opValue === '3') {
          const res = n1 * n2;
          newLines.push({
            text: `\nResultado: ${n1} * ${n2} = ${res}`,
            type: 'success',
          });
          setPythonThought(
            `O Python entrou em 'elif operacao == "3":' e calculou 'resultado = num1 * num2' usando o operador asterisco (*). Resultado: ${res}`
          );
        } else if (opValue === '4') {
          if (n2 !== 0) {
            const res = n1 / n2;
            newLines.push({
              text: `\nResultado: ${n1} / ${n2} = ${res}`,
              type: 'success',
            });
            setPythonThought(
              `Verificação de segurança 'if num2 != 0' passou! O divisor ${n2} é seguro. O Python fez a divisão: ${n1} / ${n2} = ${res}`
            );
          } else {
            newLines.push({
              text: '\nErro matemático: Não é possível dividir por zero!',
              type: 'error',
            });
            setPythonThought(
              'Aviso de proteção acionado! O bloco else de proteção disparou porque num2 é exatamente 0. Isso salvou seu programa de travar com ZeroDivisionError!'
            );
          }
        }

        newLines.push({
          text: '\n--- Execução concluída com sucesso ---',
          type: 'system',
        });
        setStep('FINISHED');
      }
      setLines(newLines);
      setCurrentInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserInput(currentInput);
    }
  };

  const loadScenario = (op: string, n1: string, n2: string) => {
    restart();
    setTimeout(() => {
      // Step 1
      handleUserInput(op);
      setTimeout(() => {
        handleUserInput(n1);
        setTimeout(() => {
          handleUserInput(n2);
        }, 150);
      }, 150);
    }, 100);
  };

  return (
    <div className="space-y-6">
      {/* Action bar & Presets */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Terminal Interativo de Python (Simulador ao Vivo)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Experimente rodar o código exatamente como ele funciona no terminal do seu computador.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={restart}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Terminal</span>
          </button>
        </div>
      </div>

      {/* Quick Scenarios Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-400">
        <span className="shrink-0 text-slate-500 font-medium">Testes Rápidos:</span>
        <button
          onClick={() => loadScenario('1', '25', '14.5')}
          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-md transition-colors whitespace-nowrap shrink-0"
        >
          Soma (25 + 14.5)
        </button>
        <button
          onClick={() => loadScenario('3', '12', '8')}
          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-md transition-colors whitespace-nowrap shrink-0"
        >
          Multiplicação (12 * 8)
        </button>
        <button
          onClick={() => loadScenario('4', '50', '4')}
          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-md transition-colors whitespace-nowrap shrink-0"
        >
          Divisão Normal (50 / 4)
        </button>
        <button
          onClick={() => loadScenario('4', '10', '0')}
          className="px-2.5 py-1 bg-rose-950/40 hover:bg-rose-950/70 text-rose-300 border border-rose-900/50 rounded-md transition-colors whitespace-nowrap shrink-0"
        >
          Divisão por Zero (10 / 0)
        </button>
        <button
          onClick={() => loadScenario('9', '', '')}
          className="px-2.5 py-1 bg-amber-950/40 hover:bg-amber-950/70 text-amber-300 border border-amber-900/50 rounded-md transition-colors whitespace-nowrap shrink-0"
        >
          Opção Inválida (9)
        </button>
      </div>

      {/* Terminal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Terminal Canvas (8 cols) */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs flex flex-col min-h-[440px] cursor-text"
        >
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span className="text-slate-400 font-sans text-xs font-medium ml-2">
                Terminal Bash · python3
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-sans">calculadora.py</span>
          </div>

          {/* Terminal Output Stream */}
          <div className="p-4 flex-1 overflow-y-auto space-y-1.5 leading-relaxed">
            {lines.map((line, idx) => {
              if (line.type === 'system') {
                return (
                  <div key={idx} className="text-sky-400 font-semibold">
                    {line.text}
                  </div>
                );
              }
              if (line.type === 'input') {
                return (
                  <div key={idx} className="text-slate-200">
                    <span className="text-emerald-400">&gt;&gt;&gt; </span>
                    <span className="font-bold underline decoration-sky-500/40">{line.text}</span>
                  </div>
                );
              }
              if (line.type === 'error') {
                return (
                  <div key={idx} className="text-rose-400 font-semibold">
                    {line.text}
                  </div>
                );
              }
              if (line.type === 'success') {
                return (
                  <div key={idx} className="text-emerald-400 font-bold text-sm bg-emerald-950/30 p-2 rounded border border-emerald-900/50">
                    {line.text}
                  </div>
                );
              }
              return (
                <div key={idx} className="text-slate-300">
                  {line.text}
                </div>
              );
            })}

            {/* Active prompt input line */}
            {step !== 'FINISHED' && (
              <div className="flex items-center gap-2 pt-1 text-slate-100">
                <span className="text-emerald-400 font-bold">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    step === 'WAITING_OP'
                      ? 'Digite 1, 2, 3 ou 4 e tecle Enter...'
                      : step === 'WAITING_NUM1'
                      ? 'Digite o 1º número e tecle Enter...'
                      : 'Digite o 2º número e tecle Enter...'
                  }
                  autoFocus
                  className="bg-transparent border-none outline-none flex-1 text-slate-100 placeholder:text-slate-600 font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleUserInput(currentInput)}
                  className="px-2 py-0.5 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 flex items-center gap-1 font-sans"
                >
                  <CornerDownLeft className="w-3 h-3 text-sky-400" />
                  <span>Enter</span>
                </button>
              </div>
            )}

            {step === 'FINISHED' && (
              <div className="pt-3">
                <button
                  onClick={restart}
                  className="px-3 py-1.5 text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded flex items-center gap-1.5 font-sans transition-colors"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Executar Novamente</span>
                </button>
              </div>
            )}

            <div ref={terminalBottomRef} />
          </div>
        </div>

        {/* Python Internal State / Brain Inspector (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-sky-400 font-mono flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-400" />
              <span>O que o Python fez agora?</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              {pythonThought}
            </p>
          </div>

          {/* Variables in Memory */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Variáveis na Memória RAM
            </h4>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 bg-slate-950/60 rounded border border-slate-800">
                <span className="text-amber-400">operacao:</span>
                <span className="text-slate-200">
                  {opValue ? (
                    <span className="text-emerald-300">'{opValue}' (str)</span>
                  ) : (
                    <span className="text-slate-600">Ainda não definida</span>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 bg-slate-950/60 rounded border border-slate-800">
                <span className="text-amber-400">num1:</span>
                <span className="text-slate-200">
                  {num1Value !== null ? (
                    <span className="text-purple-300">{num1Value} (float)</span>
                  ) : (
                    <span className="text-slate-600">Ainda não definida</span>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 bg-slate-950/60 rounded border border-slate-800">
                <span className="text-amber-400">num2:</span>
                <span className="text-slate-200">
                  {num2Value !== null ? (
                    <span className="text-purple-300">{num2Value} (float)</span>
                  ) : (
                    <span className="text-slate-600">Ainda não definida</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Quick learning tip */}
          <div className="p-3.5 bg-sky-950/20 border border-sky-900/30 rounded-xl text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-sky-400 font-semibold text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Por que o terminal pausa?</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              O comando <code className="text-sky-300 font-mono">input()</code> é chamado de "bloqueante": ele literalmente suspende a execução do computador até que o ser humano digite algo e dê Enter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
