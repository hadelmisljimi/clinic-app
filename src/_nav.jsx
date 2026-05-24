import React from "react";
import CIcon from "@coreui/icons-react";
import { cilUser, cilCalendar, cilDescription, cilStar } from "@coreui/icons";
import { CNavGroup, CNavItem } from "@coreui/react";

const _nav = [
  {
    component: CNavGroup,
    name: "Doctors",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All Doctors",
        to: "/doctors",
      },
      {
        component: CNavItem,
        name: "Add Doctor",
        to: "/doctors/add",
      },
      {
        component: CNavItem,
        name: "Edit Doctor",
        to: "/doctors/edit",
      },
      {
        component: CNavItem,
        name: "Delete Doctor",
        to: "/doctors/delete",
      },
    ],
  },

  {
    component: CNavGroup,
    name: "Patients",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All Patients",
        to: "/patients",
      },
      {
        component: CNavItem,
        name: "Add Patient",
        to: "/patients/add",
      },
      {
        component: CNavItem,
        name: "Edit Patient",
        to: "/patients/edit",
      },
      {
        component: CNavItem,
        name: "Delete Patient",
        to: "/patients/delete",
      },
    ],
  },

  {
    component: CNavGroup,
    name: "Appointments",
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All Appointments",
        to: "/appointments",
      },
      {
        component: CNavItem,
        name: "Book Appointment",
        to: "/appointments/book",
      },
      {
        component: CNavItem,
        name: "Delete Appointment",
        to: "/appointments/delete",
      },
      {
        component: CNavItem,
        name: "Mark As Completed",
        to: "/appointments/completed",
      },
      {
        component: CNavItem,
        name: "Mark As Cancelled",
        to: "/appointments/cancelled",
      },
    ],
  },

  {
    component: CNavItem,
    name: "Help",
    to: "/help",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
];

export default _nav;