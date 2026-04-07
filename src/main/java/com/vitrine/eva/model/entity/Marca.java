package com.vitrine.eva.model.entity;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "marca")
public class Marca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(columnDefinition = "TEXT")
    private String logoUrl;

    @OneToMany(
        mappedBy = "marca",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @JsonIgnore
    private List<Brinquedo> brinquedos = new ArrayList<>();

    public Marca() {}

    public Marca(Long id, String nome, String logoUrl) {
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

    public List<Brinquedo> getBrinquedos() {
        return brinquedos;
    }

    public void setBrinquedos(List<Brinquedo> brinquedos) {
        this.brinquedos = brinquedos;
    }
}