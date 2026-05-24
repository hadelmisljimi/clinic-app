import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from "@coreui/react";

import { AppSidebarNav } from "./AppSidebarNav";
import navigation from "../_nav";

const AppSidebar = () => {
  const dispatch = useDispatch();

  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/" style={{ textDecoration: "none" }}>
          <div
            className="sidebar-brand-full fw-bold"
            style={{
              fontSize: "16px",
              color: "#0d6efd",
              fontFamily: "Segoe UI, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            Doctor Appointment System
          </div>

          <div
            className="sidebar-brand-narrow fw-bold"
            style={{
              fontSize: "18px",
              color: "#0d6efd",
              fontFamily: "Segoe UI, sans-serif",
            }}
          >
            DAS
          </div>
        </CSidebarBrand>

        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() =>
            dispatch({ type: "set", sidebarShow: false })
          }
        />
      </CSidebarHeader>

      <AppSidebarNav items={navigation} />

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() =>
            dispatch({
              type: "set",
              sidebarUnfoldable: !unfoldable,
            })
          }
        />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);