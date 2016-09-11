package com.ps.common.components;

import java.net.URLEncoder;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ps.utils.URLConnect;

@Service
@Scope("prototype")
public class SMSService extends Thread
{
    private static final Logger LOG = Logger.getLogger(SMSService.class);

    @Autowired
    private Properties appConfig;

    private String mobileNo;
    @SuppressWarnings("unused")
    private String message;
    private String encodedSMS;

    public void setValues(String mobileNo, String message)
    {
        try
        {
            this.mobileNo = mobileNo;
            this.message = message;
            this.encodedSMS = URLEncoder.encode(message, "UTF-8");
        }
        catch (Exception e)
        {
            LOG.info(e.getMessage(), e);
        }
    }

    public void run()
    {
        String response = URLConnect.send(appConfig.getProperty("SMS_URL") + appConfig.getProperty("SMS_MOBILE_NO_PARAM") + mobileNo + appConfig.getProperty("SMS_MESSAGE_PARAM") + encodedSMS);
        LOG.info(response + " for mobile no "+ mobileNo);
        LOG.info("Message " + encodedSMS);
    }

}
