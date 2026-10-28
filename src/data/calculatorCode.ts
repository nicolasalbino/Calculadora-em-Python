export interface CodeSnippet {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  pythonCode: string;
  filename: string;
}

export interface CodeBlockAnnotation {
  id: string;
  title: string;
  lines: number[];
  tag: string;
  summary: string;
  explanation: string;
  commonMistake: string;
  tip: string;
}

export const BASIC_CALCULATOR_CODE = `# ==========================================
# CALCULADORA SIMPLES EM PYTHON
# Operações: Adição, Subtração, Multiplicação e Divisão
# ==========================================

# 1. Mensagem de boas-vindas e exibição do menu
print("==============================")
print("     CALCULADORA EM PYTHON    ")
print("==============================")
print("1 - Adição (+)")
print("2 - Subtração (-)")
print("3 - Multiplicação (*)")
print("4 - Divisão (/)")
print("==============================")

# 2. Captura da opção do usuário
operacao = input("Digite o número da operação desejada (1/2/3/4): ")

# 3. Verificação de opção válida antes de pedir os números
if operacao in ['1', '2', '3', '4']:
    # 4. Entrada dos dois números (convertidos com float)
    num1 = float(input("Digite o primeiro número: "))
    num2 = float(input("Digite o segundo número: "))

    # 5. Estrutura condicional para executar a conta
    if operacao == '1':
        resultado = num1 + num2
        print(f"\\nResultado: {num1} + {num2} = {resultado}")

    elif operacao == '2':
        resultado = num1 - num2
        print(f"\\nResultado: {num1} - {num2} = {resultado}")

    elif operacao == '3':
        resultado = num1 * num2
        print(f"\\nResultado: {num1} * {num2} = {resultado}")

    elif operacao == '4':
        # 6. Proteção especial contra divisão por zero!
        if num2 != 0:
            resultado = num1 / num2
            print(f"\\nResultado: {num1} / {num2} = {resultado}")
        else:
            print("\\nErro matemático: Não é possível dividir por zero!")

else:
    # 7. Caso o usuário tenha digitado algo fora de 1, 2, 3 ou 4
    print("\\nOpção inválida! Escolha um número de 1 a 4.")
`;

export const FUNCTIONS_CALCULATOR_CODE = `# ==========================================
# CALCULADORA MODULAR (USANDO FUNÇÕES def)
# Ótima para aprender organização de código
# ==========================================

def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a diferença entre dois números."""
    return a - b

def multiplicar(a, b):
    """Retorna o produto de dois números."""
    return a * b

def dividir(a, b):
    """Retorna a divisão ou uma mensagem de erro se b for zero."""
    if b == 0:
        return "Erro: Divisão por zero não é permitida!"
    return a / b

# Início do programa principal
print("=== CALCULADORA COM FUNÇÕES ===")
print("Operações: 1=Soma | 2=Subtração | 3=Multiplicação | 4=Divisão")

opcao = input("Escolha a operação (1-4): ")

if opcao in ['1', '2', '3', '4']:
    n1 = float(input("Primeiro valor: "))
    n2 = float(input("Segundo valor: "))

    if opcao == '1':
        print(f"Resultado: {n1} + {n2} = {somar(n1, n2)}")
    elif opcao == '2':
        print(f"Resultado: {n1} - {n2} = {subtrair(n1, n2)}")
    elif opcao == '3':
        print(f"Resultado: {n1} * {n2} = {multiplicar(n1, n2)}")
    elif opcao == '4':
        res = dividir(n1, n2)
        print(f"Resultado: {res}")
else:
    print("Opção inválida.")
`;

