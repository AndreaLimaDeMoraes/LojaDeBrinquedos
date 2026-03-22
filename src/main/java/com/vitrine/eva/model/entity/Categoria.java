package com.vitrine.eva.model.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table (name = "categoria")
public class Categoria {
	
	//atributos
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String descricao;
	
	@OneToMany(
			mappedBy = "categoria",
			cascade = CascadeType.ALL,
			orphanRemoval = true		
	)
	@JsonIgnore
		private List<Brinquedo> brinquedos = new ArrayList<>();
	
	
	//construtores
	public Categoria() {}
	
	public Categoria(Long id, String nome, String desc) {
		this.id = id;
		this.nome = nome;
		this.descricao = desc;
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

	public void setDescricao(String desc) {
		this.descricao = desc;
	}
		
	
}
