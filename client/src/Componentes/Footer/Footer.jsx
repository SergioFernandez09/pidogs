import React from 'react';
import { FaDog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
          <div className="footer__content">
            <div className="footer__logo">
              <Link to="/" className="logoFooter">
                Dog App
              </Link>
              <FaDog size={24} />
            </div>
            <div className="footer__contact">
              <h3>Contacto</h3>
              <p>Correo electrónico: sergiofernandezn2001@gmail.com</p>
              <p>Teléfono: +351938210424</p>
              <p>Dirección: Portugal, Setúbal</p>
            </div>
            <div className="footer__navigation">
              <h3>Navegación</h3>
              <ul>
                <li>
                  <a href="/home">Inicio</a>
                </li>
                <li>
                  <a href="/about">Acerca de nosotros</a>
                </li>
                <li>
                  <a href="/terms">Términos y condiciones</a>
                </li>
                <li>
                  <a href="/privacy">Política de privacidad</a>
                </li>
                <li>
                  <a href="/faq">Preguntas frecuentes</a>
                </li>
              </ul>
            </div>
            <div className="footer__social">
              <h3>Redes sociales</h3>
              <ul>
                <li>
                  <a href="https://www.facebook.com">Facebook</a>
                </li>
                <li>
                  <a href="https://www.twitter.com">Twitter</a>
                </li>
                <li>
                  <a href="https://www.instagram.com">Instagram</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__copyright">
            <p>&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
          </div>
        </footer>
      );
    }      
export default Footer;
