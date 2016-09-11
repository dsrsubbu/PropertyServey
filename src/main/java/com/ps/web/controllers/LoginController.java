package com.ps.web.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController
{
    @RequestMapping("/login")
    public ModelAndView getView(@RequestParam(value = "code", required = false) String code, HttpServletRequest request)
    {
        if ("0".equals(code))
        {
            request.setAttribute("message", " You successfully logged out");
        }
        else if ("1".equals(code))
        {
            request.setAttribute("message", " The username or password is invalid");
        }
        else if ("2".equals(code))
        {
            request.setAttribute("message", " The User is blocked");
        }
        else if ("3".equals(code))
        {
            request.setAttribute("message", " Session Unavailable");
        }
        return new ModelAndView("login1");
    }
}
