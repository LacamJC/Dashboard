
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import styles from "../../source/scss/Main.module.css"
const Duvidas = () => {
    const CORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];
    const data = [
        { indice: 'Dúvidas' },
        { mes: 'Outubro/2024', tempo: 0, chamados: 0 },
        { mes: 'Novembro/2024', tempo: 0, chamados: 0 },
        { mes: 'Dezembro/2024', tempo: 0, chamados: 0 },
        { mes: 'Janeiro/2025', tempo: 0, chamados: 0 },
        { mes: 'Fevereiro/2025', tempo: 2, chamados: 3 },
        { mes: 'Março/2025', tempo: 1, chamados: 5 }

    ]
    const dadosGrafico = data.slice(1);

    return (
        <>
            <div>
                <div className="border rounded p-2 mb-4">
                    <h5 className={`${styles.subtitulo}`}>{data[0].indice}</h5>
                    <ResponsiveContainer width="100%" height={150}>
                        <LineChart
                            data={dadosGrafico}
                            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" />
                            <YAxis domain={['dataMin', 'dataMax']} />
                            {/* <Tooltip formatter={(value) => `${value} min`} /> */}
                            <Tooltip/>
                            <Line
                                type="monotone"
                                dataKey="tempo"
                                // stroke={CORES[index % CORES.length]}
                                name="Tempo necessario (em minutos)"
                            />
                            <Line
                                type="monotone"
                                dataKey="chamados"
                                name="Quantidade de chamados"
                                stroke="#5055f0"
                            />
                            <Legend />
                        </LineChart>
                    </ResponsiveContainer>

                </div>
            </div>


        </>
    )
}


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`Mês: ${label}`}</p>
                <p className="intro">{`Tempo necessário: ${payload[0].value} min`}</p>
                <p className="intro">{`Quantidade de chamados: ${payload[1].value}`}</p>
            </div>
        );
    }

    return null;
};

export default Duvidas
