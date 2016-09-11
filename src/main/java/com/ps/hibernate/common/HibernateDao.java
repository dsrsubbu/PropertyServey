package com.ps.hibernate.common;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.StringType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

@SuppressWarnings("rawtypes")
@Component("hibernateDao")
public class HibernateDao implements IDao
{

    private SessionFactory sessionFactory;

    @Autowired
    public void setSessionFactory(SessionFactory sessionFactory)
    {
        this.sessionFactory = sessionFactory;
    }

    public Session getSession()
    {
        return sessionFactory.getCurrentSession();
    }

    private static final Log LOG = LogFactory.getLog(HibernateDao.class);

    public void delete(Object entity) throws DataAccessException
    {
        getSession().delete(entity);
    }

    public void deleteAll(Collection<? extends BaseEntity> entities) throws DataAccessException
    {
        for (BaseEntity entity : entities)
            getSession().delete(entity);
    }

    public Object load(Class type, Serializable classId) throws DataAccessException
    {
        return getSession().load(type, classId);
    }

    public List loadAll(Class entityClassName) throws DataAccessException
    {
        Criteria criteria = getSession().createCriteria(entityClassName);
        criteria.setCacheable(true);
        return criteria.list();
    }

    public void saveOrUpdate(Object entity) throws DataAccessException
    {
        getSession().saveOrUpdate(entity);
    }

    public void saveOrUpdateAll(Collection<? extends Object> entities) throws DataAccessException
    {
        for (Object entity : entities)
            getSession().saveOrUpdate(entity);
    }

    public void flush()
    {
        getSession().flush();
    }

    public void clear()
    {
        getSession().clear();
    }

    public void merge(Object object) throws DataAccessException
    {
        getSession().merge(object);
    }

    public void refresh(Object object)
    {
        getSession().refresh(object);
    }

    public Object get(Class type, Serializable classId)
    {
        return getSession().get(type, classId);
    }

    public List findByNativeSql(String sql, Class entityClassName)
    {
        Session session = getSession();
        Query query = session.createSQLQuery(sql).addEntity(entityClassName);
        return query.list();
    }

    public List findByNativeSql(String sql, String cloumnName)
    {
        Session session = getSession();
        Query query = session.createSQLQuery(sql).addScalar(cloumnName, StringType.INSTANCE);
        return query.list();
    }

    public List findBySql(String sql)
    {
        Session session = getSession();
        Query query = session.createSQLQuery(sql);
        return query.list();
    }

    public Object getCount(String sql)
    {
        try
        {
            Session session = getSession();
            Query query = session.createQuery(sql);
            List list = query.list();

            return list.size() > 0 ? list.get(0) : null;
        }
        catch (DataAccessException e)
        {
            LOG.error(e.getMessage(), e);
            return null;
        }
    }

    public Object getMaxValue(String sql)
    {
        try
        {
            Session session = getSession();
            Query query = session.createQuery(sql);
            List list = query.list();

            return list.get(0);
        }
        catch (DataAccessException e)
        {
            LOG.error(e.getMessage(), e);
            return null;
        }
    }

    public List findByStartAndEndIndex(String sql, int startIndex, int endIndex) throws DataAccessException
    {
        Session session = getSession();
        Query query = session.createQuery(sql);
        query.setFirstResult(Integer.valueOf(startIndex));
        query.setMaxResults(Integer.valueOf(endIndex));
        return query.list();
    }

    public Object getColumnValue(String sql)
    {
        try
        {
            Session session = getSession();
            Query query = session.createQuery(sql);
            List list = query.list();
            if (list != null && list.size() > 0)
            {
                return list.get(0);
            }
            else
            {
                return null;
            }

        }
        catch (DataAccessException e)
        {
            LOG.error(e.getMessage(), e);
            return null;
        }
    }

    public List findByNativeSqlByStartAndLimit(String sql, Class entityClassName, String start, String limit)
    {
        try
        {
            Session session = getSession();
            Query query = session.createSQLQuery(sql).addEntity(entityClassName);
            query.setFirstResult(Integer.valueOf(start));
            query.setMaxResults(Integer.valueOf(limit));
            return query.list();
        }
        catch (Exception e)
        {
            LOG.error(e.getMessage(), e);
        }
        return null;
    }

    public List find(String queryString, Object... values) throws DataAccessException
    {
        Query queryObject = getSession().createQuery(queryString);
        queryObject.setCacheable(true);
        if (values != null)
        {
            for (int i = 0; i < values.length; i++)
            {
                queryObject.setParameter(i, values[i]);
            }
        }
        return queryObject.list();
    }

    public Object findObject(String queryString, Object... values) throws DataAccessException
    {
        Query queryObject = getSession().createQuery(queryString);
        queryObject.setCacheable(true);
        if (values != null)
        {
            for (int i = 0; i < values.length; i++)
            {
                queryObject.setParameter(i, values[i]);
            }
        }
        return queryObject.list().size() > 0 ? queryObject.list().get(0) : null;
    }

