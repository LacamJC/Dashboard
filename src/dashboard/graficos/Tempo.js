import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useEffect, useState } from 'react';
import styles from "../source/scss/Main.module.css"

const Tempo = () => {

    const tempo_por_categoria = [
        { categoria: 'Suporte', tempoMedio: 1, tempoMinimo: 1, tempoMaximo: 50 },
        { categoria: 'Desenvolvimento', tempoMedio: 14, tempoMinimo: 1, tempoMaximo: 49 }, // certo
        { categoria: 'Dúvidas', tempoMedio: 4, tempoMinimo: 2 , tempoMaximo: 8 }, // certo
        { categoria: 'Projetos', tempoMedio: 13, tempoMinimo: 1, tempoMaximo: 50 }, // certo
    ];

   

    return (
        <>
            <div className="mb-6 card p-2">
                <h4 className={`${styles.subtitulo}`}>Tempo Médio de Resolução por Categoria (em dias)</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={tempo_por_categoria}
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
        </>
    )
}

export default Tempo