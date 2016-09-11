package com.ps.common.components;

import java.util.Vector;

import com.ps.dto.GridPaginationDTO;

public interface GridComponent
{
    public GridPaginationDTO getGridDataInJSON(Vector<String> sortInfo, String filterString, String start, String limit, String... extraParams) throws Exception;
}
