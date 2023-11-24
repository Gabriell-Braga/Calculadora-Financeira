document.addEventListener('DOMContentLoaded', function() {
  var selectElement = document.getElementById('variavel');
  var campos = document.querySelectorAll('#valor1, #valor2, #valor3, #valor4');

  selectElement.addEventListener('change', function(event) {
      var valorSelecionado = event.target.value;
      
      // Esconde todos os campos primeiro
      campos.forEach(function(campo) {
          campo.style.display = 'none';
          campo.value = '';
      });

      // Dependendo da seleção, mostra os campos e define os placeholders
      switch (valorSelecionado) {
          case 'amortizacao':
            campos[0].style.display = 'block';
            campos[0].placeholder = 'Valor Presente (VP)';
            campos[1].style.display = 'block';
            campos[1].placeholder = 'Tempo (n)';
            break;
          case 'juros':
            campos[0].style.display = 'block';
            campos[0].placeholder = 'Valor Presente (VP)';
            campos[1].style.display = 'block';
            campos[1].placeholder = 'Taxa de Juros (i)';
            campos[2].style.display = 'block';
            campos[2].placeholder = 'Tempo (n)';
            campos[3].style.display = 'block';
            campos[3].placeholder = 'Período Atual (t)';
            break;
          case 'saldo_devedor':
            campos[0].style.display = 'block';
            campos[0].placeholder = 'Valor Presente (VP)';
            campos[1].style.display = 'block';
            campos[1].placeholder = 'Tempo (n)';
            campos[2].style.display = 'block';
            campos[2].placeholder = 'Período Atual (t)';
            break;
          case 'pmt':
            campos[0].style.display = 'block';
            campos[0].placeholder = 'Valor Presente (VP)';
            campos[1].style.display = 'block';
            campos[1].placeholder = 'Taxa de Juros (i)';
            campos[2].style.display = 'block';
            campos[2].placeholder = 'Tempo (n)';
            campos[3].style.display = 'block';
            campos[3].placeholder = 'Período Atual (t)';
            break;
      }
  });

  window.calcularOperacao = function() {
    var variavelSelecionada = document.getElementById('variavel').value;
    var valor1 = parseFloat(document.getElementById('valor1').value); // VP
    var valor2 = parseFloat(document.getElementById('valor2').value); // i
    var valor3 = parseFloat(document.getElementById('valor3').value); // n
    var valor4 = parseFloat(document.getElementById('valor4').value); // t

    var resultado;

    // Realiza o cálculo com base na variável selecionada
    switch (variavelSelecionada) {
        case 'amortizacao':
            if (!valor1 || !valor2) {
              alert('Por favor, preencha todos os campos corretamente antes de calcular.');
              return;
            }
            resultado = valor1/valor2;
            break;
        case 'juros':
            if (!valor1 || !valor2 || !valor3 || isNaN(valor4) || valor4 < 1 || valor4 > valor3) {
              alert('Por favor, preencha todos os campos corretamente antes de calcular.');
              return;
            }
            var amortizacao = valor1 / valor3;
            resultado = amortizacao * (valor3 - valor4 + 1) * (valor2 / 100);
            break;
        case 'saldo_devedor':
            if (!valor1 || !valor2 || !valor3) {
              alert('Por favor, preencha todos os campos corretamente antes de calcular.');
              return;
            }
            var amortizacao = valor1 / valor2;
            resultado = valor1 - (amortizacao * valor3);
            break;
        case 'pmt':
            if (!valor1 || !valor2 || !valor3 || isNaN(valor4) || valor4 < 1 || valor4 > valor3) {
              alert('Por favor, preencha todos os campos corretamente antes de calcular.');
              return;
            }
            var amortizacao = valor1 / valor3;
            resultado = amortizacao * (1 + (valor3 - valor4 + 1) * (valor2 / 100));
            break;
    }
  
    // Exibe o resultado
    document.getElementById('resultado').innerText = 'Resultado: ' + resultado.toFixed(2);
};
});
