import React from 'react';
import { useParams } from 'react-router-dom';

const Catalog = () => {
  const { categoriaId } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Catálogo de Brinquedos</h1>
      <p>Mostrando produtos da categoria: {categoriaId}</p>
    </div>
  );
};

export default Catalog;