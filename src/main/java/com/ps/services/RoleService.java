package com.ps.services;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ps.common.components.ComboComponent;
import com.ps.hibernate.managers.RoleManager;
import com.ps.hibernate.models.Role;


@Service
public class RoleService implements ComboComponent
{
    private static final Log LOG = LogFactory.getLog(RoleService.class);
    @Autowired
    private RoleManager roleManager;

    @Override
    public List<Role> getData4Combo(String... extraParams)
    {
        try
        {
            return roleManager.loadAll();
        }
        catch (Exception e)
        {
            LOG.info(e.getCause(), e);
            return null;
        }
    }

}
