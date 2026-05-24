import React, { useState } from "react";

// ================= STYLES =================

const page = { padding: 20 };

const title = {
  fontSize: 32,
  fontWeight: "800",
  color: "#111",
  marginBottom: 5,
};

const subtitle = {
  color: "#64748b",
  marginBottom: 20,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 16,
};

const card = {
  background: "#fff",
  padding: 18,
  borderRadius: 16,
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
};

const cardTitle = {
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 12,
};

const qaBox = {
  borderTop: "1px solid #eee",
  paddingTop: 10,
  marginTop: 10,
};

const question = {
  display: "flex",
  justifyContent: "space-between",
  cursor: "pointer",
  fontWeight: "600",
  color: "#2563eb",
};

const answer = {
  marginTop: 8,
  fontSize: 14,
  color: "#334155",
  whiteSpace: "pre-line",
};

// ================= DATA =================

const DATA = [
  {
    title: "AUTH SYSTEM",
    color: "#2563eb",
    items: [
      {
        q: "How does login work?",
        a: `Login uses JWT authentication. After successful login, token is stored in localStorage.
It is automatically attached to every API request via Authorization header.

If token is missing or expired, user is redirected to login page.`,
      },
      {
        q: "Who can register doctors?",
        a: `Only ADMIN can register doctors.
Doctor registration includes: name, email, specialization, clinic info and phone number.`,
      },
      {
        q: "What roles exist?",
        a: `System has 3 roles:
- ADMIN (full access)
- DOCTOR (patients + appointments)
- PATIENT (book appointments only)`,
      },
    ],
  },

  {
    title: "DOCTORS MODULE",
    color: "#16a34a",
    items: [
      {
        q: "How to add a doctor?",
        a: `Go to Doctors → Add Doctor page.
Fill all required fields (name, specialization, email, phone, clinic name).
Only ADMIN can perform this action.`,
      },
      {
        q: "How edit doctor works?",
        a: `Click EDIT button on doctor card.
A modal opens where you can update data.
After clicking SAVE, PUT request updates backend.`,
      },
      {
        q: "Delete doctor?",
        a: `Only ADMIN can delete doctors.
Deletion is permanent and removes doctor from database.`,
      },
    ],
  },

  {
    title: "PATIENTS MODULE",
    color: "#f59e0b",
    items: [
      {
        q: "How to add patient?",
        a: `Patients can be added by ADMIN or DOCTOR.
Required fields: name, email, phone.
Data is saved in database via POST /api/patients.`,
      },
      {
        q: "Edit patient?",
        a: `Click EDIT button → modal opens → change values → SAVE.
System sends PUT request to update patient.`,
      },
      {
        q: "Delete patient?",
        a: `Patients can be deleted by ADMIN or DOCTOR.
Action is irreversible.`,
      },
    ],
  },

  {
    title: "APPOINTMENTS",
    color: "#ef4444",
    items: [
      {
        q: "How to book appointment?",
        a: `Patient selects doctor and time slot.
Appointment is saved with status BOOKED.`,
      },
      {
        q: "Completed appointments?",
        a: `Doctor or ADMIN can mark appointment as COMPLETED after visit.`,
      },
      {
        q: "Cancelled appointments?",
        a: `Appointments can be cancelled by patient or doctor depending on role.`,
      },
      {
        q: "Delete appointment?",
        a: `Only ADMIN/DOCTOR can delete appointments permanently.`,
      },
    ],
  },
];

// ================= COMPONENT =================

const Help = () => {
  const [open, setOpen] = useState(null);

  return (
    <div style={page}>
      <h1 style={title}>Help Center</h1>
      <p style={subtitle}>
        Click on a question to see detailed explanation of how the system works.
      </p>

      <div style={grid}>
        {DATA.map((section, i) => (
          <div
            key={i}
            style={{
              ...card,
              borderTop: `4px solid ${section.color}`,
            }}
          >
            <h2 style={cardTitle}>{section.title}</h2>

            {section.items.map((item, index) => (
              <div key={index} style={qaBox}>
                <div
                  style={question}
                  onClick={() =>
                    setOpen(open === item.q ? null : item.q)
                  }
                >
                  <span>{item.q}</span>
                  <span>{open === item.q ? "−" : "+"}</span>
                </div>

                {open === item.q && (
                  <div style={answer}>{item.a}</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;