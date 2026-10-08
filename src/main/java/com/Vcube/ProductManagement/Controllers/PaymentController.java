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

import com.Vcube.ProductManagement.Entity.Payment;
import com.Vcube.ProductManagement.Service.PaymentService;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
public class PaymentController {
	
	@Autowired
	PaymentService paymentService;
	@GetMapping("/getPaymentList")
	public List<Payment> getAllPayments(){
		return paymentService.getAllPayments();
	}
	
	@GetMapping("/getPayment/{paymentId}")
	public Payment getPaymentById(@PathVariable Integer paymentId) {
		return paymentService.getPaymentById(paymentId);
	}
	
	@PostMapping("/createPayment")
	public Payment createPayment(@RequestBody Payment payment) {
		return paymentService.createPayment(payment);
	}
	
	
	@PutMapping("/updatePayment/{paymentId}")
	public Payment updatePayment(@PathVariable Integer paymentId,@RequestBody Payment payment) {
		return paymentService.updatePayment(paymentId, payment);
	}
	
	@DeleteMapping("/deletePayment/{paymentId}")
	public String deletePayment(@PathVariable Integer paymentId) {
		return paymentService.deletePayment(paymentId);
	}
}