    public List findByFilter(String sql, String start, String limit)
    {
        Query query = getSession().createQuery(sql);

        query.setFirstResult(Integer.parseInt(start));
        query.setMaxResults(Integer.parseInt(limit));
        List labels = query.list();
        return labels;
    }

    public void executeSqlQuery(String sql)
    {
        Session session = null;
        try
        {
            session = getSession();
            Query query = session.createSQLQuery(sql);
            query.executeUpdate();
        }
        catch (HibernateException e)
        {
            LOG.error(e.getMessage(), e);
        }
    }

    /**********************************************************************************
     * Wrote this method to handle the transactions which have not gone through the OpenSessionInViewFilter For Example : In case of caching the user logout time Destroyed event
     * which gets triggered with in the Servlet Container and during such events - OpenSessionInViewFilter wont be involved. So, we are creating the session object manually.
     **********************************************************************************/
    public void openSessionAndExecuteQuery(String sql)
    {
        Session session = sessionFactory.openSession();
        Query query = session.createQuery(sql);
        query.executeUpdate();
        session.close();
    }

    public int executeNativeQuery(String sql)
    {
        Session session = getSession();
        Query query = session.createSQLQuery(sql);
        return query.executeUpdate();
    }

    @Override
    public Object getCountByNativeSQL(String sql)
    {
        try
        {
            Session session = getSession();
            return ((Number) session.createSQLQuery(sql).uniqueResult()).longValue();
        }
        catch (DataAccessException e)
        {
            LOG.error(e.getMessage(), e);
            return null;
        }
    }

    @Override
    public void evict(Object entity)
    {
        getSession().evict(entity);
    }

    /**
     * Criteria queries Added by suman
     **/

    public Object getCountByCriteria(Class entityClassName)
    {
        Criteria criteriaQuery = getSession().createCriteria(entityClassName);
        criteriaQuery.setProjection(Projections.rowCount());
        List rowCount = criteriaQuery.list();

        return rowCount != null && rowCount.size() > 0 ? rowCount.get(0) : null;
    }

    public Object getSumByCriteria(Class entityClassName, String columnName)
    {
        Criteria criteriaQuery = getSession().createCriteria(entityClassName);
        criteriaQuery.setProjection(Projections.sum(columnName));
        List sum = criteriaQuery.list();
        return sum != null && sum.size() > 0 ? sum.get(0) : null;
    }

    public Object getMaxValueByCriteria(Class entityClassName, String columnName)
    {
        Criteria criteriaQuery = getSession().createCriteria(entityClassName);
        criteriaQuery.setProjection(Projections.max(columnName));
        List maxList = criteriaQuery.list();
        return maxList != null && maxList.size() > 0 ? maxList.get(0) : null;
    }

    public Object getMinValueByCriteria(Class entityClassName, String columnName)
    {
        Criteria criteriaQuery = getSession().createCriteria(entityClassName);
        criteriaQuery.setProjection(Projections.min(columnName));
        List minList = criteriaQuery.list();

        return minList != null && minList.size() > 0 ? minList.get(0) : null;
    }

    public Object getAvgByCriteria(Class entityClassName, String columnName)
    {
        Criteria criteriaQuery = getSession().createCriteria(entityClassName);
        criteriaQuery.setProjection(Projections.avg(columnName));
        List avg = criteriaQuery.list();

        return avg != null && avg.size() > 0 ? avg.get(0) : null;
    }

    public List getLikeByCriteria(Class entityClassName, String columnName, String serachTerm)
    {
        Criteria criteriaQuery = getSession().createCriteria(entityClassName);
        criteriaQuery.add(Restrictions.like(columnName, serachTerm));
        return criteriaQuery.list();
    }

    public List getBetweenRecordsByCriteria(Class entityClassName, String columnName, String... values)
    {
        Criteria criteriaQuery = getSession().createCriteria(entityClassName);
        criteriaQuery.add(Restrictions.between(columnName, values[0], values[1]));
        return criteriaQuery.list();
    }

    public List findByCriteria(Class entityClassName)
    {
        Criteria criteriaQuery = getSession().createCriteria(entityClassName);
        return criteriaQuery.list();
    }

    public List findObjectsByCriteria(Class entityClassName, String columnName, Object... values)
    {
        Criteria criteriaQuery = getSession().createCriteria(entityClassName);

        criteriaQuery.add(Restrictions.eq(columnName, values[0]));
        return criteriaQuery.list();
    }

    public Object findObjectByCriteria(Class entityClassName, String columnName, Object... values)
    {
        Criteria criteriaQuery = getSession().createCriteria(entityClassName);
        criteriaQuery.add(Restrictions.eq(columnName, values[0]));
        List list = criteriaQuery.list();
        return list != null && list.size() > 0 ? list.get(0) : null;
    }

}