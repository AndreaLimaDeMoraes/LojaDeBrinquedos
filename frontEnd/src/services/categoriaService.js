import api from './api';

const categoriaService = {
  listar: () => api.get('/categorias'),
  buscarPorId: (id) => api.get(`/categorias/${id}`),
  criar: (data) => api.post('/categorias', data),
  atualizar: (id, data) => api.put(`/categorias/${id}`, data),
  excluir: (id) => api.delete(`/categorias/${id}`),
  excluirMuitos: (ids) => api.post('/categorias/deletar-varios', ids)
};

export default categoriaService;