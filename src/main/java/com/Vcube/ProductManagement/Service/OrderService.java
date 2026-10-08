package com.Vcube.ProductManagement.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Vcube.ProductManagement.Entity.Order;
import com.Vcube.ProductManagement.Repo.OrderRepo;

@Service
public class OrderService {
	@Autowired
	OrderRepo orderRepo;
	public List<Order>getAllOrders(){
		return orderRepo.findAll();
	}
	public Order getOrderById(int orderId) {
		return orderRepo.findById(orderId).orElse(null);
	}
	public Order updateOrder(Integer orderId, Order order) {
		Order orderFromDb = getOrderById(orderId);
		
		orderFromDb.setCustomerId(order.getCustomerId());
		orderFromDb.setPid(order.getPid());
		orderFromDb.setQuantity(order.getQuantity());
		orderFromDb.setTotalAmount(order.getTotalAmount());
		
		return orderRepo.save(orderFromDb);
	}
    
    public Order createOrder(Order order){
		return orderRepo.save(order);	
	}
    
    public String deleteOrder(Integer orderId){
    	orderRepo.deleteById(orderId);
		return "Order has been deleted succuessfully !!" + orderId;
	}
}
