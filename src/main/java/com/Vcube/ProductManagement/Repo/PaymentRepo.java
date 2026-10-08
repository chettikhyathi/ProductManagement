package com.Vcube.ProductManagement.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Vcube.ProductManagement.Entity.Payment;

public interface PaymentRepo extends JpaRepository<Payment, Integer>{

}
