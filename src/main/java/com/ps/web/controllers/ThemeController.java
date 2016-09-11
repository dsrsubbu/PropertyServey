package com.ps.web.controllers;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import freemarker.template.Configuration;
import freemarker.template.Template;

@RestController
@RequestMapping("/theme")
public class ThemeController
{
    private static final Log LOG = LogFactory.getLog(ThemeController.class);

    @Autowired
    private Configuration configuration;

    @Autowired
    private Properties appConfig;

    @RequestMapping(value = "/{type}", method = RequestMethod.GET)
    public String getView(HttpServletRequest request, HttpServletResponse response, @PathVariable("type") String type) throws IOException
    {
        try
        {
            response.setContentType("text/css");
            PrintWriter out = response.getWriter();
            String theme = "";

            if ("default".equalsIgnoreCase(type))
            {
                theme = appConfig.getProperty("THEME_API_OVERRIDE");
            }
            else
            {
                theme = appConfig.getProperty("THEME_CUSTOM");
            }

            if (theme != null && !"".equals(theme))
            {
                if ("default".equalsIgnoreCase(type))
                {
                    out.write(getOverrideCss(theme));
                }
                else
                {
                    out.write(getCustomCss(theme));
                }
            }
            else
            {
                out.write("");
            }

            return null;
        }
        catch (Exception e)
        {
            LOG.error(e.getCause(), e);
            return null;
        }
    }

    public String getOverrideCss(String theme)
    {
        try
        {
            Map<String, String> map = new HashMap<String, String>();
            map.put("windowHeader", "#" + appConfig.getProperty(theme + "_windowHeader"));
            map.put("panelHeader", "#" + appConfig.getProperty(theme + "_panelHeader"));
            map.put("bgColor", "#" + appConfig.getProperty(theme + "_bgColor"));
            map.put("btnBgColor", "#" + appConfig.getProperty(theme + "_btnBgColor"));
            map.put("btnFontColor", "#" + appConfig.getProperty(theme + "_btnFontColor"));
            Template template = configuration.getTemplate("theme/apiOverride.ftl");
            return FreeMarkerTemplateUtils.processTemplateIntoString(template, map);
        }
        catch (Exception e)
        {
            LOG.error(e.getCause(), e);
            return null;
        }
    }

    public String getCustomCss(String theme)
    {
        try
        {
            Map<String, String> map = new HashMap<String, String>();
            map.put("windowHeader", "#" + appConfig.getProperty(theme + "_windowHeader"));
            map.put("panelHeader", "#" + appConfig.getProperty(theme + "_panelHeader"));
            map.put("bgColor", "#" + appConfig.getProperty(theme + "_bgColor"));
            map.put("btnBgColor", "#" + appConfig.getProperty(theme + "_btnBgColor"));
            map.put("btnFontColor", "#" + appConfig.getProperty(theme + "_btnFontColor"));
            Template template = configuration.getTemplate("theme/customComponents.ftl");
            return FreeMarkerTemplateUtils.processTemplateIntoString(template, map);
        }
        catch (Exception e)
        {
            LOG.error(e.getCause(), e);
            return null;
        }
    }

}
