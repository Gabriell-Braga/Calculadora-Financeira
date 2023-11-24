function adicionarPeriodo() {
    var tabelaVPL = document.getElementById('tabelaVPL').getElementsByTagName('tbody')[0];
    var novoPeriodo = tabelaVPL.rows.length;
    var linha = tabelaVPL.insertRow();
    var celulaPeriodo = linha.insertCell(0);
    var celulaFluxoCaixa = linha.insertCell(1);

    celulaPeriodo.innerHTML = novoPeriodo;
    celulaFluxoCaixa.innerHTML = `<input type="number" id="fluxo_${novoPeriodo}" placeholder="Fluxo de Caixa para o período ${novoPeriodo}">`;

    var celulaAcao = linha.insertCell(2);
    celulaAcao.innerHTML = `<button class="remove" onclick="removerLinha(this)">Remover</button>`;
}

function removerLinha(botao) {
    var linha = botao.parentNode.parentNode;
    linha.parentNode.removeChild(linha);
    atualizarNumeracao();
}

function atualizarNumeracao() {
    var tabelaVPL = document.getElementById('tabelaVPL').getElementsByTagName('tbody')[0];
    for (var i = 0; i < tabelaVPL.rows.length; i++) {
        tabelaVPL.rows[i].cells[0].innerText = i;
        tabelaVPL.rows[i].cells[1].getElementsByTagName('input')[0].placeholder = "Fluxo de Caixa para o período "+i; // Atualiza o número do período
    }
}

function calcularVPL(fluxos, taxa) {
    return fluxos.reduce((acc, val, i) => acc + (val / Math.pow(1 + taxa, i)), 0);
}

function calcularTIR(fluxos, taxaInicial = 0.1, epsilon = 0.0001, maxIter = 1000) {
    let taxa = taxaInicial;
    let iter = 0;
    let vpl = calcularVPL(fluxos, taxa);

    while (Math.abs(vpl) > epsilon && iter < maxIter) {
        let vplDerivada = fluxos.reduce((acc, val, i) => {
            if (i === 0) return acc;
            return acc - (i * val / Math.pow(1 + taxa, i + 1));
        }, 0);

        let novaTaxa = taxa - vpl / vplDerivada;

        if (Math.abs(novaTaxa - taxa) < epsilon) {
            break;
        }

        taxa = novaTaxa;
        vpl = calcularVPL(fluxos, taxa);
        iter++;
    }

    return iter < maxIter ? taxa : null; // Retorna null se não convergir
}

function calcularIR(fluxos, taxaDesconto) {
    if (fluxos.length === 0 || fluxos[0] >= 0) {
        throw new Error("Fluxos de caixa devem começar com um investimento inicial negativo.");
    }

    const vpl = calcularVPL(fluxos, taxaDesconto);
    const investimentoInicial = Math.abs(fluxos[0]); // O investimento inicial é o primeiro valor de fluxo de caixa e deve ser negativo.
    return vpl / investimentoInicial;
}

document.addEventListener('DOMContentLoaded', function() {

    window.calcularOperacao = function() {
        var tabelaVPL = document.getElementById('tabelaVPL').getElementsByTagName('tbody')[0];
        var custoCapital = parseFloat(document.getElementById('k').value);
        var vpl = 0;

        if (isNaN(custoCapital) || custoCapital <= 0) {
            alert('Por favor, insira um custo de capital válido (k ou i).');
            return;
        }

        // Calcula o VPL
        var fluxos = [];
        for (var i = 0; i < tabelaVPL.rows.length; i++) {
            var fluxoCaixa = parseFloat(document.getElementById('fluxo_' + i).value);
            if (!isNaN(fluxoCaixa)) {
                fluxos.push(fluxoCaixa);
                vpl += i === 0 ? fluxoCaixa : fluxoCaixa / Math.pow((1 + (custoCapital/100)), i);
            } else {
                alert('Por favor, insira um valor válido para o fluxo de caixa do período ' + i + '.');
                return;
            }
        }

        // Exibe o resultado do VPL
        document.getElementById('resultado').innerText = 'VPL: ' + vpl.toFixed(2);

        // Calcular e exibir TIR
        var tir = calcularTIR(fluxos);
        document.getElementById('resultadoTIR').innerText = 'TIR: ' + (tir*100).toFixed(2) + '%';

        var investimentoInicial = parseFloat(document.getElementById('fluxo_0').value);

        // Certifique-se de que o investimento inicial não é zero para evitar divisão por zero
        if (investimentoInicial === 0) {
            // Lidar com o caso de investimento inicial zero, talvez mostrando uma mensagem de erro
            document.getElementById('resultadoIR').innerText = 'Erro: Investimento inicial não pode ser zero.';
        } else {
            var ir = vpl / investimentoInicial;
            // Calcular e exibir IR
            document.getElementById('resultadoIR').innerText = 'IR: ' + (Math.abs(ir) * 100).toFixed(2) + '%';
        }
    }
});