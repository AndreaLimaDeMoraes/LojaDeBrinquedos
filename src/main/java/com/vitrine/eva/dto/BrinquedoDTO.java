package com.vitrine.eva.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.vitrine.eva.model.entity.Categoria;
import com.vitrine.eva.model.entity.Marca;

public class BrinquedoDTO {
    
    private Long id;
    private String nomeBrinquedo;
    private List<String> imagens;
    private String descricao;
    private BigDecimal valor;
    private Categoria categoria;
    private Marca marca;

    private String fornecedor;
    private String idadeRecomendada;
    private Integer quantidadeEstoque;
    private Double desconto;
    private LocalDateTime dataCadastro;

    //NOVOS CAMPOS: 05/04
    private Boolean destacar;
    private String dtCriacao;

    // Construtor vazio
    public BrinquedoDTO() {}

    // Construtor COMPLETO com os novos campos
    public BrinquedoDTO(Long id, String nomeBrinquedo, String descricao, BigDecimal valor, 
                        Categoria categoria, Marca marca, Integer quantidadeEstoque,
                        Boolean destacar, String dtCriacao) {
        this.id = id;
        this.nomeBrinquedo = nomeBrinquedo;
        this.descricao = descricao;
        this.marca = marca;
        this.valor = valor;
        this.categoria = categoria;
        this.quantidadeEstoque = quantidadeEstoque;
        
        // NOVOS CAMPOS
        this.destacar = destacar;
        this.dtCriacao = dtCriacao;
    }

    // GETTERS E SETTERS

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

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Marca getMarca() {
        return marca;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
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

    // NOVOS CAMPOS 
    public Boolean getDestacar() {
        return destacar;
    }

    public void setDestacar(Boolean destacar) {
        this.destacar = destacar;
    }

    public String getDtCriacao() {
        return dtCriacao;
    }

    public void setDtCriacao(String dtCriacao) {
        this.dtCriacao = dtCriacao;
    }
}