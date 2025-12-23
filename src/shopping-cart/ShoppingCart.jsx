import { Navbar } from "../components/Navbar";
import { ShopingList } from "../components/ShopingList";
import { Footer } from "../components/Footer";
import "../css/estilos-sitio-web.css";

export const ShoppingCart = () => {
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
            <ShopingList />
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