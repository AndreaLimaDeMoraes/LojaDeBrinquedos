package com.vitrine.eva.dto;

public class MarcaDTO {

    private Long id;
    private String nome;
    private String logoUrl;

    public MarcaDTO() {}

    public MarcaDTO(Long id, String nome, String logoUrl) {
        this.id = id;
        this.nome = nome;
        this.logoUrl = logoUrl;
    }

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

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }
}