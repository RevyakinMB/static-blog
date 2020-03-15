import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import './header.scss';

const Header = ({ siteTitle }) => (
  <header className="header">
    <div className="header__content">
      <h1 className="header__home-header">
        <Link
          to="/"
          className="header__home-link"
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
