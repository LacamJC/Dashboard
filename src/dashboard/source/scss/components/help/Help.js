import Ws from "../ws/Ws"
import styles from "./Help.module.css"

const Help = () => {
    return (
        <>

            <div className={`${styles.help} mt-6 p-4 bg-gray-50 rounded my-5`}>
                <h4 className="">Comparação: Finalização e Categoria</h4>
                <p>Esta seção compara o tempo de finalização mensal de chamados.</p>
                <ul className="">
                    <li>O tempo médio de resolução varia por categoria, com <strong>Desenvolvimento</strong> normalmente exigindo mais tempo.</li>
                    <li>Observe a tendência dos últimos meses para verificar se há melhoria na eficiência de atendimento.</li>
                    <li>Chamados de <strong>Dúvidas</strong> tendem a ser resolvidos mais rapidamente que outros tipos.</li>
                    <li>Valores baixos como (0) podem representar que não houveram casos no mês que representa</li>
                </ul>
            </div>
           
        </>
    )
}

export default Help