export const LOOP_CALCULATOR_CODE = `# ==========================================
# CALCULADORA COMPLETA COM LAÇO WHILE
# O programa continua rodando até você escolher sair (0)
# ==========================================

while True:
    print("\\n" + "="*30)
    print("     CALCULADORA INTERATIVA   ")
    print("="*30)
    print("1: Somar (+)")
    print("2: Subtrair (-)")
    print("3: Multiplicar (*)")
    print("4: Dividir (/)")
    print("0: Sair do programa")
    print("="*30)

    opcao = input("Escolha uma opção: ").strip()

    if opcao == '0':
        print("Encerrando a calculadora. Bons estudos!")
        break  # Interrompe o laço while

    if opcao not in ['1', '2', '3', '4']:
        print("Opção inválida! Tente novamente.")
        continue  # Volta para o início do laço

    # Tratamento de erro caso o usuário digite texto onde deveria ser número
    try:
        n1 = float(input("Digite o 1º número: "))
        n2 = float(input("Digite o 2º número: "))
    except ValueError:
        print("Erro: Por favor, digite apenas números válidos (use ponto para decimais).")
        continue

    if opcao == '1':
        print(f"-> {n1} + {n2} = {n1 + n2}")
    elif opcao == '2':
        print(f"-> {n1} - {n2} = {n1 - n2}")
    elif opcao == '3':
        print(f"-> {n1} * {n2} = {n1 * n2}")
    elif opcao == '4':
        if n2 != 0:
            print(f"-> {n1} / {n2} = {n1 / n2}")
        else:
            print("-> Erro: Impossível dividir por zero!")
`;

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'basic',
    title: 'Versão Essencial',
    subtitle: 'Recomendada para quem está começando hoje',
    badge: 'Iniciante',
    description: 'Código sequencial simples com print, input, float e if/elif/else. Fácil de memorizar e entender.',
    pythonCode: BASIC_CALCULATOR_CODE,
    filename: 'calculadora_simples.py',
  },
  {
    id: 'functions',
    title: 'Versão com Funções (def)',
    subtitle: 'Aprenda a modularizar e reaproveitar código',
    badge: 'Intermediário',
    description: 'Separa cada cálculo em sua própria função Python (def). Mostra boas práticas de organização.',
    pythonCode: FUNCTIONS_CALCULATOR_CODE,
    filename: 'calculadora_funcoes.py',
  },
  {
    id: 'loop',
    title: 'Versão com Laço (while True)',
    subtitle: 'Programa interativo contínuo com try/except',
    badge: 'Avançado',
    description: 'Calculadora que nunca fecha sozinha, permite fazer várias contas seguidas e trata erros de digitação.',
    pythonCode: LOOP_CALCULATOR_CODE,
    filename: 'calculadora_completa.py',
  },
];

