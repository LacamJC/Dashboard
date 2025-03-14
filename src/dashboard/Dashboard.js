  // App.js - Versão adaptada para rodar localmente
  import React, { useState, useEffect } from 'react';
  import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
  import _ from 'lodash';

  const Dashboard = () => {
    const [data, setData] = useState(null);
    const [visaoAtual, setVisaoAtual] = useState('mensal');
    const [isLoading, setIsLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const CORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

    useEffect(() => {
      // Versão simplificada para rodar localmente
      try {
        setIsLoading(true);
        
        // Usar diretamente os dados de demonstração
        const dadosDemo = gerarDadosDemonstracao();
        
        console.log("Dados de demonstração carregados com sucesso");
        setData(dadosDemo);
        setIsLoading(false);
      } catch (erro) {
        console.error("Erro ao gerar dados:", erro);
        setErro("Ocorreu um erro ao processar os dados: " + erro.message);
        setIsLoading(false);
      }
    }, []);

    // Função para gerar dados de demonstração
    const gerarDadosDemonstracao = () => {
      // Gerar categorias e prioridades
      const categorias = ['Suporte', 'Dúvidas', 'Desenvolvimento', 'Projetos'];
      const prioridades = ['Baixa', 'Normal', 'Alta', 'Urgente'];
      const tipos = ['Externo', 'Interno'];
      
      // Gerar dados mensais
      const dataAtual = new Date();
      const dadosMensais = [];
      
      // Gerar dados desde janeiro de 2023 até o presente
      // Cálculo de quantos meses entre jan/2023 e o presente
      const mesInicial = 0; // Janeiro
      const anoInicial = 2023;
      const dataInicial = new Date(anoInicial, mesInicial, 1);
      
      // Diferença em meses
      const diffAnos = dataAtual.getFullYear() - dataInicial.getFullYear();
      const diffMeses = dataAtual.getMonth() - dataInicial.getMonth();
      const totalMeses = (diffAnos * 12) + diffMeses + 1; // +1 para incluir o mês atual
      
      for (let i = 0; i < totalMeses; i++) {
        const data = new Date(anoInicial, mesInicial + i, 1);
        const ano = data.getFullYear();
        const mes = data.getMonth() + 1;
        
        // Quantidade de chamados aleatória entre 10 e 60
        const quantidade = Math.floor(Math.random() * 50) + 10;
        
        // Distribuir por categoria
        const categoriasCount = {};
        let restante = quantidade;
        
        for (let j = 0; j < categorias.length - 1; j++) {
          const valor = Math.floor(Math.random() * restante * 0.7);
          categoriasCount[categorias[j]] = valor;
          restante -= valor;
        }
        categoriasCount[categorias[categorias.length - 1]] = restante;
        
        // Distribuir por prioridade
        const prioridadesCount = {};
        restante = quantidade;
        
        for (let j = 0; j < prioridades.length - 1; j++) {
          const valor = Math.floor(Math.random() * restante * 0.7);
          prioridadesCount[prioridades[j]] = valor;
          restante -= valor;
        }
        prioridadesCount[prioridades[prioridades.length - 1]] = restante;
        
        // Distribuir por tipo
        const tiposCount = {};
        const valorTipo1 = Math.floor(Math.random() * quantidade);
        tiposCount[tipos[0]] = valorTipo1;
        tiposCount[tipos[1]] = quantidade - valorTipo1;
        
        // Nomes dos meses em português
        const nomesMeses = [
          'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        
        // Formato de dois dígitos para ordenação consistente
        const mesPadronizado = mes.toString().padStart(2, '0');
        
        dadosMensais.push({
          periodo: `${ano}-${mesPadronizado}`,
          rotulo: `${nomesMeses[mes-1]}/${ano}`,
          quantidade: quantidade,
          categorias: categoriasCount,
          prioridades: prioridadesCount,
          tipos: tiposCount
        });
      }
      
      // Ordenar por período (mais antigo para mais recente)
      dadosMensais.sort((a, b) => a.periodo.localeCompare(b.periodo));
      
      // Gerar dados trimestrais
      const dadosTrimestrais = [];
      
      // Agrupar meses em trimestres
      const trimestres = _.groupBy(dadosMensais, item => {
        const [ano, mes] = item.periodo.split('-').map(Number);
        const trimestre = Math.ceil(mes / 3);
        return `${ano}-T${trimestre}`;
      });
      
      // Processar cada trimestre
      Object.entries(trimestres).forEach(([chave, itens]) => {
        const [ano, trimStr] = chave.split('-');
        const trimestre = parseInt(trimStr.slice(1));
        
        // Somar quantidades
        const quantidade = _.sumBy(itens, 'quantidade');
        
        // Agregar categorias
        const categoriasAgregadas = {};
        itens.forEach(item => {
          Object.entries(item.categorias).forEach(([cat, val]) => {
            categoriasAgregadas[cat] = (categoriasAgregadas[cat] || 0) + val;
          });
        });
        
        // Agregar prioridades
        const prioridadesAgregadas = {};
        itens.forEach(item => {
          Object.entries(item.prioridades).forEach(([pri, val]) => {
            prioridadesAgregadas[pri] = (prioridadesAgregadas[pri] || 0) + val;
          });
        });
        
        // Agregar tipos
        const tiposAgregados = {};
        itens.forEach(item => {
          Object.entries(item.tipos).forEach(([tipo, val]) => {
            tiposAgregados[tipo] = (tiposAgregados[tipo] || 0) + val;
          });
        });
        
        dadosTrimestrais.push({
          periodo: chave,
          rotulo: `${trimestre}º Trimestre/${ano}`,
          quantidade: quantidade,
          categorias: categoriasAgregadas,
          prioridades: prioridadesAgregadas,
          tipos: tiposAgregados
        });
      });
      
      // Ordenar por período
      dadosTrimestrais.sort((a, b) => a.periodo.localeCompare(b.periodo));
      
      // Gerar dados anuais
      const dadosAnuais = [];
      
      // Agrupar por ano
      const anos = _.groupBy(dadosMensais, item => item.periodo.split('-')[0]);
      
      // Processar cada ano
      Object.entries(anos).forEach(([ano, itens]) => {
        // Somar quantidades
        const quantidade = _.sumBy(itens, 'quantidade');
        
        // Agregar categorias
        const categoriasAgregadas = {};
        itens.forEach(item => {
          Object.entries(item.categorias).forEach(([cat, val]) => {
            categoriasAgregadas[cat] = (categoriasAgregadas[cat] || 0) + val;
          });
        });
        
        // Agregar prioridades
        const prioridadesAgregadas = {};
        itens.forEach(item => {
          Object.entries(item.prioridades).forEach(([pri, val]) => {
            prioridadesAgregadas[pri] = (prioridadesAgregadas[pri] || 0) + val;
          });
        });
        
        // Agregar tipos
        const tiposAgregados = {};
        itens.forEach(item => {
          Object.entries(item.tipos).forEach(([tipo, val]) => {
            tiposAgregados[tipo] = (tiposAgregados[tipo] || 0) + val;
          });
        });
        
        dadosAnuais.push({
          periodo: ano,
          rotulo: `Ano ${ano}`,
          quantidade: quantidade,
          categorias: categoriasAgregadas,
          prioridades: prioridadesAgregadas,
          tipos: tiposAgregados
        });
      });
      
      // Ordenar por período
      dadosAnuais.sort((a, b) => a.periodo.localeCompare(b.periodo));
      
      // Total de chamados
      const totalChamados = _.sumBy(dadosMensais, 'quantidade');
      
      // Dados para gráficos de pizza
      // Agregar todas as categorias
      const categoriasTotal = {};
      dadosMensais.forEach(item => {
        Object.entries(item.categorias).forEach(([cat, val]) => {
          categoriasTotal[cat] = (categoriasTotal[cat] || 0) + val;
        });
      });
      
      const dadosPizzaCategorias = Object.entries(categoriasTotal)
        .map(([name, value]) => ({ name, value }));
      
      // Agregar todas as prioridades
      const prioridadesTotal = {};
      dadosMensais.forEach(item => {
        Object.entries(item.prioridades).forEach(([pri, val]) => {
          prioridadesTotal[pri] = (prioridadesTotal[pri] || 0) + val;
        });
      });
      
      const dadosPizzaPrioridades = Object.entries(prioridadesTotal)
        .map(([name, value]) => ({ name, value }));
      
      // Agregar todos os tipos
      const tiposTotal = {};
      dadosMensais.forEach(item => {
        Object.entries(item.tipos).forEach(([tipo, val]) => {
          tiposTotal[tipo] = (tiposTotal[tipo] || 0) + val;
        });
      });
      
      const dadosPizzaTipos = Object.entries(tiposTotal)
        .map(([name, value]) => ({ name, value }));
      
      // Gerar dados comparativos entre criação e finalização
      const dadosComparativos = gerarDadosComparativos();
      
      return {
        mensal: dadosMensais,
        trimestral: dadosTrimestrais,
        anual: dadosAnuais,
        pizzaCategorias: dadosPizzaCategorias,
        pizzaPrioridades: dadosPizzaPrioridades,
        pizzaTipos: dadosPizzaTipos,
        totalChamados: totalChamados,
        comparativo: dadosComparativos
      };
    };

    // Função para gerar dados comparativos entre datas de criação, finalização e categoria
    const gerarDadosComparativos = () => {
      // Gerar tempo médio de resolução para cada categoria
      const categorias = ['Suporte', 'Dúvidas', 'Desenvolvimento', 'Projetos'];
      
      // Gerar tempos médios aleatórios (em dias) entre 1 e 14 dias
      return categorias.map(categoria => {
        const tempoBase = categoria === 'Suporte' ? 2 : 
                          categoria === 'Dúvidas' ? 1 : 
                          categoria === 'Desenvolvimento' ? 6 : 3;
        
        // Variação aleatória de ±30%
        const variacao = (Math.random() * 0.6) - 0.3;
        const tempoMedio = tempoBase * (1 + variacao);
        
        // Gerar dados médios para meses recentes
        const tendencia = Array(6).fill(0).map((_, i) => {
          // Variação mensal com tendência de melhoria (redução) ao longo do tempo
          const fatorMelhoria = 1 - (i * 0.03);
          const tempoMensal = tempoMedio * fatorMelhoria * (0.9 + Math.random() * 0.2);
          return {
            mes: i,
            tempo: tempoMensal
          };
        });
        
        return {
          categoria,
          tempoMedio,
          tempoMinimo: tempoMedio * 0.6,
          tempoMaximo: tempoMedio * 1.4,
          tendencia
        };
      });
    };

    // Manipulador de eventos para botões
    const alterarVisao = (novaVisao) => {
      console.log(`Alterando visão de ${visaoAtual} para ${novaVisao}`);
      setVisaoAtual(novaVisao);
    };

    const renderizarGraficoLinha = () => {
      if (!data || !data[visaoAtual] || data[visaoAtual].length === 0) {
        return <div className="p-4 text-center">Não há dados suficientes para exibir este gráfico.</div>;
      }

      const dadosVisao = data[visaoAtual];
      
      return (
        <div className="card mb-4 bg-success">
        <div className="card-body">
          <h5 className="card-title">Quantidade de Chamados Finalizados por Período</h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={dadosVisao}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rotulo" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="quantidade"
                stroke="#8884d8"
                name="Chamados Finalizados"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      );
    };

    const renderizarGraficoBarra = () => {
      if (!data || !data[visaoAtual] || data[visaoAtual].length === 0) {
        return <div className="p-4 text-center">Não há dados suficientes para exibir este gráfico.</div>;
      }

      // Garantir que os dados estão em ordem cronológica
      const dadosVisao = [...data[visaoAtual]].sort((a, b) => {
        // Extrair ano e mês/trimestre para ordenação
        const [anoA, periodoA] = a.periodo.split('-');
        const [anoB, periodoB] = b.periodo.split('-');
        
        // Primeiro ordenar por ano
        if (anoA !== anoB) return Number(anoA) - Number(anoB);
        
        // Se o ano for igual, ordenar por período (mês ou trimestre)
        // Tratar 'T1', 'T2', etc. para trimestres
        const periodoNumA = periodoA.startsWith('T') ? Number(periodoA.slice(1)) : Number(periodoA);
        const periodoNumB = periodoB.startsWith('T') ? Number(periodoB.slice(1)) : Number(periodoB);
        
        return periodoNumA - periodoNumB;
      });
      
      // Calcular o total por categoria para ordenação
      const totaisPorCategoria = {};
      dadosVisao.forEach(item => {
        Object.entries(item.categorias || {}).forEach(([cat, val]) => {
          totaisPorCategoria[cat] = (totaisPorCategoria[cat] || 0) + val;
        });
      });
      
      // Extrair categorias únicas e ordenar por volume (mais frequentes primeiro)
      const categoriasOrdenadas = Object.keys(totaisPorCategoria)
        .sort((a, b) => totaisPorCategoria[b] - totaisPorCategoria[a]);
      
      // Preparar dados para o gráfico
      const dadosGrafico = dadosVisao.map(item => {
        const novoItem = { 
          rotulo: item.rotulo,
          periodo: item.periodo // Adicionado para ordenação
        };
        
        categoriasOrdenadas.forEach(cat => {
          novoItem[cat] = (item.categorias && item.categorias[cat]) || 0;
        });
        
        return novoItem;
      });
      
      return (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="text-lg font-medium mb-4">Chamados Finalizados por Categoria</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={dadosGrafico}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rotulo" />
              <YAxis />
              <Tooltip />
              <Legend />
              {categoriasOrdenadas.map((categoria, index) => (
                <Bar 
                  key={categoria} 
                  dataKey={categoria} 
                  name={categoria}
                  fill={CORES[index % CORES.length]} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    };

    const renderizarGraficosPizza = () => {
      if (!data) return null;
      
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Gráfico de Pizza - Categorias */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-4">Distribuição por Categoria</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data.pizzaCategorias}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) => percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.pizzaCategorias.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Pizza - Prioridades */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-4">Distribuição por Prioridade</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data.pizzaPrioridades}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) => percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.pizzaPrioridades.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Pizza - Tipos */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-4">Distribuição por Tipo</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data.pizzaTipos}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) => percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.pizzaTipos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    };

    const renderizarKPIs = () => {
      if (!data) return null;
      
      // Calcular médias por período
      const mediaMensal = Math.round(
        data.mensal.reduce((sum, item) => sum + item.quantidade, 0) / Math.max(1, data.mensal.length)
      );
      
      const mediaTrimestral = Math.round(
        data.trimestral.reduce((sum, item) => sum + item.quantidade, 0) / Math.max(1, data.trimestral.length)
      );
      
      const mediaAnual = Math.round(
        data.anual.reduce((sum, item) => sum + item.quantidade, 0) / Math.max(1, data.anual.length)
      );
      
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Total de Chamados Finalizados</h3>
            <p className="text-2xl font-bold">{data.totalChamados}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Média Mensal de Finalização</h3>
            <p className="text-2xl font-bold">{mediaMensal}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Média Trimestral de Finalização</h3>
            <p className="text-2xl font-bold">{mediaTrimestral}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Média Anual de Finalização</h3>
            <p className="text-2xl font-bold">{mediaAnual}</p>
          </div>
        </div>
      );
    };

    const renderizarSecaoComparativa = () => {
      if (!data || !data.comparativo) return null;
      
      const dadosComparativos = data.comparativo;
      
      // Preparar dados para o gráfico de barras principal
      const dadosGrafico = dadosComparativos.map(item => ({
        categoria: item.categoria,
        tempoMedio: parseFloat(item.tempoMedio.toFixed(1)),
        tempoMinimo: parseFloat(item.tempoMinimo.toFixed(1)),
        tempoMaximo: parseFloat(item.tempoMaximo.toFixed(1))
      }));
      
      // Preparar dados para o gráfico de tendência
      const dadosTendencia = dadosComparativos.map(item => {
        const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
        return {
          categoria: item.categoria,
          tendencia: item.tendencia.map((t, idx) => ({
            mes: meses[idx],
            tempo: parseFloat(t.tempo.toFixed(1))
          }))
        };
      });
      
      return (
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h3 className="text-xl font-medium mb-4">Comparação: Criação, Finalização e Categoria</h3>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">Tempo Médio de Resolução por Categoria (em dias)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={dadosGrafico}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="categoria" />
                  <YAxis label={{ value: 'Dias', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => `${value} dias`} />
                  <Legend />
                  <Bar dataKey="tempoMedio" name="Tempo Médio" fill="#8884d8" />
                  <Bar dataKey="tempoMinimo" name="Mínimo" fill="#82ca9d" />
                  <Bar dataKey="tempoMaximo" name="Máximo" fill="#ff8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-2">Tendência de Tempo de Resolução nos Últimos 6 Meses</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dadosTendencia.map((item, index) => (
                  <div key={index} className="border rounded p-2">
                    <h5 className="font-medium mb-2">{item.categoria}</h5>
                    <ResponsiveContainer width="100%" height={150}>
                      <LineChart
                        data={item.tendencia}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis domain={['dataMin', 'dataMax']} />
                        <Tooltip formatter={(value) => `${value} dias`} />
                        <Line 
                          type="monotone" 
                          dataKey="tempo" 
                          stroke={CORES[index % CORES.length]} 
                          name="Tempo (dias)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded">
              <h4 className="font-medium mb-2">Interpretação dos Dados</h4>
              <p>Esta seção compara o tempo entre a criação e finalização dos chamados por categoria.</p>
              <ul className="list-disc ml-8 mt-2">
                <li>O tempo médio de resolução varia por categoria, com <strong>Desenvolvimento</strong> normalmente exigindo mais tempo.</li>
                <li>Observe a tendência dos últimos meses para verificar se há melhoria na eficiência de atendimento.</li>
                <li>Chamados de <strong>Dúvidas</strong> tendem a ser resolvidos mais rapidamente que outros tipos.</li>
              </ul>
            </div>
          </div>
        </div>
      );
    };

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-xl font-medium mb-4">Carregando dashboard...</p>
            <p>Preparando os dados de demonstração</p>
          </div>
        </div>
      );
    }

    if (erro) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center bg-red-100 p-6 rounded-lg">
            <p className="text-xl font-medium mb-4 text-red-700">Erro ao carregar dados</p>
            <p className="text-red-600">{erro}</p>
            <p className="mt-4">Por favor, atualize a página ou contate o suporte.</p>
          </div>
        </div>
      );
    }

    if (!data) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-xl font-medium mb-4">Nenhum dado disponível</p>
            <p>Não foi possível processar os dados</p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gray-100 min-h-screen p-4">
        <header className="bg-white shadow rounded-lg p-4 mb-6">
          <h1 className="text-2xl font-bold">Dashboard SECOR - Análise de Chamados</h1>
          <p className="text-gray-600">Visualização e comparação de dados de criação e finalização de chamados</p>
          <p className="mt-2 text-sm text-blue-600">* Utilizando dados de demonstração simulados</p>
        </header>
        
        {renderizarKPIs()}
        
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-medium mb-4">Visualização por Período</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => alterarVisao('mensal')}
                className={`px-4 py-2 rounded ${visaoAtual === 'mensal' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800'}`}
              >
                Mensal
              </button>
              <button
                onClick={() => alterarVisao('trimestral')}
                className={`px-4 py-2 rounded ${visaoAtual === 'trimestral' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800'}`}
              >
                Trimestral
              </button>
              <button
                onClick={() => alterarVisao('anual')}
                className={`px-4 py-2 rounded ${visaoAtual === 'anual' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800'}`}
              >
                Anual
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="text-lg font-medium mb-4">Quantidade de Chamados Finalizados por Período</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data[visaoAtual]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rotulo" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="quantidade" 
                stroke="#8884d8" 
                name="Chamados Finalizados"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {renderizarGraficoBarra()}
        
        {renderizarGraficosPizza()}
        
        {renderizarSecaoComparativa()}
        
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>Dashboard atualizado em {new Date().toLocaleString()}</p>
          <p>Visão atual: {visaoAtual === 'mensal' ? 'Mensal' : visaoAtual === 'trimestral' ? 'Trimestral' : 'Anual'}</p>
        </div>
      </div>
    );
  };

  export default Dashboard;
