package com.Vcube.ProductManagement.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Vcube.ProductManagement.Entity.Order;
import com.Vcube.ProductManagement.Service.OrderService;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
public class OrderController {
	@Autowired
	OrderService orderService;
	@GetMapping("/getOrderList")
	public List<Order> getAllOrders(){
		return orderService.getAllOrders();
	}
	
	@GetMapping("/getOrder/{orderId}")
	public Order getOrderById(@PathVariable Integer orderId) {
		return orderService.getOrderById(orderId);
	}
	
	@PostMapping("/createOrder")
	public Order createProduct(@RequestBody Order order) {
		return orderService.createOrder(order);
	}
	
	
	@PutMapping("/updateOrder/{id}")
	public Order updateOrder(@PathVariable int id,@RequestBody Order order) {
		return orderService.updateOrder(id, order);
	}
	
	@DeleteMapping("/deleteOrder/{orderId}")
	public String deleteOrder(@PathVariable Integer orderId) {
		return orderService.deleteOrder(orderId);
	}

}
