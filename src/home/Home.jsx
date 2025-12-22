import { Navbar } from "../components/Navbar";
import "../css/estilos-sitio-web.css";

export const Home = () => {
  return (
    <table width="100%" border="1" align="center" cellPadding="0" cellSpacing="0" className="tabla-principal">
      <tbody>
        <tr>
          <td>
            <Navbar />
          </td>
        </tr>
        <tr>
          <td>RECOMENDACIONES.</td>
        </tr>
        <tr>
          <td>CUERPO.</td>
        </tr>
        <tr>
          <td>FOOTER.</td>
        </tr>
      </tbody>
    </table>
  );
};