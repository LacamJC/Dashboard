import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useEffect, useState } from 'react';
import styles from "../source/scss/Main.module.css"
const Pizza = () => {

    const categoria_dados_pizza = [
        { name: 'Suporte', value: 346 },
        { name: 'Projetos', value: 11 },
        { name: 'Dúvidas', value: 8 },
        { name: 'Desenvolvimento', value: 90 },
    ]

    const prioridade_dados_pizza = [
        { name: 'Baixa', value: 59 },
        { name: 'Normal', value: 310 },
        { name: 'Alta', value: 77 },
        { name: 'Urgente', value: 9 },
    ]
    const CORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

    return (
        <>
            <div className="card">
                <div className="row bg-warnig mb-6 my-5">
                    {/* Gráfico de Pizza - Categorias */}
                    <div className="bg-white rounded-lg  p-4 col col-md-6 col-12">
                        <h3 className={`${styles.subtitulo} text-lg font-medium mb-4 text-center`}>Distribuição por Categoria</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={categoria_dados_pizza}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {categoria_dados_pizza.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [value, name]} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Gráfico de Pizza - Prioridades */}
                    <div className="bg-white rounded-lg  p-4 col col-md-6 col-12">
                        <h3 className={`${styles.subtitulo} text-lg font-medium mb-4 text-center`}>Distribuição por Prioridade</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={prioridade_dados_pizza}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {prioridade_dados_pizza.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [value, name]} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
            </div>

                {/* Gráfico de Pizza - Tipos */}

            </div>
        </>
    )
}

export default Pizza