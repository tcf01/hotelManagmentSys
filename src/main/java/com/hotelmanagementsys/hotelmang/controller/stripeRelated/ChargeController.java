package com.hotelmanagementsys.hotelmang.controller.stripeRelated;

import com.hotelmanagementsys.hotelmang.entity.ChargeRequest;
import com.hotelmanagementsys.hotelmang.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class ChargeController {

	@Autowired
	private StripeService paymentsService;

	@PostMapping("/charge")
	public String charge(ChargeRequest chargeRequest, Model model)
			throws StripeException {
		System.out.println("is it here?");
		chargeRequest.setDescription("Example charge");
		chargeRequest.setCurrency(ChargeRequest.Currency.HKD);
		Charge charge = paymentsService.charge(chargeRequest);
		model.addAttribute("id", charge.getId());
		model.addAttribute("status", charge.getStatus());
		model.addAttribute("chargeId", charge.getId());
		model.addAttribute("balance_transaction", charge.getBalanceTransaction());
		return "result";
	}

	@ExceptionHandler(StripeException.class)
	public String handleError(Model model, StripeException ex) {
		model.addAttribute("error", ex.getMessage());
		return "result";
	}
}
