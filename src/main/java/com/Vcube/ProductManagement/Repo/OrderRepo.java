package com.Vcube.ProductManagement.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Vcube.ProductManagement.Entity.Order;

public interface OrderRepo extends JpaRepository<Order, Integer>{

}
