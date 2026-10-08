package com.Vcube.ProductManagement.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Vcube.ProductManagement.Entity.Payment;
import com.Vcube.ProductManagement.Repo.PaymentRepo;

@Service
public class PaymentService {
	@Autowired
	PaymentRepo paymentRepo;
	public List<Payment>getAllPayments(){
		return paymentRepo.findAll();
	}
	public Payment getPaymentById(int paymentId) {
		return paymentRepo.findById(paymentId).orElse(null);
	}
	public Payment updatePayment(Integer paymentId, Payment payment) {
		Payment paymentFromDb = getPaymentById(paymentId);
		
		paymentFromDb.setOrderId(payment.getOrderId());
		paymentFromDb.setAmount(payment.getAmount());
		paymentFromDb.setPaymentStatus(payment.getPaymentStatus());
		
		return paymentRepo.save(paymentFromDb);
	}
    
    public Payment createPayment(Payment payment){
		return paymentRepo.save(payment);	
	}
    
    public String deletePayment(Integer paymentId){
    	paymentRepo.deleteById(paymentId);
		return "Payment has been deleted succuessfully !!" + paymentId;
	}
}
