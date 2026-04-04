import React, { useState, useEffect } from 'react';
import categoriaService from '../../services/categoriaService';

const CategoryForm = ({ id, mode, onSaveComplete, onCancel }) => {
  // Estado inicial do formulário baseado no CategoriaDTO do back-end
  const initialState = {
    nome: '',
    descricao: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Efeito para carregar dados se estiver no modo 'edit'
  useEffect(() => {
    if (mode === 'edit' && id) {
      const loadCategory = async () => {
        try {
          setLoading(true);
          const response = await categoriaService.buscarPorId(id);
          // Preenche o formulário com o DTO retornado
          setFormData({
            nome: response.data.nome,
            descricao: response.data.descricao
          });
        } catch (err) {
          setError('Erro ao carregar a categoria.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      loadCategory();
    } else {
      // Se mudar para 'add', reseta o formulário
      setFormData(initialState);
    }
  }, [id, mode]);

  // Manipulador genérico de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.nome.trim() || !formData.descricao.trim()) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      setLoading(true);
      if (mode === 'edit') {
        // Envia o objeto para o Controller @PutMapping("/{id}")
        await categoriaService.atualizar(id, formData);
        alert('Categoria atualizada com sucesso!');
      } else {
        // Envia o objeto para o Controller @PostMapping
        await categoriaService.criar(formData);
        alert('Categoria criada com sucesso!');
      }
      onSaveComplete(); // Avisa o AdminPage para voltar para a lista e recarregar
    } catch (err) {
      //Captura erros de validação do Spring (@Valid) ou erro de servidor
      if (err.response && err.response.data && err.response.data.message) {
          setError(`Erro do servidor: ${err.response.data.message}`);
      } else {
          setError('Ocorreu um erro ao salvar a categoria. Verifique se o back-end está rodando.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && mode === 'edit') return <div>Carregando dados da categoria...</div>;

  // Estilos simples combinando com a vibe "bordas grossas" do desenho
  const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' };
  const inputStyle = { padding: '10px', border: '2px solid black', borderRadius: '5px' };
  const buttonGroupStyle = { display: 'flex', gap: '10px', marginTop: '20px' };
  const primaryButtonStyle = { ...inputStyle, background: '#e0e0e0', cursor: 'pointer', fontWeight: 'bold' };

  return (
    <div>
      <h3>{mode === 'edit' ? `Editando ID: ${id}` : 'Adicionar Nova Categoria'}</h3>
      
      {error && <div style={{color: 'red', border: '2px solid red', padding: '10px', marginBottom: '15px'}}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label htmlFor="nome" style={{display:'block', marginBottom: '5px'}}>Nome:</label>
          <input
            id="nome"
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Ex: Eletrônicos"
            style={inputStyle}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="descricao" style={{display:'block', marginBottom: '5px'}}>Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
            placeholder="Descrição curta da categoria..."
            style={{...inputStyle, height: '100px'}}
            disabled={loading}
          />
        </div>

        <div style={buttonGroupStyle}>
          <button type="submit" style={primaryButtonStyle} disabled={loading}>
            {loading ? 'Salvando...' : (mode === 'edit' ? 'Salvar Alterações' : 'Adicionar')}
          </button>
          <button type="button" onClick={onCancel} style={{...inputStyle, background: 'white', cursor: 'pointer'}} disabled={loading}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;