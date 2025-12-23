import { Navbar } from "../components/Navbar";
import { RecRCom } from "../components/RecRCom";
import { CategRot } from "../components/CategRot";
import { Footer } from "../components/Footer";
import "../css/estilos-sitio-web.css";

export const Home = () => {
  return (
    <table width="100%" border="0" align="center" cellPadding="0" cellSpacing="0">
      <tbody>
        <tr>
          <td>
            <Navbar />
          </td>
        </tr>
        <tr>
          <td>
            <RecRCom />
          </td>
        </tr>
        <tr>
          <td>
            <CategRot />
          </td>
        </tr>
        <tr>
          <td>
            <Footer />
          </td>
        </tr>
      </tbody>
    </table>
  );
};