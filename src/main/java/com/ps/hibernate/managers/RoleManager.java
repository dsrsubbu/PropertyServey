package com.ps.hibernate.managers;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

import com.ps.hibernate.common.GenericManager;
import com.ps.hibernate.models.Role;

@Repository
public class RoleManager extends GenericManager<Role, Long>
{
    @SuppressWarnings("unused")
    private static final Log LOG = LogFactory.getLog(RoleManager.class);

    public RoleManager()
    {
        super(Role.class);
    }

	@SuppressWarnings("unchecked")
	public List<Role> loadByParivarId(long parivarId) 
	{
		return  find("from Role where 1=1");
	}

}
