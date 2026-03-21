package com.vitrine.eva.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

public class CategoriaDTO {
		//atributos
		private Long id;
		
		@NotBlank(message = "O Nome não pode ser vazio")
		private String nome;
		
		@NotBlank(message = "A descrição não pode ser vazio")
		private String descricao;
		
		
		//construtores
		public CategoriaDTO() {}
		
		public CategoriaDTO(Long id, String nome, String descricao) {
			this.id = id;
			this.nome = nome;
			this.descricao = descricao;
		}

		//getters e setters

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getNome() {
			return nome;
		}

		public void setNome(String nome) {
			this.nome = nome;
		}

		public String getDescricao() {
			return descricao;
		}

		public void setDescricao(String descricao) {
			this.descricao = descricao;
		}
}