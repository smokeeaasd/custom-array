/**
 * A classe CustomArray simula o comportamento básico de um array em JavaScript,
 * permitindo adicionar, remover e manipular elementos de forma manual.
 * Nenhum método de array nativo é utilizado, e o gerenciamento do array é feito
 * através de um índice interno que controla o número de elementos.
 */
class CustomArray {
  constructor() {
    // Armazena os elementos
    this.data = [];
    // Mantém o controle do número de elementos
    this.index = 0;
  }

  /**
   * Adiciona um ou mais elementos ao final do array.
   * Os elementos são inseridos a partir da posição atual do índice.
   * O índice é incrementado conforme os elementos são adicionados.
   * Retorna o número total de elementos após a inserção.
   */
  push(...elements) {
    for (const element of elements) {
      this.data[this.index] = element; // Adiciona o elemento no índice atual
      this.index++; // Incrementa o índice
    }
    return this.index; // Retorna o número total de elementos
  }

  /**
   * Remove o último elemento do array.
   * O último índice válido é identificado e o elemento correspondente
   * é removido. O índice é decrementado para refletir a remoção.
   * Retorna o elemento removido, ou undefined se o array estiver vazio.
   */
  pop() {
    if (this.index === 0) return undefined; // Verifica se o array está vazio

    const lastIndex = this.index - 1; // Identifica o último índice válido
    const removedElement = this.data[lastIndex]; // Armazena o elemento a ser removido
    delete this.data[lastIndex]; // Remove o elemento
    this.index--; // Decrementa o índice
    return removedElement; // Retorna o elemento removido
  }

  /**
   * Remove o primeiro elemento do array.
   * Todos os elementos subsequentes são movidos uma posição para a esquerda.
   * O índice é decrementado para refletir a remoção.
   * Retorna o primeiro elemento removido, ou undefined se o array estiver vazio.
   */
  shift() {
    if (this.index === 0) return undefined; // Verifica se o array está vazio

    const firstElement = this.data[0]; // Armazena o primeiro elemento
    // Move todos os elementos subsequentes uma posição para a esquerda
    for (let i = 1; i < this.index; i++) {
      this.data[i - 1] = this.data[i];
    }
    delete this.data[this.index - 1]; // Remove o último elemento deslocado
    this.index--; // Decrementa o índice
    return firstElement; // Retorna o primeiro elemento removido
  }

  /**
   * Adiciona um ou mais elementos no início do array.
   * Todos os elementos existentes são deslocados para a direita para
   * dar espaço aos novos elementos. O índice é incrementado com base no
   * número de elementos inseridos.
   * Retorna o número total de elementos após a inserção.
   */
  unshift(...elements) {
    const numNewElements = elements.length;

    // Move os elementos existentes para a direita
    for (let i = this.index - 1; i >= 0; i--) {
      this.data[i + numNewElements] = this.data[i];
    }

    // Insere os novos elementos no início
    for (const element of elements) {
      this.data[numNewElements - 1] = element; // Adiciona o novo elemento
    }

    this.index += numNewElements; // Atualiza o número de elementos
    return this.index; // Retorna o número total de elementos
  }

  /**
   * Verifica se o array contém um determinado valor.
   * Itera sobre os elementos do array até encontrar o valor procurado.
   * Retorna true se o valor for encontrado, ou false caso contrário.
   */
  includes(value) {
    for (let i = 0; i < this.index; i++) {
      if (this.data[i] === value) {
        return true;
      }
    }
    return false;
  }

  /**
   * Retorna o primeiro elemento que satisfaz a condição fornecida pela função callback.
   * Itera sobre os elementos do array e aplica a função callback em cada elemento.
   * Se a condição for satisfeita, retorna o elemento correspondente. Caso contrário,
   * retorna undefined.
   */
  find(callback) {
    for (let i = 0; i < this.index; i++) {
      if (callback(this.data[i])) {
        return this.data[i];
      }
    }
    return undefined;
  }

  /**
   * Itera sobre cada elemento do array e executa uma função callback em cada um deles.
   * A função callback recebe o valor do elemento, seu índice e o próprio array como parâmetros.
   */
  forEach(callback) {
    for (let i = 0; i < this.index; i++) {
      callback(this.data[i], i, this);
    }
  }

  /**
   * Ordena os elementos do array utilizando uma função de comparação fornecida.
   * A função callback deve retornar um número negativo, zero ou positivo
   * dependendo da comparação entre os elementos.
   */
  sort(callback) {
    for (let i = 0; i < this.index - 1; i++) {
      for (let j = 0; j < this.index - i - 1; j++) {
        if (callback(this.data[j], this.data[j + 1]) > 0) {
          // Troca os elementos
          const temp = this.data[j];
          this.data[j] = this.data[j + 1];
          this.data[j + 1] = temp;
        }
      }
    }
  }

  /**
   * Retorna uma representação do array como uma string.
   * Os elementos são separados por vírgulas.
   */
  toString() {
    let result = '';
    for (let i = 0; i < this.index; i++) {
      result += this.data[i];
      if (i < this.index - 1) result += ', '; // Adiciona vírgula entre os elementos
    }
    return result;
  }
}

// Testando a classe CustomArray
const arr = new CustomArray();
arr.push(1, 2, 3);
arr.unshift(0);
console.log(arr.data); // [0, 1, 2, 3]
console.log(arr.pop()); // 3
console.log(arr.shift()); // 0
console.log(arr.includes(2)); // true
arr.forEach((el) => console.log(el)); // 1, 2

// Exemplo de uso do método sort
arr.push(4, 5, 6);
console.log("Antes da ordenação:", arr.toString()); // Antes da ordenação: 1, 2, 4, 5, 6
arr.sort((a, b) => a - b);
console.log("Depois da ordenação:", arr.toString()); // Depois da ordenação: 1, 2, 4, 5, 6
