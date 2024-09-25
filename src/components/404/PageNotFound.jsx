import React from "react";
import { NavLink } from "react-router-dom";
import "./PageNotFound.css";

export default function PageNotFound() {
    return (
        <div style={{color:'white'}}>
            {/* <a href="https://codepen.io/uiswarup/full/yLzypyY" target="_blank"> */}
            <header class="top-header"></header>

            {/* <!--dust particel--> */}
            <div>
                <div class="starsec"></div>
                <div class="starthird"></div>
                <div class="starfourth"></div>
                <div class="starfifth"></div>
            </div>
            {/* <!--Dust particle end---> */}

            <div class="lamp__wrap">
                <div class="lamp">
                    <div class="cable"></div>
                    <div class="cover"></div>
                    <div class="in-cover">
                        <div class="bulb"></div>
                    </div>
                    <div class="light"></div>
                </div>
            </div>
            {/* <!-- END Lamp --> */}
            <section class="error">
                {/* <!-- Content --> */}
                <div class="error__content">
                    <div class="error__message message">
                        <h1 class="message__title">404</h1>
                        <p class="message__text">
                            We're sorry, the page you were looking for isn't found here. The
                            link you followed may either be broken or no longer exists. Please
                            try again, or take a look at our.
                        </p>
                    </div>
                    <div class="error__nav e-nav">
                        <NavLink to="/" className="e-nav__link" />
                    </div>
                </div>
                {/* <!-- END Content --> */}
            </section>

            {/* </a> */}
        </div>
    );
}