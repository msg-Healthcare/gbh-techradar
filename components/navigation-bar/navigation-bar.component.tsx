'use client'

import {Container, Navbar} from "react-bootstrap";
import './navigation-bar.component.scss';
import "bootstrap/dist/css/bootstrap.min.css"
import {useTheme} from "next-themes";

export function NavigationBarComponent(props: any) {

    const {theme, setTheme} = useTheme()

    return (
        <Navbar className="navbar navbar-expand-lg shadow-sm mb-5">
            <Container className="container-fluid">
                <img alt="msg logo"
                       className="navbar-brand d-inline-block align-middle mt-2 ms-3"></img>
                <Container id="navbarNav" className="d-flex m-0 justify-content-end">
                    <button type="button" className="btn mx-3 dark-mode-button"
                            onClick={() => theme == 'light' ? setTheme('dark') : setTheme('light')}>
                        <img alt="toggle dark mode" className="dark-mode-image"></img>
                    </button>
                </Container>
            </Container>
        </Navbar>
    )
}
