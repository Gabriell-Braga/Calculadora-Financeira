document.addEventListener('DOMContentLoaded', function() {

    var toogleSwitch = document.getElementById('switch');
    var mensagemCapitalizacaoSimples = document.getElementById('mensagemCapitalizacaoSimples');
    var mensagemCapitalizacaoComposta = document.getElementById('mensagemCapitalizacaoComposta');

    toogleSwitch.addEventListener('change', function(event) {
        var select1 = document.getElementById('variavel');
        var select2 = document.getElementById('variavel-composto');
        var check = event.target.checked;
        if(check){
            select1.style.display = 'none';
            select2.style.display = '';
            mensagemCapitalizacaoSimples.style.display = 'none';
            mensagemCapitalizacaoComposta.style.display = 'block'; 
        }else{
            select1.style.display = '';
            select2.style.display = 'none';
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
            case 'efetiva':
                campos[0].style.display = '';
                campos[1].style.display = '';
                campos[0].placeholder = 'Taxa de Juros Nominal (ic)';
                campos[1].placeholder = 'Tempo (n)';
                break;

            case 'nominal':
                campos[0].style.display = '';
                campos[1].style.display = '';
                campos[0].placeholder = 'Taxa de Juros Efetiva (i)';
                campos[1].placeholder = 'Tempo (n)';
                break;
        }
    });

    var selectComposto = document.getElementById('variavel-composto');

    selectComposto.addEventListener('change', function(event) {
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
            case 'nominal':
                campos[0].style.display = '';
                campos[0].placeholder = 'Taxa de Juros Efetiva (i)';
                campos[1].style.display = '';
                campos[1].placeholder = 'Número de Períodos de Capitalização (k)';
                break;

            case 'proporcional':
                campos[0].style.display = '';
                campos[0].placeholder = 'Taxa de Juros Nominal Anual (i)';
                campos[1].style.display = '';
                campos[1].placeholder = 'Número de Períodos de Capitalização (k)';
                break;

            case 'equivalente-m-M':
                campos[0].style.display = '';
                campos[0].placeholder = 'Taxa de Juros Nominal para Período (ik)';
                campos[1].style.display = '';
                campos[1].placeholder = 'Número de Períodos de Capitalização (k)';
                break;

            case 'equivalente-M-m':
                campos[0].style.display = '';
                campos[0].placeholder = 'Taxa de Juros Nominal para Período (ik)';
                campos[1].style.display = '';
                campos[1].placeholder = 'Número de Períodos de Capitalização (k)';
                break;
        }
    });
  
    function calcularTaxa() {
        var variavelSelecionada = document.getElementById('variavel').value;
        var variavelCompostoSelecionada = document.getElementById('variavel-composto').value;
        var valor1 = parseFloat(document.getElementById('valor1').value);
        var valor2 = parseFloat(document.getElementById('valor2').value);
        var valor3 = parseFloat(document.getElementById('valor3').value);
        var capitalizacaoComposta = document.querySelector('.switch input').checked;
        var resultado = 0;
    
        // Verifica se todos os campos necessários estão preenchidos
        if (!valor1) {
            alert('Por favor, preencha todos os campos necessários.');
            return;
        }
    
        // Realiza o cálculo de taxa com base no tipo de capitalização
        if (!capitalizacaoComposta) {
            switch (variavelSelecionada) {
                case 'efetiva':
                    resultado = (valor1/100)/(1-(valor1/100)*valor2)*100;
                    break;

                case 'nominal':
                    resultado = (valor1/100)/(1+(valor1/100)*valor2)*100;
                    break;
            }
        } else{
            switch (variavelCompostoSelecionada) {
                case 'nominal':
                    // Taxa nominal a partir da taxa efetiva e número de períodos de capitalização
                    resultado = (valor1/100) * valor2;
                    resultado = resultado * 100; // Convertendo a taxa para porcentagem
                    break;
        
                case 'proporcional':
                    // Taxa proporcional a partir da taxa efetiva
                    resultado = (valor1 / 100)/valor2;
                    resultado = resultado * 100; // Convertendo a taxa para porcentagem
                    break;
        
                case 'equivalente-m-M':
                    // Taxa equivalente a partir da taxa nominal e número de períodos de capitalização
                    resultado = Math.pow(1 + (valor1 / 100), valor2) - 1;
                    resultado = resultado * 100; // Convertendo a taxa para porcentagem
                    break;

                case 'equivalente-M-m':
                    // Taxa equivalente a partir da taxa nominal e número de períodos de capitalização
                    resultado = Math.pow(1 + (valor1 / 100), 1/valor2) - 1;
                    resultado = resultado * 100; // Convertendo a taxa para porcentagem
                    break;
            }
        }
    
        // Exibe o resultado
        document.getElementById('resultado').innerText = 'Taxa: ' + resultado.toFixed(2) + '%';
    }
  
    // Vincula a função ao evento de clique do botão
    document.querySelector('#calculadora button').addEventListener('click', calcularTaxa);  
  });
  