package com.vitrine.eva.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class BrinquedoDTO {
    
    private Long id;
    private String nomeBrinquedo;
    private List<String> imagens;
    private String descricao;
    private BigDecimal valor;
    private String categoria;
    private String fornecedor;
    private String idadeRecomendada;
    private Integer quantidadeEstoque;
    private Double desconto;
    private LocalDateTime dataCadastro;
    
    // Construtor vazio
    public BrinquedoDTO() {}
    
    // Construtor com parâmetros
    public BrinquedoDTO(Long id, String nomeBrinquedo, String descricao, BigDecimal valor, 
                        String categoria, Integer quantidadeEstoque) {
        this.id = id;
        this.nomeBrinquedo = nomeBrinquedo;
        this.descricao = descricao;
        this.valor = valor;
        this.categoria = categoria;
        this.quantidadeEstoque = quantidadeEstoque;
    }
    
    // Getters e Setters
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
    
    public String getDescricao() {
        return descricao;
    }
    
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    
    public BigDecimal getValor() {
        return valor;
    }
    
    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
    
    public String getCategoria() {
        return categoria;
    }
    
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
    
    public String getFornecedor() {
        return fornecedor;
    }
    
    public void setFornecedor(String fornecedor) {
        this.fornecedor = fornecedor;
    }
    
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