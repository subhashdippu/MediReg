import React, { useEffect, useState } from "react";
import db from "../db/initDB";
import { onDatabaseChange, broadcastChange } from "../db/sync";

function PatientList() {
  const [patients, setPatients] = useState([]);

  const loadPatients = async () => {
    const res = await db.query("SELECT * FROM patients ORDER BY id DESC;");
    setPatients(res.rows);
  };

  const deletePatient = async (id) => {
    await db.exec(`DELETE FROM patients WHERE id = ${id};`);
    broadcastChange();
    loadPatients(); // Refresh list after deletion
  };

  useEffect(() => {
    loadPatients();

    onDatabaseChange(() => {
      loadPatients();
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Registered Patients
      </h2>

      {patients.length === 0 ? (
        <p className="text-gray-500 text-center">No patients registered.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {patients.map(({ id, name, age, gender, contact }) => (
            <li key={id} className="py-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-medium">{name}</p>
                <p className="text-sm text-gray-600">
                  Age: {age} | Gender: {gender} | Contact: {contact}
                </p>
              </div>
              <button
                onClick={() => deletePatient(id)}
                className="ml-4 px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PatientList;
