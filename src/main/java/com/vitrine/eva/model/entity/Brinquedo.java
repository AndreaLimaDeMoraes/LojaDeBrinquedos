package com.vitrine.eva.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column; // - mapeia para o nome exato da coluna
import jakarta.persistence.Lob; //  para campos grandes como imagens
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ElementCollection; 

@Entity
@Table (name = "brinquedo")
public class Brinquedo {
	
	//atributos
	
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  // Column nomeBrinquedos
  @Column(name="nome_brinquedo", nullable=false)
  private String nomeBrinquedo;

  // imagens
  @ElementCollection
  private List<String> imagens; // para mais de uma imagem ...
	
  @Column(name = "descricao", length = 1000)
  private String descricao;
  
  @Column(name = "valor", nullable = false)
  private BigDecimal valor;

  @Column(name = "fornecedor")
  private String fornecedor;

  // @Column(name = "logs_edicao_criacao")
  // private String logsEdicaoCriacao; // >>>>>>>>>>> Implementar ser sobrar tempo ...
  
  @Column(name = "idade_recomendada")
  private String idadeRecomendada;

  @Column(name = "quantidade_estoque")
  private Integer quantidadeEstoque;

  @Column(name = "desconto")
  private Double desconto; // verificar se não é melhor fazer desconto ser boolean

   @Column(name = "data_cadastro")
  private LocalDateTime dataCadastro;
	
   @ManyToOne
   @JoinColumn (name = "categoria_id")
   private Categoria categoria;
   
   @ManyToOne
   @JoinColumn(name = "marca_id")
   private Marca marca;

	

	//construtores
	public Brinquedo() {}
	
	

	public Brinquedo(Long id, String nomeBrinquedo, List<String> imagens, String descricao, BigDecimal valor,
			String fornecedor, String idadeRecomendada, Integer quantidadeEstoque, Double desconto,
			LocalDateTime dataCadastro, Categoria categoria, Marca marca) {
		super();
		this.id = id;
		this.nomeBrinquedo = nomeBrinquedo;
		this.imagens = imagens;
		this.descricao = descricao;
		this.valor = valor;
		this.fornecedor = fornecedor;
		this.idadeRecomendada = idadeRecomendada;
		this.quantidadeEstoque = quantidadeEstoque;
		this.desconto = desconto;
		this.dataCadastro = dataCadastro;
		this.categoria = categoria;
		this.marca = marca;
	}



	//getters e setters
	
	public Marca getMarca() {
		return marca;
	}

   public void setMarca(Marca marca) {
	   this.marca = marca;
   }
	
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNomeBrinquedo() {
        return nomeBrinquedo;
    }
    
    public void setNomeBrinquedo(String nomeBrinquedo) {
        this.nomeBrinquedo = nomeBrinquedo;
    }
    
    public List<String> getImagens() {
        return imagens;
    }

    public void setImagens(List<String> imagens) {
        this.imagens = imagens;
    }
    
    public BigDecimal getValor() {
        return valor;
    }
    
    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
    
    public String getDescricao() {
        return descricao;
    }
    
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    
    public Categoria getCategoria() {
        return categoria;
    }
    
    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
    
    public String getFornecedor() {
        return fornecedor;
    }
    
    public void setFornecedor(String fornecedor) {
        this.fornecedor = fornecedor;
    }
    
    //public String getLogsEdicaoCriacao() {
     //   return logsEdicaoCriacao;
   // }
    
    //public void setLogsEdicaoCriacao(String logsEdicaoCriacao) {
      //  this.logsEdicaoCriacao = logsEdicaoCriacao;
    //}
    
    public String getIdadeRecomendada() {
        return idadeRecomendada;
    }
    
    public void setIdadeRecomendada(String idadeRecomendada) {
        this.idadeRecomendada = idadeRecomendada;
    }
    
    public Integer getQuantidadeEstoque() {
        return quantidadeEstoque;
    }
    
    public void setQuantidadeEstoque(Integer quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }
    
    public Double getDesconto() {
        return desconto;
    }
    
    public void setDesconto(Double desconto) {
        this.desconto = desconto;
    }
    
    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }
    
    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }
		
	
}