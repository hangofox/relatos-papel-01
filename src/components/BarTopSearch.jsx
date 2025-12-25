export const BarTopSearch = () => {
  return (
    <div class="barra back-black">
      <div className="row p-5">
        <div className="col">
          <input type="text" className="field form-control" name="text_query" id="text_query" placeholder="Buscar por título" />
        </div>
        <div className="col">
          <select className="field form-select" name="id_autor" id="id_autor">
            <option selected>Todos los autores</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="col">
          <select className="field form-select" name="id_categoria" id="id_categoria">
            <option selected>Todas las categorias</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
    </div>
  );
}