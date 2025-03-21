import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useEffect, useState } from 'react';
import styles from "../../dashboard/source/scss/Main.module.css"
const Periodo = () => {
    const [dados, setDados] = useState(null)
    const [catDados, setCatDados] = useState(null)
    const [visao, setVisaoAtual] = useState('mensal')


    useEffect(() => {
        setDados(dadosParaGrafico_mensal)
        setCatDados(categoria_dados_mensal)

    }, [])

    const dadosParaGrafico_mensal = [
        { mes: 'Out/2023', chamados: 3 },
        { mes: 'Nov/2023', chamados: 45 },
        { mes: 'Dez/2023', chamados: 9 },
        { mes: 'Jan/2024', chamados: 3 },
        { mes: 'Fev/2024', chamados: 3 },
        { mes: 'Mar/2024', chamados: 4 },
        { mes: 'Abr/2024', chamados: 2 },
        { mes: 'Mai/2024', chamados: 22 },
        { mes: 'Jun/2024', chamados: 38 },
        { mes: 'Jul/2024', chamados: 63 },
        { mes: 'Ago/2024', chamados: 35 },
        { mes: 'Set/2024', chamados: 36 },
        { mes: 'Out/2024', chamados: 36 },
        { mes: 'Nov/2024', chamados: 42 },
        { mes: 'Dez/2024', chamados: 30 },
        { mes: 'Jan/2025', chamados: 42 },
        { mes: 'Fev/2025', chamados: 31 },
        { mes: 'Mar/2025', chamados: 15 }
    ];

    const dadosParaGrafico_trimestral = [

        { mes: '4º Trimestre/2023', chamados: 57 },
        { mes: '1º Trimestre/2024', chamados: 10 },
        { mes: '2º Trimestre/2024', chamados: 62 },
        { mes: '3º Trimestre/2024', chamados: 134 },
        { mes: "4º Trimestre/2024", chamados: 108 },
        { mes: '1º Trimestre/2025', chamados: 88 }
    ]

    const dadosParaGrafico_anual = [

        { mes: "Ano 2023", chamados: 57 },
        { mes: "Ano 2024", chamados: 314 },
        { mes: "Ano 2025", chamados: 88 }

    ]

    const alterarVisao = (novaVisao) => {
        setVisaoAtual(novaVisao);
        setTimeout(() => {
            if (novaVisao === 'mensal') {
                setDados(dadosParaGrafico_mensal);
                setCatDados(categoria_dados_mensal)
            } else if (novaVisao === 'trimestral') {
                setDados(dadosParaGrafico_trimestral);
                setCatDados(categoria_dados_trimestrais)
            } else if (novaVisao === 'anual') {
                setDados(dadosParaGrafico_anual);
                setCatDados(categoria_dados_anual)
            }
        }, 500);
    };




    /////////////

    const categoria_dados_anual = [
        {
            mes: 'Ano 2023',
            suporte: 12,
            projetos: 0,
            duvidas: 0,
            desenvolvimento: 45
        },
        {
            mes: 'Ano 2024',
            suporte: 269,
            projetos: 7,
            duvidas: 0,
            desenvolvimento: 38
        },
        {
            mes: 'Ano 2025',
            suporte: 65,
            projetos: 6,
            duvidas: 8,
            desenvolvimento: 9
        }
    ]

    const categoria_dados_trimestrais = [
        {
            mes: '4º Trimestre/2023',
            suporte: 12,
            projetos: 0,
            duvidas: 0,
            desenvolvimento: 45,
        },

        {
            mes: '1º Trimestre/2024',
            suporte: 2,
            projetos: 0,
            duvidas: 0,
            desenvolvimento: 8,
        },
        {
            mes: '2º Trimestre/2024',
            suporte: 59,
            projetos: 0,
            duvidas: 0,
            desenvolvimento: 3,
        },
        {
            mes: '3º Trimestre/2024',
            suporte: 118,
            projetos: 2,
            duvidas: 0,
            desenvolvimento: 14,
        },
        {
            mes: '4º Trimestre/2024',
            suporte: 90,
            projetos: 5,
            duvidas: 0,
            desenvolvimento: 13,
        },

        {
            mes: "1º Trimestre/2025",
            suporte: 65,
            projetos: 6,
            duvidas: 8,
            desenvolvimento: 9,

        }

    ]

    const categoria_dados_mensal = [
        {
            mes: 'Out/2023',
            suporte: 0,
            projetos: 0,
            duvidas: 0,
            desenvolvimento: 3,
        },
        {
            mes: 'Nov/2023',
            suporte: 8,
            projetos: 0,
            duvidas: 0,
            desenvolvimento: 37,
        },
        {
            mes: 'Dez/2023',
            suporte: 4,
            projetos: 0,
            duvidas: 0,
            desenvolvimento: 5,
        },
        {
            mes: 'Jan/2024',
            suporte: 1,
            projetos: 0,
            duvidas: 0,
            desenvolvimento: 2,
        },
        {
            mes: 'Fev/2024',
            suporte: 1,
            projetos: 0,
            duvidas: 0,
            desenvolvimento: 2,
        },
        {
            mes: 'Mar/2024',
            suporte: 0,
            projetos: 0,
            duvidas: 0,
            desenvolvimento: 4,
        },
        {
            mes: 'Abr/2024',
            suporte: 1,
            projetos: 0,
            duvidas: 0,
            desenvolvimento: 1,
        },
        {
            mes: 'Mai/2024',
            suporte: 20,
            projetos: 0,
            duvidas: 0,
            desenvolvimento: 2,
        },
        {
            mes: 'Jun/2024',
            suporte: 38,
            projetos: 0,
            duvidas: 0,
            desenvolvimento: 0,
        },
        {
            mes: 'Jul/2024',
            suporte: 49,
            projetos: 2,
            duvidas: 0,
            desenvolvimento: 12,
        },
        {
            mes: 'Ago/2024',
            suporte: 34,
            projetos: 0,
            duvidas: 0,
            desenvolvimento: 1,
        },
        {
            mes: 'Set/2024',
            suporte: 35,
            projetos: 0,
            duvidas: 0,
            desenvolvimento: 1,
        },
        {
            mes: 'Out/2024',
            suporte: 27,
            projetos: 2,
            duvidas: 0,
            desenvolvimento: 7,
        },
        {
            mes: 'Nov/2024',
            suporte: 36,
            projetos: 2,
            duvidas: 0,
            desenvolvimento: 4,
        },
        {
            mes: 'Dez/2024',
            suporte: 27,
            projetos: 1,
            duvidas: 0,
            desenvolvimento: 2,
        },
        {
            mes: 'Jan/2025',
            suporte: 31,
            projetos: 4,
            duvidas: 0,
            desenvolvimento: 7,
        },
        {
            mes: 'Fev/2025',
            suporte: 24,
            projetos: 1,
            duvidas: 5,
            desenvolvimento: 1,
        },
        {
            mes: 'Mar/2025',
            suporte: 10,
            projetos: 1,
            duvidas: 3,
            desenvolvimento: 1,
        },
    ]





    return (<>
        <div className="card mb-4 ">

            <div className={`${styles.check}`} >
                <div className={` rounded-lg  p-4 `}>
                    <h2 className={`${styles.subtitulo}`}>Visualização por Período</h2>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => { alterarVisao('mensal') }}
                            className={`${styles.button}  ${visao === 'mensal'
                                ? `${styles.select}`
                                : 'bg-gray-200 text-gray-800'}`}
                        >
                            Mensal
                        </button>
                        <button
                            onClick={() => alterarVisao('trimestral')}
                            className={`${styles.button}  ${visao === 'trimestral'
                                ? `${styles.select}`
                                : 'bg-gray-200 text-gray-800'}`}
                        >
                            Trimestral
                        </button>
                        <button
                            onClick={() => alterarVisao('anual')}
                            className={` ${styles.button}  ${visao === 'anual'
                                ? `${styles.select}`
                                : 'bg-gray-200 text-gray-800'}`}
                        >
                            Anual
                        </button>
                    </div>
                </div>
            </div>

            <div className="card-body">

                <h5 className={`${styles.subtitulo}`}>Quantidade de Chamados Finalizados por Período</h5>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart width={1000} height={400} data={dados} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="chamados"
                            stroke="#8884d8"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            name="Chamados Finalizados"
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>

            </div>





            <div className="bg-white rounded-lg bg-primary p-4 mb-6">

                <h3 className={`${styles.subtitulo}`}>Chamados Finalizados por Categoria</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={catDados} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="suporte" fill="#8884d8" name="Suporte" />
                        <Bar dataKey="projetos" fill="#82ca9d" name="Projetos" />
                        <Bar dataKey="duvidas" fill="#ffc658" name="Dúvidas" />
                        <Bar dataKey="desenvolvimento" fill="#a8a8a8" name="Desenvolvimento" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </>)
}

export default Periodo


// <LineChart
//                         data={dadosParaGrafico}
//                         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                     >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="rotulo" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Line
//                             type="monotone"
//                             dataKey="quantidade"
//                             stroke="#8884d8"
//                             name="Chamados Finalizados"
//                             strokeWidth={2}
//                             dot={{ r: 4 }}
//                             activeDot={{ r: 6 }}
//                         />
//                     </LineChart>