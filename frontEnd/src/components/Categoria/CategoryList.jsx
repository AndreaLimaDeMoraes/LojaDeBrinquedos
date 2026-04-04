import React, { useEffect, useState } from 'react';
import categoriaService from '../../services/categoriaService';
import './Admin.css';

const CategoryList = ({ onAdd, onEdit }) => {
  // --- ESTADOS ---
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteMode, setIsDeleteMode] = useState(false); // Ativa os checkboxes
  const [selectedIds, setSelectedIds] = useState([]); // Guarda os IDs marcados
  const [isDeletingBulk, setIsDeletingBulk] = useState(false); // Loading do botão

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    const res = await categoriaService.listar();
    setCategorias(res.data);
  };

  // Função para marcar/desmarcar checkboxes
  const handleCheckboxChange = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // --- LOGICA DE EXCLUSÃO (Corrigida dentro do componente) ---
  const performDeletion = async (type) => {
    // Se for 'selected', usa os marcados. Se for 'all', pega todos da lista.
    let idsToDelete = type === 'selected' ? selectedIds : categorias.map(c => c.id);
    
    const msg = type === 'selected' 
      ? `Deseja excluir os ${selectedIds.length} itens selecionados?` 
      : "Deseja excluir TODOS os itens?";

    if (window.confirm(msg)) {
      try {
        setIsDeletingBulk(true);
        // Chama o novo método do seu backend que recebe a List<Long>
        await categoriaService.excluirMuitos(idsToDelete); 
        
        alert('Excluído com sucesso!');
        setIsDeleteMode(false);
        setSelectedIds([]);
        loadCategorias(); // Recarrega a lista do banco
      } catch (err) {
        console.error("Erro ao excluir", err);
        alert("Erro ao excluir itens.");
      } finally {
        setIsDeletingBulk(false);
      }
    }
  };

  return (
    <div className="border-2 border-black p-4 bg-white">
      {/* Barra de Pesquisa e Filtro */}
      <div className="flex gap-4 mb-4 pb-2 border-b border-gray-300">
        <input 
          className="border border-black p-2 flex-1 rounded"
          placeholder="Buscar categoria..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="border border-black p-2 rounded bg-gray-50">
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
      </div>

      {/* Lista de Correspondências */}
      <div className="h-64 overflow-y-auto border border-gray-400 p-2 mb-4 bg-gray-50">
        {categorias
          .filter(c => c.nome.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(cat => (
            <div 
              key={cat.id} 
              className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
            >
              {isDeleteMode && (
                <input 
                  type="checkbox" 
                  className="mr-4 w-5 h-5 cursor-pointer"
                  checked={selectedIds.includes(cat.id)}
                  onChange={() => handleCheckboxChange(cat.id)}
                />
              )}
              <span className="flex-1 font-medium" onClick={() => !isDeleteMode && onEdit(cat.id)}>
                {cat.nome}
              </span>
            </div>
          ))}
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-4 justify-end border-t border-gray-300 pt-4">
        {!isDeleteMode ? (
          <>
            <button 
              onClick={() => setIsDeleteMode(true)}
              className="border-2 border-black px-4 py-2 bg-red-100 hover:bg-red-200 font-bold rounded"
            >
              Excluir
            </button>
            <button 
              onClick={onAdd}
              className="border-2 border-black px-4 py-2 bg-gray-200 hover:bg-gray-300 font-bold rounded"
            >
              Adicionar
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => { setIsDeleteMode(false); setSelectedIds([]); }}
              className="border-2 border-black px-4 py-2 bg-white hover:bg-gray-100 font-bold rounded"
            >
              Cancelar
            </button>
            
            {/* Botão que SOBREPÕE o adicionar */}
            <button 
              onClick={() => performDeletion(selectedIds.length > 0 ? 'selected' : 'all')}
              className="border-2 border-black px-4 py-2 bg-red-600 text-white hover:bg-red-700 font-bold rounded"
              disabled={isDeletingBulk}
            >
              {isDeletingBulk ? 'Excluindo...' : (selectedIds.length > 0 ? 'Excluir Selecionados' : 'Excluir Todos')}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryList;  