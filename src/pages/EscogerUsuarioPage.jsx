import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const EscogerUsuarioPage = () => {

  const navigate = useNavigate();

  const usuarios = [
    { id: 1, nombre: "Ivonne Andrade" },
    { id: 2, nombre: "Perla Villavicencio" },
    { id: 3, nombre: "Pedro Salas" }
  ];

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  const handleGuardar = () => {
    if (!usuarioSeleccionado) {
      alert("Por favor selecciona un usuario");
      return;
    }

    localStorage.setItem("idUsuarioConectado", usuarioSeleccionado);

    // Opcional: reload
    window.location.reload();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        
        <h3 className="text-center mb-4">Seleccionar Usuario</h3>

        <div className="mb-3">
          <label className="form-label fw-bold">Escoge un usuario:</label>
          <select
            className="form-select"
            value={usuarioSeleccionado}
            onChange={(e) => setUsuarioSeleccionado(e.target.value)}
          >
            <option value="">-- Seleccionar --</option>
            {usuarios.map((user) => (
              <option key={user.id} value={user.id}>
                {user.nombre} (ID: {user.id})
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleGuardar}
        >
          Confirmar Usuario
        </button>

      </div>
    </div>
  );
};