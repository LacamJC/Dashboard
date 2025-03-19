import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import logo from "../../../img/BITMAP.png"
import styles from "./Footer.module.css"
const Footer = () => {
    return (
        <>
            <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center">
                        <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                            {/* Replace with your logo SVG or component */}
                            <img src={logo} alt="Logo da empresa multi soluction"/>
                        </a>
                        <span className={`${styles.alert} mb-3 mb-md-0 text-body-secondary`}>&copy; Todos os direitos reservados</span>
                    </div>

                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className={`${styles.icon} ms-3 fs-1`} title="Ir para o Whatsapp">
                            <a className="text-body-secondary" href="https://wa.me/5511933633054" target="_blank">
                                {/* Replace with your Twitter SVG or component */}
                                <FaWhatsapp/>
                            </a>
                        </li>
                        <li className={`${styles.icon} ms-3 fs-1`} title="Ir para o Instagram">
                            <a className="text-body-secondary" href="https://www.instagram.com/multisoluction/" target="_blank">
                                {/* Replace with your Instagram SVG or component */}
                                <FaInstagram/>
                            </a>
                        </li>
                        <li className={`${styles.icon} ms-3 fs-1`} title="Ir para o Linkedin">
                            <a className="text-body-secondary" href="https://www.linkedin.com/company/multi-soluction/?viewAsMember=true" target="_blank">
                                {/* Replace with your Facebook SVG or component */}
                                <FaLinkedin />
                            </a>
                        </li>
                    </ul>
                </footer>
            </div>
        </>
    )
}

export default Footer