export const BASIC_ANNOTATIONS: CodeBlockAnnotation[] = [
  {
    id: 'menu',
    title: 'Exibição do Menu na Tela',
    lines: [7, 8, 9, 10, 11, 12, 13, 14],
    tag: 'Saída de Dados',
    summary: 'A função print() mostra textos e informações no terminal.',
    explanation: 'Em Python, o comando print(...) serve para exibir dados para o usuário. Aqui criamos um menu amigável listando as quatro operações para que a pessoa saiba quais teclas apertar.',
    commonMistake: 'Esquecer de colocar o texto entre aspas ("texto" ou \'texto\'). Sem aspas, o Python pensa que se trata de uma variável.',
    tip: 'Você pode usar aspas simples (\' \') ou duplas (" "), ambas funcionam igualmente.',
  },
  {
    id: 'input_operacao',
    title: 'Captura da Escolha do Usuário',
    lines: [16, 17],
    tag: 'Entrada de Dados',
    summary: 'A função input() aguarda o usuário digitar algo e pressionar Enter.',
    explanation: 'A função input() pausa o programa, exibe a pergunta na tela e guarda o que foi digitado dentro da variável "operacao". Detalhe crucial: o input() SEMPRE devolve um texto (string/str)!',
    commonMistake: 'Achar que "1" em texto é igual ao número 1. Se você comparar `operacao == 1`, dará Falso, pois um é texto e o outro é número inteiro. Por isso comparamos com a string \'1\'.',
    tip: 'Mantenha a opção como texto para simplificar a validação inicial.',
  },
  {
    id: 'input_numeros',
    title: 'Conversão com float() e Entrada Numérica',
    lines: [21, 22, 23, 24],
    tag: 'Tipagem de Dados',
    summary: 'float(input(...)) transforma o texto digitado em um número com casas decimais.',
    explanation: 'Como o input() devolve texto, se o usuário digitasse 5 e 3, e fizéssemos "5" + "3", o resultado seria "53" (concatenação) em vez de 8! A função float() converte esse texto no tipo numérico float (ponto flutuante, que aceita decimais como 4.5).',
    commonMistake: 'Esquecer de fechar o segundo parêntese ao final de `float(input("..."))`. Preste atenção: são dois parênteses abertos, logo devem ser dois fechados.',
    tip: 'Prefira float() em vez de int() para que a calculadora consiga somar decimais (ex: 3.5 + 1.2).',
  },
  {
    id: 'condicionais',
    title: 'Estruturas Condicionais (if, elif, else)',
    lines: [26, 27, 28, 29, 30, 31, 32, 33, 34],
    tag: 'Fluxo de Decisão',
    summary: 'Decide qual cálculo matemático executar de acordo com a opção escolhida.',
    explanation: 'O comando "if" (se) testa uma condição. Se for verdadeira, executa o bloco indentado abaixo. O "elif" (senão se) testa uma alternativa caso a primeira seja falsa. Isso garante que apenas a conta escolhida seja calculada.',
    commonMistake: 'Esquecer os dois pontos (:) no final da linha do if/elif, ou usar apenas um sinal de igual (=) em vez de dois (==) para comparar.',
    tip: 'No Python, a indentação (espaço à esquerda de 4 espaços) é obrigatória para definir o que está dentro do if.',
  },
  {
    id: 'divisao_zero',
    title: 'Proteção contra Divisão por Zero',
    lines: [36, 37, 38, 39, 40, 41, 42],
    tag: 'Regra Matemática',
    summary: 'Impede o travamento do programa caso o segundo número seja 0.',
    explanation: 'Na matemática e na computação, dividir por zero é uma operação impossível. Se você tentar fazer `10 / 0` no Python, o programa trava imediatamente com um erro chamado `ZeroDivisionError`. Por isso, testamos `if num2 != 0` antes de fazer a barra de divisão.',
    commonMistake: 'Fazer `num1 / num2` direto sem verificar se `num2 == 0`. Em provas e entrevistas de código, sempre avaliam se você lembrou dessa validação!',
    tip: 'O operador != significa "diferente de". Portanto `num2 != 0` lê-se: "se num2 for diferente de zero".',
  },
  {
    id: 'f_strings',
    title: 'Formatação Moderna com f-strings',
    lines: [29, 33, 37, 40],
    tag: 'Formatação de Texto',
    summary: 'Permite inserir variáveis diretamente dentro do texto usando {chaves}.',
    explanation: 'A f-string é iniciada com a letra f antes das aspas: `f"Resultado: {resultado}"`. O Python substitui automaticamente o que está dentro das chaves pelo valor real da variável.',
    commonMistake: 'Esquecer a letra `f` antes da primeira aspas. Sem o `f`, ele vai imprimir literalmente a palavra `{resultado}` na tela!',
    tip: 'As f-strings foram criadas no Python 3.6 e são hoje o padrão oficial e mais rápido para escrever mensagens.',
  },
];

export interface ComponentGuide {
  title: string;
  symbol: string;
  subtitle: string;
  role: string;
  example: string;
  whyCare: string;
}

