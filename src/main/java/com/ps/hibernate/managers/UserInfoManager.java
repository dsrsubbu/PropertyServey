package com.ps.hibernate.managers;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

import com.ps.hibernate.common.GenericManager;
import com.ps.hibernate.models.UserInfo;

@Repository
public class UserInfoManager extends GenericManager<UserInfo, Long>
{
    private static final Log LOG = LogFactory.getLog(UserInfoManager.class);

    public UserInfoManager()
    {
        super(UserInfo.class);
    }
    public UserInfo getUserByUserId(String userId)
    {
        return (UserInfo) findObject("from UserInfo where userName = '" + userId + "'");
    }
    public UserInfo getUserByLoginIdAndPwd(String loginId, String password)
    {
        try
        {
            return (UserInfo) findObject("from UserInfo where userName = '" + loginId + "' and password = '" + password + "' and  status='Open'");
        }
        catch (Exception e)
        {
            LOG.info(e.getCause(), e);
            return null;
        }
    }
    @SuppressWarnings("unchecked")
    public List<UserInfo> filterDataForGrid(Vector<String> sortInfo, String filterString, String start, String limit)
    {
        try
        {
            String sortColumn = "id";
            String sortDirection = "DESC";
            if (sortInfo.size() > 0)
            {
                sortColumn = sortInfo.get(0);
                sortDirection = sortInfo.get(1);
            }
            String sql = "from UserInfo where 1=1 " + filterString + " order by " + sortColumn + " " + sortDirection;
            return findByFilter(sql, start, limit);
        }
        catch (Exception e)
        {
            LOG.info(e.getCause(), e);
            return new ArrayList<UserInfo>();
        }
    }
    public Long getRecordsCount(String filterString)
    {
        try
        {
            String sql = "select count(*) from UserInfo where 1=1 " + filterString;
            return (Long) getCount(sql);
        }
        catch (Exception e)
        {
            LOG.info(e.getCause(), e);
            return 0L;
        }
    }
}
