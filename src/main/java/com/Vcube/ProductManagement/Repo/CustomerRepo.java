package com.Vcube.ProductManagement.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Vcube.ProductManagement.Entity.Customer;

public interface CustomerRepo extends JpaRepository<Customer, Integer>{

}