export const COMPONENT_GUIDES: ComponentGuide[] = [
  {
    title: 'Função input()',
    symbol: 'input()',
    subtitle: 'Ouvido do programa',
    role: 'Captura o que o usuário digita no teclado e retorna sempre como texto (str).',
    example: 'nome = input("Qual o seu nome? ")',
    whyCare: 'Sem o input, seu programa seria estático e só conseguiria calcular números pré-definidos no código.',
  },
  {
    title: 'Função float()',
    symbol: 'float()',
    subtitle: 'Conversor para números reais',
    role: 'Transforma uma string em número decimal de ponto flutuante.',
    example: 'preco = float("19.90")  # vira o número 19.9',
    whyCare: 'O computador não sabe fazer contas com letras ou textos. Se você não usar float(), o Python acusará erro ou juntará os textos lado a lado.',
  },
  {
    title: 'Estruturas if / elif / else',
    symbol: 'if / elif / else',
    subtitle: 'Cérebro de decisão',
    role: 'Permite ao computador escolher caminhos diferentes baseado em condições lógicas.',
    example: 'if op == "1": somar()\nelif op == "2": subtrair()\nelse: print("Inválido")',
    whyCare: 'É a essência da lógica de programação. Permite que o programa faça algo diferente dependendo do que o usuário digitou.',
  },
  {
    title: 'Os 4 Operadores Básicos',
    symbol: '+  -  *  /',
    subtitle: 'Matemática do Python',
    role: '+ (adição), - (subtração), * (multiplicação asterisco) e / (divisão barra).',
    example: '10 + 5 -> 15\n10 * 3 -> 30\n10 / 4 -> 2.5',
    whyCare: 'Ao contrário da escola onde usamos "×" ou "÷", na programação universal sempre usamos "*" para multiplicar e "/" para dividir.',
  },
  {
    title: 'Prevenção de Divisão por Zero',
    symbol: 'num2 != 0',
    subtitle: 'Segurança e robustez',
    role: 'Verifica se o denominador não é zero antes de aplicar a divisão.',
    example: 'if divisor != 0:\n    res = total / divisor\nelse:\n    print("Impossível!")',
    whyCare: 'Evita a falha catastrófica `ZeroDivisionError`, que derruba o programa imediatamente.',
  },
  {
    title: 'F-strings para Saída Elegante',
    symbol: 'f"..."',
    subtitle: 'Interpolação de strings',
    role: 'Insere valores de variáveis dentro de textos de forma limpa e legível.',
    example: 'print(f"O total é: {valor:.2f}")',
    whyCare: 'Muito mais legível do que fazer "O total é: " + str(valor), evitando conversões manuais repetitivas.',
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'O que acontece no Python se você fizer: "10" + "5" (com aspas)?',
    options: [
      'Retorna 15',
      'Retorna "105" (junta os dois textos)',
      'Dá um erro de sintaxe',
      'Retorna 50',
    ],
    correctIndex: 1,
    explanation: 'Exato! Quando os dados estão entre aspas, o Python os enxerga como textos (strings). O operador "+" entre dois textos junta (concatena) eles, gerando "105". Para somar matematicamente, precisamos converter com float() ou int()!',
  },
  {
    id: 2,
    question: 'Qual símbolo o Python utiliza para a operação de multiplicação?',
    options: [
      'O caractere "x" minúsculo',
      'O símbolo de ponto "."',
      'O asterisco "*"',
      'A palavra reservada "mult"',
    ],
    correctIndex: 2,
    explanation: 'Correto! Em quase todas as linguagens de programação, a multiplicação é feita pelo asterisco (*), pois a letra "x" pode ser o nome de uma variável.',
  },
  {
    id: 3,
    question: 'Por que usamos a condição `if num2 != 0` antes de fazer uma divisão?',
    options: [
      'Porque o Python não aceita números pares',
      'Para evitar o erro fatal ZeroDivisionError, pois na matemática não existe divisão por zero',
      'Apenas por estética visual',
      'Porque o resultado seria sempre negativo',
    ],
    correctIndex: 1,
    explanation: 'Muito bem! Dividir qualquer número por zero é matematicamente indefinido e causa o erro `ZeroDivisionError`, travando o programa. Sempre verificamos se o divisor é diferente de zero.',
  },
  {
    id: 4,
    question: 'Qual a diferença entre usar um sinal de igual (=) e dois sinais de igual (==)?',
    options: [
      'Não há diferença, são idênticos',
      'O "=" é para comparar e "==" é para atribuir',
      'O "=" atribui um valor à variável (guarda), e "==" compara se dois valores são iguais',
      'O "==" só serve para números inteiros',
    ],
    correctIndex: 2,
    explanation: 'Perfeito! `a = 5` diz: "guarde o valor 5 dentro de a". Já `a == 5` faz uma pergunta lógica: "o valor de a é igual a 5?". No comando `if operacao == "1"`, usamos `==` para testar a igualdade.',
  },
];
