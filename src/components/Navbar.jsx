import "../css/estilos-sitio-web.css";

export const Navbar = () => {
  return (
    <table width="100%" border="1" align="center" cellPadding="0" cellSpacing="0" className="cabezote">
      <tbody>
        <tr valign="top">
          <td width="10%">LOGO.</td>
          <td width="18%">LIBRERÍA RELATOS DE PAPEL.</td>
          <td width="18%">Inicio.</td>
          <td width="18%">Búsqueda.</td>
          <td width="18%">
            Hola<br />Nombres y apellidos usuario.
          </td>
          <td width="18%">Carrito de compras.</td>
        </tr>
      </tbody>
    </table>
  );
};