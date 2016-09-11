package com.ps.services;

import java.util.Vector;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ps.ThreadLocalData;
import com.ps.common.components.GridComponent;
import com.ps.common.components.ServiceComponent;
import com.ps.dto.GridPaginationDTO;
import com.ps.hibernate.managers.UserInfoManager;
import com.ps.hibernate.models.UserInfo;
import com.ps.security.Digester;
import com.ps.utils.DateUtils;

@Service
public class UserInfoService implements GridComponent, ServiceComponent
{
    private static final Log LOG = LogFactory.getLog(UserInfoService.class);

    @Autowired
    private UserInfoManager userInfoManager;
    public UserInfo getUserByLoginIdAndPwd(String loginId, String password)
    {
        try
        {
            return userInfoManager.getUserByLoginIdAndPwd(loginId, Digester.digest(password));
        }
        catch (Exception e)
        {
            LOG.info(e.getCause(), e);
            return null;
        }
    }

    @Override
    public GridPaginationDTO getGridDataInJSON(Vector<String> sortInfo, String filterString, String start, String limit, String... extraParams) throws Exception
    {
        GridPaginationDTO gridPaginationDTO = new GridPaginationDTO();
        gridPaginationDTO.setRecords(userInfoManager.filterDataForGrid(sortInfo, filterString, start, limit));
        gridPaginationDTO.setTotal(userInfoManager.getRecordsCount(filterString));
        return gridPaginationDTO;
    }

    public String changePassword(String existingPassword, String newPassword)
    {
        try
        {
            UserInfo userInfo = ThreadLocalData.get();
            if (userInfo.getPassword().equals(Digester.digest(existingPassword)))
            {
                userInfo.setPassword(Digester.digest(newPassword));
                userInfoManager.saveOrUpdate(userInfo);
                return "{\"success\":true,\"message\":\"Your password updated Successfully\"}";
            }
            else
            {
                return "{\"success\":false,\"message\":\"Invalid Password.\"}";
            }
        }
        catch (Exception e)
        {
            LOG.error(e.getCause(), e);
            return "{\"success\":false,\"message\":\"Unable To Update Password.\"}";
        }
    }
    @Override
    public String insert(String jsonData, String... extraParams)
    {
        try
        {
            UserInfo userInfo = new ObjectMapper().readValue(jsonData, UserInfo.class);
            if (userInfo.getId() == null)
            {
                userInfo.setPassword(Digester.digest(userInfo.getPassword()));
                userInfo.setCreatedDate(DateUtils.getCurrentSystemTimestamp());
            }
            userInfoManager.saveOrUpdate(userInfo);
            return "{\"success\":true,\"message\":\"User Saved Successfully\"}";
        }
        catch (Exception e)
        {
            LOG.info(e.getCause(), e);
            return "{\"success\":false,\"message\":\"Unable Save User.\"}";
        }
    }
}
