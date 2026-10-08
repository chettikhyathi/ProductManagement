package com.Vcube.ProductManagement.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Vcube.ProductManagement.Entity.Customer;
import com.Vcube.ProductManagement.Repo.CustomerRepo;

@Service
public class CustomerService {
	
	@Autowired
	CustomerRepo customerRepo;
	public List<Customer>getAllCustomers(){
		return customerRepo.findAll();
	}
	public Customer getCustomerById(int customerId) {
		return customerRepo.findById(customerId).orElse(null);
	}
	public Customer updateCustomer(Integer customerId, Customer customer) {
		Customer customerFromDb = getCustomerById(customerId);
		
		customerFromDb.setCustomerName(customer.getCustomerName());
		customerFromDb.setEmail(customer.getEmail());
		customerFromDb.setPhone(customer.getPhone());
		
		return customerRepo.save(customerFromDb);
	}
    
    public Customer createCustomer(Customer customer){
		return customerRepo.save(customer);	
	}
    
    public String deleteCustomer(Integer customerId){
    	customerRepo.deleteById(customerId);
		return "Customer has been deleted succuessfully !!" + customerId;
	}
}
