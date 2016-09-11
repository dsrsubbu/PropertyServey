package com.ps.services;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ps.common.components.Combo;
import com.ps.dto.ComboDTO;
import com.ps.utils.GridFilter;



/**
 * @author suman.t
 */

@Service
public class CommonService
{
    private static final Log LOG = LogFactory.getLog(CommonService.class);

    @Autowired
    private GridFilter gridFilter;

    /*
     * public boolean isFieldValueExits(Long id, String value, String field, String entityName, String... filter) { String filterString = ""; if (filter != null && filter.length >
     * 0) { filterString = filter[0]; } return commonManager.isFieldValueExits(id, value, field, entityName, filterString); }
     */

    /**
     * @author rabindranath.s Used to parse sorting information from the request object
     * @param request
     */
    public Vector<String> parseSortInfo(HttpServletRequest request)
    {
        Vector<String> sortInfo = new Vector<String>();
        try
        {
            if (request.getParameter("sort") != null)// Example Format for Sorting -- [{"property":"dariRecordNo","direction":"ASC"}]
            {
                JSONArray jsonArray = (JSONArray) (new JSONParser()).parse(request.getParameter("sort"));
                JSONObject jsonObject = (JSONObject) jsonArray.get(0);

                sortInfo.add(jsonObject.get("property").toString());
                sortInfo.add(jsonObject.get("direction").toString().toUpperCase());
            }
            else
            {
                sortInfo.add("id");
                sortInfo.add("DESC");
            }
        }
        catch (Exception e)
        {
            LOG.trace(e.getCause(), e);
        }
        return sortInfo;
    }

    /**
     * @author rabindranath.s Used for parsing filter information from the request object
     * @param request
     */
    public Hashtable<String, Hashtable<String, String>> parseFilters(HttpServletRequest request)
    {
        try
        {
            Hashtable<String, Hashtable<String, String>> map = new Hashtable<String, Hashtable<String, String>>();

            if (request.getParameter("filter") != null)
            {
                JSONArray jsonArray = (JSONArray) (new JSONParser()).parse(request.getParameter("filter"));
                for (int i = 0; i < jsonArray.size(); i++)
                {
                    JSONObject jsonObject = (JSONObject) jsonArray.get(i);
                    String fieldName = (String) jsonObject.get("fieldName");
                    String dataType = (String) jsonObject.get("type");
                    String searchValue = "";
                    JSONArray searchList = new JSONArray();
                    if (!"list".equals(dataType))
                    {
                        searchValue = (String) jsonObject.get("value");
                    }
                    else
                    {
                        searchList = (JSONArray) jsonObject.get("value");
                        for (Object s : searchList)
                        {
                            searchValue += (("".equals(searchValue)) ? s.toString() : "," + s.toString());
                        }
                    }

                    String operator = (String) jsonObject.get("operator");
                    String dateFormat = (String) ("date".equals(dataType) ? jsonObject.get("dateFormat") : "NONE");

                    Hashtable<String, String> searchInfo = new Hashtable<String, String>();
                    searchInfo.put("DATATYPE", dataType);
                    searchInfo.put("SEARCHVALUE", searchValue);
                    searchInfo.put("OPERATOR", operator);
                    searchInfo.put("DATEFORMAT", dateFormat);

                    map.put(i + "#" + fieldName, searchInfo);
                }

                return map;
            }
        }
        catch (Exception e)
        {
            LOG.info(e.getCause(), e);
        }
        return null;
    }

    /**
     * @author rabindranath.s Used for parsing filter information from the request object
     * @param request
     */
    public String getFilterString(HttpServletRequest request)
    {
        Hashtable<String, Hashtable<String, String>> filterInfo = parseFilters(request);
        return gridFilter.generateQuery(null, null, filterInfo);
    }

    public List<ComboDTO> castToComboDTO(List<?> entitys)
    {
        List<ComboDTO> comboDTOs = new ArrayList<ComboDTO>();
        if (entitys != null)
        {
            for (Object entity : entitys)
            {
                if (entity instanceof Combo)
                {
                    ComboDTO comboDTO = new ComboDTO();
                    Combo combo = (Combo) entity;
                    comboDTO.setId(combo.getId());
                    comboDTO.setName(combo.getName());
                    comboDTOs.add(comboDTO);
                }
            }
        }
        return comboDTOs;
    }
}
