import React from 'react';

const Footer = () => {
    let thisYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <p className="footer__copyright">
                &copy; {thisYear} Mesto Russia
            </p>
        </footer>
    );
};

export default Footer;
