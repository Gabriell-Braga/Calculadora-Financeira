document.addEventListener('DOMContentLoaded', function() {

    var toogleSwitch = document.getElementById('switch');
    var mensagemCapitalizacaoSimples = document.getElementById('mensagemCapitalizacaoSimples');
    var mensagemCapitalizacaoComposta = document.getElementById('mensagemCapitalizacaoComposta');

    toogleSwitch.addEventListener('change', function(event) {
        var check = event.target.checked;
        if(check){
            mensagemCapitalizacaoSimples.style.display = 'none';
            mensagemCapitalizacaoComposta.style.display = 'block'; 
        }else{
            mensagemCapitalizacaoSimples.style.display = 'block';
            mensagemCapitalizacaoComposta.style.display = 'none';
        }
    });


    var selectElement = document.getElementById('variavel');

    selectElement.addEventListener('change', function(event) {
        var valorSelecionado = event.target.value;
        var campos = document.querySelectorAll('#valor1, #valor2, #valor3');

        // Esconde todos os campos primeiro
        campos.forEach(function(campo) {
            campo.style.display = 'none';
            campo.placeholder = '';
            campo.value = '';
        });

        // Dependendo da seleção, mostra os campos e define os placeholders
        switch (valorSelecionado) {
            case 'montante':
                campos[0].style.display = '';
                campos[1].style.display = '';
                campos[2].style.display = '';
                campos[0].placeholder = 'Capital (VP)';
                campos[1].placeholder = 'Taxa de Juros (i)';
                campos[2].placeholder = 'Tempo (n)';
                break;
            case 'capital':
                campos[0].style.display = '';
                campos[1].style.display = '';
                campos[2].style.display = '';
                campos[0].placeholder = 'Montante (VF)';
                campos[1].placeholder = 'Taxa de Juros (i)';
                campos[2].placeholder = 'Tempo (n)';
                break;
            case 'taxa':
                campos[0].style.display = '';
                campos[1].style.display = '';
                campos[2].style.display = '';
                campos[0].placeholder = 'Capital (VP)';
                campos[1].placeholder = 'Montante (VF)';
                campos[2].placeholder = 'Tempo (n)';
                break;
            case 'tempo':
                campos[0].style.display = '';
                campos[1].style.display = '';
                campos[2].style.display = '';
                campos[0].placeholder = 'Capital (VP)';
                campos[1].placeholder = 'Montante (VF)';
                campos[2].placeholder = 'Taxa de Juros (i)';
                break;
            case 'juros':
                campos[0].style.display = '';
                campos[1].style.display = '';
                campos[2].style.display = '';
                campos[0].placeholder = 'Capital (VP)';
                campos[1].placeholder = 'Taxa de Juros (i)';
                campos[2].placeholder = 'Tempo (n)';
                break;
        }
    });

    function calcularOperacao() {
        var variavelSelecionada = document.getElementById('variavel').value;
        var valor1 = parseFloat(document.getElementById('valor1').value);
        var valor2 = parseFloat(document.getElementById('valor2').value);
        var valor3 = parseFloat(document.getElementById('valor3').value);
        var capitalizacaoComposta = document.querySelector('.switch input').checked;
        var resultado = 0;
    
        if (!valor1 || !valor2 || !valor3) {
        alert('Por favor, preencha todos os campos antes de calcular.');
        return;
        }
    
        // Realiza o cálculo com base na variável selecionada
        switch (variavelSelecionada) {
            case 'montante':
                if (capitalizacaoComposta) {
                // Fórmula de Montante para Capitalização Composta: M = C * (1 + i)^n
                resultado = valor1 * Math.pow((1 + valor2/100), valor3);
                } else {
                // Fórmula de Montante para Capitalização Simples: M = C + (C * i * n)
                resultado = valor1 * (1 + (valor2/100 * valor3));
                }
                break;
            case 'capital':
                if (capitalizacaoComposta) {
                // Fórmula do Capital para Capitalização Composta: C = VF / (1 + i)^n
                resultado = valor1 / Math.pow((1 + valor2/100), valor3);
                } else {
                // Fórmula do Capital para Capitalização Simples: C = VF / (1 + i * n)
                resultado = valor1 / (1 + (valor2/100 * valor3));
                }
                break;
            case 'taxa':
                if (capitalizacaoComposta) {
                    // Fórmula da Taxa de Juros para Capitalização Composta aproximada: i = (VF / VP)^(1/n) - 1
                    resultado = Math.pow((valor2 / valor1), (1 / valor3)) - 1;
                    resultado = resultado * 100; // Convertendo a taxa para porcentagem
                } else {
                    // Fórmula da Taxa de Juros para Capitalização Simples: i = (VF - VP) / (VP * n)
                    resultado = (valor2 - valor1) / (valor1 * valor3);
                    resultado = resultado * 100; // Convertendo a taxa para porcentagem
                }
                break;
            case 'tempo':
                if (capitalizacaoComposta) {
                    // Fórmula do Tempo para Capitalização Composta: n = log(VF/VP) / log(1+i)
                    if (valor2 <= 0) {
                        alert('A taxa de juros deve ser maior que 0 para calcular o tempo.');
                        return;
                    }
                    resultado = Math.log(valor2 / valor1) / Math.log(1 + valor3/100);
                } else {
                    // Fórmula do Tempo para Capitalização Simples: n = (VF/VP - 1) / i
                    if (valor3 <= 0) {
                        alert('A taxa de juros deve ser maior que 0 para calcular o tempo.');
                        return;
                    }
                    resultado = (valor2 / valor1 - 1) / (valor3/100);
                }
                break;
            case 'juros':
                if (capitalizacaoComposta) {
                    // Fórmula dos Juros para Capitalização Composta: J = VP * ((1 + i)^n - 1)
                    resultado = (valor1 * (Math.pow((1 + valor2/100), valor3) - 1));
                } else {
                    // Fórmula dos Juros para Capitalização Simples: J = VP * i * n
                    resultado = (valor1 * (valor2/100) * valor3);
                }
                break;
        }
    
        // Exibe o resultado
        document.getElementById('resultado').innerText = 'Resultado: ' + resultado.toFixed(2);
    }
  
  // Vincula a função ao evento de clique do botão
  document.querySelector('#calculadora button').addEventListener('click', calcularOperacao);  
});
