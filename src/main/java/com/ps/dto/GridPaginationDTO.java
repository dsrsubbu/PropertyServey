package com.ps.dto;

import java.util.List;

public class GridPaginationDTO
{
    private Long total;
    private boolean success = true;
    private String message;
    private List<? extends Object> records;
    
    public Long getTotal()
    {
        return total;
    }
    public void setTotal(Long total)
    {
        this.total = total;
    }
    public boolean isSuccess()
    {
        return success;
    }
    public void setSuccess(boolean success)
    {
        this.success = success;
    }
    public String getMessage()
    {
        return message;
    }
    public void setMessage(String message)
    {
        this.message = message;
    }
    public List<? extends Object> getRecords()
    {
        return records;
    }
    public void setRecords(List<? extends Object> records)
    {
        this.records = records;
    }
}
