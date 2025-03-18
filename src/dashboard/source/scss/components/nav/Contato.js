
import styles from"./Contato.module.css";
const Contato = () => {


    const link = "https://wa.me/5511933633054"

    

    return(
        <>
            <div className={`${styles.help}`}>
              
                    <span>Encontrou algum problema ?</span>
           
                <a href={link} target="_blank">
                    <button >
                        Contatar Multi Soluction
                    </button>
                </a>
            </div>
        </>
    )
}

export default Contato