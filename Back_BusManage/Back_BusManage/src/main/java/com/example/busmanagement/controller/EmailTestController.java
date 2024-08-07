package com.example.busmanagement.controller;


import com.example.busmanagement.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController
public class EmailTestController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/send-test-email")
    public String sendTestEmail(@RequestParam String to, @RequestParam String subject, @RequestParam String text) {
        try {
            emailService.sendEmail(to, subject, text);
            return "Email sent successfully";
        } catch (MessagingException e) {
            e.printStackTrace();
            return "Error sending email: " + e.getMessage();
        }
    }
}
