package com.ps.schedular;

import java.util.ArrayList;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContext;

import com.ps.common.components.AppContext;

public class ScheduleJobs
{
    private static final Log LOG = LogFactory.getLog(ScheduleJobs.class);

    private ArrayList<String> scheduleJobsList;

    public void setScheduleJobsList(ArrayList<String> scheduleJobsList)
    {
        this.scheduleJobsList = scheduleJobsList;
    }

    public void scheduledServices()
    {
        try
        {
            ApplicationContext ctx = AppContext.getApplicationContext();

            for (String job : scheduleJobsList)
            {
                SchedulerComponent schedularComponent = (SchedulerComponent) ctx.getBean(job);
                schedularComponent.executeJob();
            }
        }
        catch (Exception e)
        {
            LOG.info(e.getCause(), e);
        }
    }
}
