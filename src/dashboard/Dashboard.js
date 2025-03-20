// App.js - Versão adaptada para rodar localmente
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import _ from 'lodash';
import styles from "./source/scss/Main.module.css"
import Card from './source/scss/components/kpi_card/Card';
import Header from "../dashboard/source/scss/components/header/Header"
import Ws from './source/scss/components/ws/Ws';
import Mws from './source/scss/components/ws/Mws';
import Periodo from './graficos/Periodo';
// import Categoria from './graficos/Categoria';
import Pizza from './graficos/Pizza';
import Tempo from './graficos/Tempo';
import Tendencia from './graficos/Tendencia';
import Help from './source/scss/components/help/Help';

const MENSAIS = require("./medias/media_mensal")

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [visaoAtual, setVisaoAtual] = useState('mensal');
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [chamados, setChamados] = useState({
    quantidade: null,
    finalizados: null,
  })

  const [excel_data, setExcelData] = useState({
    chamados_quantidade: 558,
    chamados_finalizados: 445,
    trimestre: {
      chamados_quantidade: 71,
      chamados_finalizados: 71
    }
  })


  const CORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

  useEffect(() => {
    console.log("MEDIA MENSAL")
    console.log(MENSAIS)
    // Versão simplificada para rodar localmente
    try {
      setIsLoading(true);

      // Usar diretamente os dados de demonstração
      const dadosDemo = gerarDadosDemonstracao();

      console.log("Dados de apresentação carregados com sucesso");
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

      // QUANTIDADE DE CHAMADOS
      // const quantidade = Math.floor(Math.random() * 50) + 10;

      const quantidade = excel_data.chamados_quantidade


      // Distribuir por categoria
      const categoriasCount = {
        'Suporte': 346,
        'Dúvidas': 8,
        'Desenvolvimento': 90,
        'Projetos': 11
      };

      let restante = quantidade;

      // for (let j = 0; j < categorias.length - 1; j++) {
      //   const valor = Math.floor(Math.random() * restante * 0.7);
      //   categoriasCount[categorias[j]] = valor;
      //   restante -= valor;
      // }
      // categoriasCount[categorias[categorias.length - 1]] = restante;

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
        rotulo: `${nomesMeses[mes - 1]}/${ano}`,
        quantidade: 10,
        categorias: categoriasCount,
        prioridades: prioridadesCount,
        tipos: tiposCount
      });
      console.log(quantidade)
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
        finalizados: 71,
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

    const totalChamados = dadosMensais[0].quantidade;


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
      <div className="card mb-4 ">

        <div className="card-body">

          <h3 className={`${styles.subtitulo}`}>Quantidade de Chamados Finalizados por Período</h3>
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
      <>

        <Ws />
        {/* <Categoria /> */}
      </>
    );
  };

  const renderizarGraficosPizza = () => {
    if (!data) return null;

    return (
      <div className="row bg-warnig mb-6 my-5">

        <Ws />
        {/* Gráfico de Pizza - Categorias */}
        <Pizza />
        {/* Gráfico de Pizza - Tipos */}

      </div>
    );
  };

  const renderizarKPIs = () => {
    if (!data) return null;

    // Calcular médias por período

    let qtd_array = MENSAIS.MENSAIS
    let total_chamados_meses = 0;
    qtd_array.forEach(element => {
      console.log(`//// ${element}`)
      total_chamados_meses += element
    });

    const mediaMensal = 25


    // const CHAMADOS_QUANTIDADE_TRIMESTRE = excel_data.
    const mediaTrimestral = 75

    const mediaAnual = 151

    return (

      <div className="card p-2">
        {/* <h2 className={`${styles.titulo} text-center`}>Métricas</h2> */}
        <div className={`${styles.kpi_card}`}>
          <Card
            titulo="Total de chamados"
            identificador="Finalizados"
            valor={455}
            descricao="Referente a: Anos de 2023 a 2025"
          />
          <Card
            titulo="Média Mensal de"
            identificador="Finalização"
            valor={mediaMensal}
            descricao="Referente a: todos os meses de 2023 a 2025"
          />
          <Card
            titulo="Média Trimestral de "
            identificador="Finalização"
            valor={mediaTrimestral}
            descricao="Referente a: Últimos 12 meses"
          />
          <Card
            titulo="Média Anual de  "
            identificador="Finalização"
            valor={mediaAnual}
            descricao="Referente a: Anos de 2023 a 2025"
          />
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
        <Ws />
        <div className="bg-whte rounded-lg  p-4 mb-4 card">
          {/* <h3 className={`${styles.titulo} text-xl font-medium mb-4`}>Comparação: Criação, Finalização e Categoria</h3> */}
        
       


          {/* TEMPO MÉDIO COMECA AQUI */}
          {/* <Tempo /> */}
          {/* <Ws /> */}

          <div className="mt-8">
            <h4 className={`${styles.titulo} text-lg font-medium mb-2`}>Tendência de Resolução nos Últimos 6 Meses</h4>
            <p>Dados referentes a 01/10/2024 até 14/03/2025</p>
            <Mws />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* {dadosTendencia.map((item, index) => (

                <div class="">
                  <Mws />
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
                </div>
              ))} */}

              <Tendencia />
            </div>
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
          <p>Preparando os dados de apresentação</p>
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
    <div className="bg-gray-100 min-h-screen p-4" >


      <div id='dashboard'></div>


      {renderizarKPIs()}



      <div className=" mt-5">
        <Periodo />
        {/* <h3 className="text-lg font-medium mb-4">Quantidade de Chamados Finalizados por Período</h3>
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
        </ResponsiveContainer> */}
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
