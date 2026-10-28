import React, { useState } from 'react';
import {
  ShieldAlert,
  ArrowRight,
  Calculator,
  Equal,
} from 'lucide-react';

export const VisualExecution: React.FC = () => {
  const [num1, setNum1] = useState<number>(10);
  const [num2, setNum2] = useState<number>(2);
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('+');

  const isDivZero = op === '/' && num2 === 0;

  let result: number | null = null;
  if (!isDivZero) {
    if (op === '+') result = num1 + num2;
    if (op === '-') result = num1 - num2;
    if (op === '*') result = num1 * num2;
    if (op === '/') result = num1 / num2;
  }

  const opOptionCode = op === '+' ? '1' : op === '-' ? '2' : op === '*' ? '3' : '4';

  return (
    <div className="space-y-6">
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-sky-400" />
            <span>Simulador Visual de Lógica & Memória</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Mude os valores abaixo para ver em tempo real como as variáveis, tipos de dados e decisões `if/elif` reagem.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Controls (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-5">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
            1. Entradas do Usuário (Simulando input())
          </h4>

          {/* Num 1 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-mono text-slate-300">
                Primeiro número (<span className="text-amber-400 font-semibold">num1</span>):
              </label>
              <span className="font-mono text-sky-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 tabular-nums">
                {num1}
              </span>
            </div>
            <input
              type="number"
              step="any"
              value={num1}
              onChange={(e) => setNum1(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          {/* Operator Selector */}
          <div className="space-y-2">
            <label className="font-mono text-xs text-slate-300 block">
              Operação matemática (<span className="text-amber-400 font-semibold">operacao</span>):
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { symbol: '+', label: '1: Adição', icon: '+' },
                { symbol: '-', label: '2: Subtração', icon: '-' },
                { symbol: '*', label: '3: Multiplicação', icon: '*' },
                { symbol: '/', label: '4: Divisão', icon: '/' },
              ].map((item) => {
                const isSelected = op === item.symbol;
                return (
                  <button
                    key={item.symbol}
                    onClick={() => setOp(item.symbol as any)}
                    className={`py-2 px-1 text-center rounded-lg border text-xs font-mono transition-all ${
                      isSelected
                        ? 'bg-sky-500 text-slate-950 font-bold border-sky-400 shadow-md'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-base font-bold">{item.symbol}</div>
                    <div className="text-[10px] opacity-80 truncate">{item.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Num 2 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-mono text-slate-300">
                Segundo número (<span className="text-amber-400 font-semibold">num2</span>):
              </label>
              <span className="font-mono text-sky-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 tabular-nums">
                {num2}
              </span>
            </div>
            <input
              type="number"
              step="any"
              value={num2}
              onChange={(e) => setNum2(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-sky-500 transition-colors"
            />
            {op === '/' && (
              <div className="flex items-center gap-2 pt-1 text-[11px]">
                <span className="text-slate-500">Dica:</span>
                <button
                  onClick={() => setNum2(0)}
                  className="text-rose-400 hover:underline"
                >
                  Colocar 0 para testar a proteção
                </button>
                <span>·</span>
                <button
                  onClick={() => setNum2(2)}
                  className="text-emerald-400 hover:underline"
                >
                  Restaurar 2
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Behind-the-Scenes Memory & Logic Flow (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Transformation Step */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              2. Conversão de Tipos (String -&gt; Float)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Entrada Bruta de Texto
                </span>
                <div className="text-emerald-400">
                  input() = <span className="font-bold">"{num1}"</span> (str)
                </div>
                <div className="text-slate-500 text-[11px] pt-1">
                  Não aceita contas matemáticas
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-sky-900/40 space-y-1">
                <span className="text-[10px] text-sky-400 uppercase tracking-wider">
                  Após float(input())
                </span>
                <div className="text-sky-300">
                  num1 = <span className="font-bold">{num1.toFixed(1)}</span> (float)
                </div>
                <div className="text-slate-500 text-[11px] pt-1">
                  Número pronto para cálculos
                </div>
              </div>
            </div>
          </div>

          {/* Conditional Decision Tree */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              3. Árvore de Decisão Condicional (if / elif / else)
            </h4>

            <div className="space-y-1.5 font-mono text-xs">
              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  opOptionCode === '1'
                    ? 'bg-sky-950/60 border-sky-500 text-sky-200'
                    : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>if operacao == '1':  # Adição</span>
                  <span className="font-bold text-[11px]">
                    {opOptionCode === '1' ? 'VERDADEIRO (Executa!)' : 'FALSO'}
                  </span>
                </div>
                {opOptionCode === '1' && (
                  <div className="text-[11px] text-sky-300 mt-1 pl-4 border-l border-sky-500/50">
                    resultado = {num1} + {num2} = {result}
                  </div>
                )}
              </div>

              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  opOptionCode === '2'
                    ? 'bg-sky-950/60 border-sky-500 text-sky-200'
                    : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>elif operacao == '2':  # Subtração</span>
                  <span className="font-bold text-[11px]">
                    {opOptionCode === '2' ? 'VERDADEIRO (Executa!)' : 'FALSO'}
                  </span>
                </div>
                {opOptionCode === '2' && (
                  <div className="text-[11px] text-sky-300 mt-1 pl-4 border-l border-sky-500/50">
                    resultado = {num1} - {num2} = {result}
                  </div>
                )}
              </div>

              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  opOptionCode === '3'
                    ? 'bg-sky-950/60 border-sky-500 text-sky-200'
                    : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>elif operacao == '3':  # Multiplicação</span>
                  <span className="font-bold text-[11px]">
                    {opOptionCode === '3' ? 'VERDADEIRO (Executa!)' : 'FALSO'}
                  </span>
                </div>
                {opOptionCode === '3' && (
                  <div className="text-[11px] text-sky-300 mt-1 pl-4 border-l border-sky-500/50">
                    resultado = {num1} * {num2} = {result}
                  </div>
                )}
              </div>

              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  opOptionCode === '4'
                    ? 'bg-sky-950/60 border-sky-500 text-sky-200'
                    : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>elif operacao == '4':  # Divisão</span>
                  <span className="font-bold text-[11px]">
                    {opOptionCode === '4' ? 'VERDADEIRO (Executa!)' : 'FALSO'}
                  </span>
                </div>
                {opOptionCode === '4' && (
                  <div className="text-[11px] text-sky-300 mt-1 pl-4 border-l border-sky-500/50 space-y-1">
                    <div>if num2 != 0: ({num2} != 0 -&gt; {!isDivZero ? 'SIM' : 'NÃO'})</div>
                    {!isDivZero ? (
                      <div className="text-emerald-400 font-semibold">
                        resultado = {num1} / {num2} = {result}
                      </div>
                    ) : (
                      <div className="text-rose-400 font-semibold flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>else: Disparou aviso de divisão por zero!</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Final Output Result Box */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-900 rounded-lg text-sky-400 border border-slate-800">
                <Equal className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">
                  Saída final gerada na tela (print)
                </span>
                <div className="text-sm font-mono font-bold">
                  {isDivZero ? (
                    <span className="text-rose-400">
                      Erro matemático: Não é possível dividir por zero!
                    </span>
                  ) : (
                    <span className="text-emerald-400">
                      Resultado: {num1} {op} {num2} = {result}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-right text-[11px] text-slate-500 font-mono hidden sm:block">
              {isDivZero ? 'status: ERRO_ZERO' : 'status: OK_200'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
