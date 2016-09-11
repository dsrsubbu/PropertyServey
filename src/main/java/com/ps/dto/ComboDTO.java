package com.ps.dto;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonWriteNullProperties;

@SuppressWarnings("deprecation")
@JsonWriteNullProperties(false)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ComboDTO
{
    private Long id;
    private String name;
    private Long refId;
    private String refName;

    public Long getRefId()
    {
        return refId;
    }

    public void setRefId(Long refId)
    {
        this.refId = refId;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getRefName()
    {
        return refName;
    }

    public void setRefName(String refName)
    {
        this.refName = refName;
    }
}
