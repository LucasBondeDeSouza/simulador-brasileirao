import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

export default ({ darkMode }) => {

    return (
        <div class={`${darkMode ? 'footer-dark' : 'footer-light'}`}>
            <div className="py-2"></div>
            <footer class={`container d-flex flex-wrap justify-content-between align-items-center py-3 border-top ${darkMode ? 'border-secondary' : ''}`}>
                <div class="col-md-4 d-flex align-items-center">
                    <span class={`mb-3 mb-md-0 ${darkMode ? 'text-light' : 'text-secondary'}`}>© 2024 Lucas Bonde</span>
                </div>

                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li class="ms-3">
                        <a class="text-primary fs-4" href="https://www.linkedin.com/in/lucasbonde/" target='_blank'>
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </li>
                    <li class="ms-3">
                        <a class={`${darkMode ? 'text-light' : 'text-dark'} fs-4`} href="https://github.com/LucasBondeDeSouza" target='_blank'>
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </li>
                    <li className="ms-3">
                        <a class={`${darkMode ? 'text-light' : 'text-dark'} fs-4`} href="https://portfolio-lucas-red.vercel.app/" target='_blank'>
                            <FontAwesomeIcon icon={faBriefcase} />
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
    )
}