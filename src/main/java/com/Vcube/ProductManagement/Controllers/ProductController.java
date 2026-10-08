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

import com.Vcube.ProductManagement.Entity.Product;
import com.Vcube.ProductManagement.Service.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
public class ProductController{
	@Autowired
	ProductService productService;
	@GetMapping("/getProductList")
	public List<Product> getAllProducts(){
		return productService.getAllProducts();
	}
	
	@GetMapping("/getProduct/{pid}")
	public Product getProductById(@PathVariable Integer pid) {
		return productService.getProductById(pid);
	}
	
	@PostMapping("/createProduct")
	public Product createProduct(@RequestBody Product product) {
		return productService.createProduct(product);
	}
	
	
	@PutMapping("/updateProduct/{id}")
	public Product updateProduct(@PathVariable int id,@RequestBody Product product) {
		return productService.updateProduct(id, product);
	}
	
	@DeleteMapping("/deleteProduct/{pid}")
	public String deleteProduct(@PathVariable Integer pid) {
		return productService.deleteProduct(pid);
	}
	
}
