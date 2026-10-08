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
import com.Vcube.ProductManagement.Entity.Customer;
import com.Vcube.ProductManagement.Service.CustomerService;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
public class CustomerController {
	
	@Autowired
	CustomerService customerService;
	@GetMapping("/getCustomerList")
	public List<Customer> getAllCustomers(){
		return customerService.getAllCustomers();
	}
	
	@GetMapping("/getCustomer/{customerId}")
	public Customer getCustomerById(@PathVariable Integer customerId) {
		return customerService.getCustomerById(customerId);
	}
	
	@PostMapping("/createCustomer")
	public Customer createCustomer(@RequestBody Customer customer) {
		return customerService.createCustomer(customer);
	}
	
	
	@PutMapping("/updateCustomer/{customerId}")
	public Customer updateCustomer(@PathVariable ("customerId") int customerId,@RequestBody Customer customer) {
		return customerService.updateCustomer(customerId, customer);
	}
	
	@DeleteMapping("/deletecustomer/{customerId}")
	public String deleteCustomer(@PathVariable Integer customerId) {
		return customerService.deleteCustomer(customerId);
	}
}
