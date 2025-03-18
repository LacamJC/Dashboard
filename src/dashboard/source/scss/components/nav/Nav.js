
import logo from "../../../img/logo_multi.png"
import Contato from "./Contato"
import styles from "./Nav.module.css"

const Nav = () => {
    return(
        <>
        <nav>
            <div className={`${styles.upe}`}>
                <div className={`${styles.logo}`}>
                    <img src="https://www.secor.org.br/wp-content/uploads/2020/11/logo-secor.png"></img>
                </div>
                <div className={`${styles.title}`}>
                    Dashboard - Análise de Chamados
                </div>
            </div>

            <Contato/>
        </nav>
        </>
    )
}

export default Nav