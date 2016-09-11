package com.ps.dto;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FilterDTO
{
    private Long cuId;
    private Long regionId;
    private Long seasonId;
    private Long cropId;
    private Long activityId;
    private Integer year;
    private String fileName;
    private Integer targetParam;

    public Long getCuId()
    {
        return cuId;
    }

    public void setCuId(Long cuId)
    {
        this.cuId = cuId;
    }

    public Long getRegionId()
    {
        return regionId;
    }

    public void setRegionId(Long regionId)
    {
        this.regionId = regionId;
    }

    public Long getSeasonId()
    {
        return seasonId;
    }

    public void setSeasonId(Long seasonId)
    {
        this.seasonId = seasonId;
    }

    public Long getCropId()
    {
        return cropId;
    }

    public void setCropId(Long cropId)
    {
        this.cropId = cropId;
    }

    public Long getActivityId()
    {
        return activityId;
    }

    public void setActivityId(Long activityId)
    {
        this.activityId = activityId;
    }

    public Integer getYear()
    {
        return year;
    }

    public void setYear(Integer year)
    {
        this.year = year;
    }

    public String getFileName()
    {
        return fileName;
    }

    public void setFileName(String fileName)
    {
        this.fileName = fileName;
    }

    public Integer getTargetParam()
    {
        return targetParam;
    }

    public void setTargetParam(Integer targetParam)
    {
        this.targetParam = targetParam;
    }

}
