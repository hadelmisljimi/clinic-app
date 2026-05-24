import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import { CBadge, CNavLink, CSidebarNav } from "@coreui/react";

export const AppSidebarNav = ({ items = [] }) => {
  const navLink = (name, icon, badge, indent = false) => {
    return (
      <>
        {icon ? (
          icon
        ) : indent ? (
          <span className="nav-icon">
            <span className="nav-icon-bullet"></span>
          </span>
        ) : null}

        {name && <span>{name}</span>}

        {badge && (
          <CBadge color={badge.color} className="ms-auto" size="sm">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index, indent = false) => {
    if (!item?.component) return null;

    const { component: Component, name, badge, icon, to, href } = item;

    return (
      <Component as="div" key={`${name || "item"}-${index}`}>
        {to || href ? (
          <CNavLink
            as={to ? NavLink : "a"}
            to={to || undefined}
            href={href || undefined}
            target={href ? "_blank" : undefined}
            rel={href ? "noopener noreferrer" : undefined}
          >
            {navLink(name, icon, badge, indent)}
          </CNavLink>
        ) : (
          navLink(name, icon, badge, indent)
        )}
      </Component>
    );
  };

  const navGroup = (item, index) => {
    const { component: Component, name, icon, items = [] } = item;

    return (
      <Component
        compact
        as="div"
        key={`${name || "group"}-${index}`}
        toggler={navLink(name, icon)}
      >
        {items.map((child, idx) =>
          child.items
            ? navGroup(child, idx)
            : navItem(child, idx, true)
        )}
      </Component>
    );
  };

  return (
    <CSidebarNav as={SimpleBar}>
      {items.map((item, index) =>
        item.items ? navGroup(item, index) : navItem(item, index)
      )}
    </CSidebarNav>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AppSidebarNav;