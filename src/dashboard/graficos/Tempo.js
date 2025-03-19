import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useEffect, useState } from 'react';
import styles from "../source/scss/Main.module.css"

const Tempo = () => {

    const tempo_por_categoria = [
        { categoria: 'Categorias', suporte: 6, desenvolvimento: 46, projetos: 77, duvidas: 1 },
        // { categoria: 'Desenvolvimento', tempoMedio: 14, tempoMinimo: 1, tempoMaximo: 49 }, // certo
        // { categoria: 'Dúvidas', tempoMedio: 4, tempoMinimo: 2 , tempoMaximo: 8 }, // certo
        // { categoria: 'Projetos', tempoMedio: 13, tempoMinimo: 1, tempoMaximo: 50 }, // certo
    ];

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
                    <BarChart
                        data={tempo_por_categoria}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="categoria" />
                        <YAxis label={{ value: 'Dias', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => `${value} dias`} />
                        <Legend />
                        <Bar dataKey="Categorias" name="Suporte" fill="#8884d8" />
                        <Bar dataKey="duvidas" name="Dúvidas" fill="#82ca9d" />
                        <Bar dataKey="desenvolvimento" name="Desenvolvimento" fill="#ff8042" />
                        <Bar dataKey="projetos" name="Projetos" fill="#ff21ff" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default Tempo