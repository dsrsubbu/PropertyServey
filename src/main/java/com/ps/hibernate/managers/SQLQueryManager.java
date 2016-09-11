package com.ps.hibernate.managers;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.ps.hibernate.common.HibernateDao;

@Repository
public class SQLQueryManager
{
    @SuppressWarnings("unused")
    private static final Log LOG = LogFactory.getLog(SQLQueryManager.class);

    @Autowired
    @Qualifier("hibernateDao")
    protected HibernateDao hibernateDao;

    @SuppressWarnings("unchecked")
    public List<String> getNamesByIds(String tableName, String ids)
    {
        return hibernateDao.findByNativeSql("select name from " + tableName + " where id in (" + ids +")", "name");
    }


}
