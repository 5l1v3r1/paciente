var jsonfile = require('jsonfile');
var dados = require('./dados-validos-sem-conflito');

String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

// var cidades = [ {value: 'Campina Grande', data:'Campina Grande'},
//                 {value: 'João Pessoa', data:'Joao Pessoa'},
//                 {value: 'Malta', data:'Malta'} ]

var cidades = [];
var dadosSemConflito = [];

dados.forEach(function(estabelecimento) {
  var found = false;
  for (var i = 0; i < cidades.length; i++) {
    if (estabelecimento['MUNICIPIO'] === cidades[i]) {
      found = true;
      break;
    }
  }
  if (!found) {
    cidades.push(estabelecimento['MUNICIPIO']);
    dadosSemConflito.push({value: estabelecimento['MUNICIPIO'].toLowerCase().capitalize(), data: estabelecimento['MUNICIPIO'].toLowerCase().capitalize()});
  }
});

jsonfile.writeFile('cidades.json', dadosSemConflito, function (err) {
  console.error(err);
});
