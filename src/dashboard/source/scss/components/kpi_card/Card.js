import styles from "../../Main.module.css"
const Card = ({ titulo, identificador, valor, descricao }) => {
    return (<>
        <div className={`${styles.card}`}>
            <h3>{titulo}  <span>{identificador}</span></h3>
            <p>{valor}</p>

            <p className={`${styles.descricao}`}>{descricao}</p>
        </div>
    </>)
}

export default Card