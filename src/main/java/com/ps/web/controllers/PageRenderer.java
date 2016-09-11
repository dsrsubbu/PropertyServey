package com.ps.web.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PageRenderer
{
    @SuppressWarnings("unused")
    private static final Log LOG = LogFactory.getLog(PageRenderer.class);
    
    
    @RequestMapping("/pageRenderer")
    public ModelAndView getView(HttpServletRequest request, HttpServletResponse response)
    {
        ModelAndView modelAndView = new ModelAndView("Page");
        return modelAndView;
    }
}
