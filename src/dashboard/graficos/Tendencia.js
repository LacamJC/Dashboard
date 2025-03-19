import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useEffect, useState } from 'react';
import styles from "../source/scss/Main.module.css"
import Mws from '../source/scss/components/ws/Mws';
import Ws from '../source/scss/components/ws/Ws';
import Help from '../source/scss/components/help/Help';

const Tendencia = () => {
    const CORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

    const tendencia =
        [


            [
                { indice: 'Desenvolvimento' },
                { mes: 'Outubro/2024', tempo: 7 },
                { mes: 'Novembro/2024', tempo: 3 },
                { mes: 'Dezembro/2024', tempo: 3 },
                { mes: 'Janeiro/2025', tempo: 5 },
                { mes: 'Fevereiro/2025', tempo: 0 },
                { mes: 'Março/2025', tempo: 0 }

            ],

            [
                { indice: 'Dúvidas' },
                { mes: 'Outubro/2024', tempo: 0 },
                { mes: 'Novembro/2024', tempo: 0 },
                { mes: 'Dezembro/2024', tempo: 0 },
                { mes: 'Janeiro/2025', tempo: 0 },
                { mes: 'Fevereiro/2025', tempo: 5 },
                { mes: 'Março/2025', tempo: 3 }

            ],

            [
                { indice: 'Projetos' },
                { mes: 'Outubro/2024', tempo: 2 },
                { mes: 'Novembro/2024', tempo: 2 },
                { mes: 'Dezembro/2024', tempo: 1 },
                { mes: 'Janeiro/2025', tempo: 4 },
                { mes: 'Fevereiro/2025', tempo: 0 },
                { mes: 'Março/2025', tempo: 0 }

            ],

            [
                { indice: 'Suporte' },
                { mes: 'Outubro/2024', tempo: 26 },
                { mes: 'Novembro/2024', tempo: 36 },
                { mes: 'Dezembro/2024', tempo: 27 },
                { mes: 'Janeiro/2025', tempo: 30 }, //
                { mes: 'Fevereiro/2025', tempo: 24 },
                { mes: 'Março/2025', tempo: 10 }

            ]


        ];

        var cont  = 0
    return (
        <>
            {/* <h5 className="font-medium mb-2">{tendencia[0].indice}</h5>
            <ResponsiveContainer width="100%" height={150}>
                <LineChart
                    data={tendencia}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis domain={['dataMin', 'dataMax']} />
                    <Tooltip formatter={(value) => `${value} dias`} />
                    <Line
                        type="monotone"
                        dataKey="tempo"
                        // stroke={CORES[index % CORES.length]}
                        name="Tempo (dias)"
                    />
                </LineChart>
            </ResponsiveContainer> */}
            <div>

                {tendencia.map((item, index) => {
                    const dadosGrafico = item.slice(1); // Remove o primeiro elemento (indice)
                    cont++
                    return (
                        <div>
                            <div key={index} className="border rounded p-2 mb-4">
                                <h5 className={`${styles.subtitulo}`}>{item[0].indice}</h5>
                                <ResponsiveContainer width="100%" height={150}>
                                    <LineChart
                                        data={dadosGrafico}
                                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="mes" />
                                        <YAxis domain={['dataMin', 'dataMax']} />
                                        <Tooltip formatter={(value) => `${value}    `} />
                                        <Line
                                            type="monotone"
                                            dataKey="tempo"
                                            stroke={CORES[cont]}
                                            strokeWidth={2}
                                            name="Casos finalizados no mês"
                                        />
                                        <Legend />
                                    </LineChart>
                                </ResponsiveContainer>

                            </div>

                        </div>
                    );
                })}
                {/* <Help/> */}
            </div>


        </>
    )
}

export default Tendencia