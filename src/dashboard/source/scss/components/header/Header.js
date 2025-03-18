import styles from "./Header.module.css"

const Header = () => {
    return (<>
        <header className={`${styles.header}  mx-5 `}>

            {/* <div className={`col col-md-6 col-12 d-flex flex-column justify-content-center`}> */}
                <h1 className="text-2xl font-bold"><span className={`${styles.t_1}`}>Dashboard SECOR</span> <br /> Análise de Chamados</h1>
                <p className="text-gray-600">Visualização e comparação de dados de criação e finalização de chamados</p>
                {/* <p className="mt-2 text-sm text-blue-600">* Utilizando dados de demonstração simulados</p> */}
                <a href="#dashboard">
                    <button className="btn btn-lg btn-primary">
                        Ver gráficos
                    </button>
                </a>
            {/* </div> */}

            {/* <div className={`${styles.sideBG} col col-md-6 col-12`}>
              
            </div> */}
        </header></>)
}

export default Header