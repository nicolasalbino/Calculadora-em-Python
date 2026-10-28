import React from 'react';
import { COMPONENT_GUIDES } from '../data/calculatorCode';
import {
  BookOpen,
  Terminal,
  CheckCircle2,
  Code,
  Layers,
  HelpCircle,
  Laptop,
} from 'lucide-react';

export const ComponentExplainer: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
        <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
          <BookOpen className="w-4 h-4" />
          <span>Guia Completo dos Componentes da Calculadora</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Para quem está começando a programar em Python, esta calculadora é o projeto clássico ideal porque reúne os 5 pilares fundamentais da programação: <strong>entrada</strong>, <strong>conversão de tipos</strong>, <strong>aritmética</strong>, <strong>decisão lógica</strong> e <strong>saída formatada</strong>. Abaixo está a explicação detalhada de cada bloco.
        </p>
      </div>

      {/* Grid of Component Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COMPONENT_GUIDES.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-slate-900/60 border border-slate-800/90 rounded-xl hover:border-slate-700 transition-colors space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <span className="font-mono text-xs font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
                  {item.symbol}
                </span>
                <span className="text-[11px] text-slate-500">Componente 0{idx + 1}</span>
              </div>

              <h4 className="text-sm font-bold text-slate-100 mt-2.5">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                {item.subtitle}
              </p>

              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                {item.role}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/60">
              <div className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">
                Exemplo prático:
              </div>
              <pre className="text-[11px] font-mono bg-slate-950 p-2 rounded text-emerald-300 overflow-x-auto whitespace-pre">
                {item.example}
              </pre>
              <div className="text-[11px] text-slate-400 leading-relaxed italic">
                💡 <span className="font-medium text-slate-300">Por que é importante:</span> {item.whyCare}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed comparison: String vs Float */}
      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>A Diferença Crucial: Texto (String) vs Número (Float)</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          O maior tropeço de todo iniciante é tentar somar valores logo após o <code className="text-sky-300 font-mono">input()</code>. Veja a diferença no exemplo abaixo:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-xl space-y-2">
            <span className="text-rose-400 font-bold text-xs uppercase tracking-wider">
              ❌ Sem converter (Comportamento de Texto):
            </span>
            <div className="bg-slate-950 p-3 rounded text-slate-200 space-y-1">
              <div>a = input("Digite: ")  # Digita 5</div>
              <div>b = input("Digite: ")  # Digita 3</div>
              <div className="text-rose-300 font-bold pt-1">
                resultado = a + b  # Retorna "53" !
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              O sinal de <code className="font-mono text-rose-300">+</code> com dois textos junta as palavras (concatenação), gerando "53" em vez de 8.
            </p>
          </div>

          <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-xl space-y-2">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
              ✅ Convertendo com float() (Comportamento Matemático):
            </span>
            <div className="bg-slate-950 p-3 rounded text-slate-200 space-y-1">
              <div>a = float(input("Digite: "))  # 5.0</div>
              <div>b = float(input("Digite: "))  # 3.0</div>
              <div className="text-emerald-300 font-bold pt-1">
                resultado = a + b  # Retorna 8.0 !
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              A função <code className="font-mono text-emerald-300">float()</code> avisa o Python que são números decimais, realizando a soma correta.
            </p>
          </div>
        </div>
      </div>

      {/* Step by step guide to run the code locally */}
      <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Laptop className="w-4 h-4 text-emerald-400" />
          <span>Passo a Passo: Como Rodar no Seu Computador</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-900/70 border border-slate-800/80 rounded-lg space-y-2">
            <div className="font-bold text-slate-200 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[11px] font-mono">
                1
              </span>
              <span>Instalar o Python</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Acesse <strong>python.org</strong> e baixe a versão mais recente. No instalador para Windows, marque obrigatoriamente a caixinha <strong>"Add Python to PATH"</strong>.
            </p>
          </div>

          <div className="p-4 bg-slate-900/70 border border-slate-800/80 rounded-lg space-y-2">
            <div className="font-bold text-slate-200 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[11px] font-mono">
                2
              </span>
              <span>Criar o Arquivo</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Abra um editor de texto (como o <strong>VS Code</strong> ou até o Bloco de Notas) e salve um novo arquivo com o nome <strong>calculadora.py</strong>. Cole o código fornecido.
            </p>
          </div>

          <div className="p-4 bg-slate-900/70 border border-slate-800/80 rounded-lg space-y-2">
            <div className="font-bold text-slate-200 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[11px] font-mono">
                3
              </span>
              <span>Executar no Terminal</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Abra o terminal (Prompt de Comando ou PowerShell), navegue até a pasta do arquivo e digite:
            </p>
            <div className="bg-slate-950 p-1.5 rounded font-mono text-emerald-400 text-[11px] border border-slate-800">
              python calculadora.py
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
