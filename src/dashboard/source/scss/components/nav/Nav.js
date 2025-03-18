import styles from "./Nav.module.css"

const Nav = () => {
    return(
        <>
        <nav>
            <h1>Secor Dashboard - Análise de Chamados</h1>
            <div className={`${styles.logo}`}>
                <img src="https://www.secor.org.br/wp-content/uploads/2020/11/logo-secor.png"></img>
            </div>
        </nav>
        </>
    )
}

export default Nav