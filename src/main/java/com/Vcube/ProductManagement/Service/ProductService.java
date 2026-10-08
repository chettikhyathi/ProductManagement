package com.Vcube.ProductManagement.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Vcube.ProductManagement.Entity.Product;
import com.Vcube.ProductManagement.Repo.ProductRepo;

@Service
public class ProductService {
	
	@Autowired
	ProductRepo productRepo;
	
	public List<Product> getAllProducts(){
		return productRepo.findAll();
	}
	public Product getProductById(int pid) {
		return productRepo.findById(pid).orElse(null);
	}
	public Product updateProduct(Integer pid, Product product) {
		Product productFromDb = getProductById(pid);
		
		productFromDb.setProductName(product.getProductName());
		productFromDb.setPrice(product.getPrice());
		productFromDb.setQuantity(product.getQuantity());
		
		return productRepo.save(productFromDb);
	}
    
    public Product createProduct(Product product){
		return productRepo.save(product);	
	}
    
    public String deleteProduct(Integer pid){
    	productRepo.deleteById(pid);
		return "Product has been deleted succuessfully !!" + pid;
	}
}


