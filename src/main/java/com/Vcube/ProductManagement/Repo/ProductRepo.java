package com.Vcube.ProductManagement.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Vcube.ProductManagement.Entity.Product;

public interface ProductRepo extends JpaRepository<Product, Integer>{

}
