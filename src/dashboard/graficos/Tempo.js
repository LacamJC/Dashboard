import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useEffect, useState } from 'react';
import styles from "../source/scss/Main.module.css"

const Tempo = () => {

    const CORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];
    // const tempo_por_categoria = [
        // { categoria: 'Categorias', suporte: 6, desenvolvimento: 46, projetos: 77, duvidas: 1 },

    // ];

    const tempo_por_categoria = [
        { name: 'Suporte', value: 6 },
        { name: 'Desenvolvimento', value: 46 },
        { name: 'Projetos', value: 77 },
        { name: 'Dúvidas', value: 1 },
    ]

    // const tempo_medio_categoria = [
    //     {
    //         categoria
    //     }
    // ]



    return (
        <>
            <div className="mb-6 card p-2">
                <h4 className={`${styles.subtitulo}`}>Tempo Médio de Resolução por Categoria (em dias)</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={tempo_por_categoria}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {tempo_por_categoria.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [value, name]} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default Tempo