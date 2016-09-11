/**
 * 
 */
package com.ps.utils;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * @author sumant.t
 */
public class HttpClientUtils
{
    private static final Log LOG = LogFactory.getLog(HttpClientUtils.class);
    private static HttpClient httpclient;

    public static HttpClient getHttpClient()
    {
        if (httpclient == null) return new HttpClient();
        else return httpclient;
    }

    @SuppressWarnings("deprecation")
    public static String getResponseByHttpClient(String JSON, String url, HashMap<String, String> hm)
    {
        // Prepare HTTP post
        try
        {
            // LOG.info("httpclient url : " + url);
            PostMethod post = new PostMethod(url);

            if (JSON != null)
            {
                post.setRequestBody(JSON);
                post.setRequestHeader("Content-type", "Application/json");
            }
            else if (hm.size() > 0)
            {
                for (Map.Entry<String, String> entry : hm.entrySet())
                {
                    post.setParameter(entry.getKey(), entry.getValue());
                }
            }
            HttpClient httpclient = getHttpClient();
            try
            {
                httpclient.executeMethod(post);
                return post.getResponseBodyAsString();
            }
            catch (HttpException e)
            {
                LOG.info(e.getCause(), e);
            }
            catch (IOException e)
            {
                LOG.info(e.getCause(), e);
            }
            finally
            {
                LOG.info("Response body: close connection ");
                post.releaseConnection();
            }
        }
        catch (Exception e)
        {
            LOG.info(e.getCause(), e);
        }
        return null;
    }

    public static String getResponseByHttpClient(String url)
    {
        try
        {
            // LOG.info("httpclient url : " + url);
            GetMethod get = new GetMethod(url);

            // Get HTTP client
            HttpClient httpclient = getHttpClient();

            // Execute request
            try
            {
                int result = httpclient.executeMethod(get);
                if (result == 200) return get.getResponseBodyAsString();
                else return "unable to connect";

            }
            catch (HttpException e)
            {
                LOG.info(e.getCause(), e);
            }
            catch (IOException e)
            {
                LOG.info(e.getCause(), e);
                return "unable to connect";
            }
            finally
            {
                LOG.info("Response body: close connection ");
                get.releaseConnection();
            }
        }
        catch (Exception e)
        {
            LOG.info(e.getCause(), e);
        }
        return null;
    }

    @SuppressWarnings("deprecation")
    public static void sendNotificationToGCMserver(String googleApiKey, Set<String> registrationIds, String messageKey, String content, String title)
    {
        try
        { // Below is a good tutorial , how to post json data
          // http://hmkcode.com/android-send-json-data-to-server/

            String url = "https://android.googleapis.com/gcm/send";
            HttpClient client = new HttpClient();
            PostMethod post = new PostMethod(url);
            JSONObject mainData = new JSONObject();
            try
            {
                JSONObject data = new JSONObject();
                data.putOpt(messageKey, content);
                data.putOpt("title", title);
                JSONArray regIds = new JSONArray();
                for (String s : registrationIds)
                {
                    regIds.put(s);
                }
                mainData.put("registration_ids", regIds);
                mainData.put("data", data);
            }
            catch (JSONException e)
            {
                LOG.info(e.getCause(), e);
            }
            post.setRequestBody(mainData.toString());
            post.setRequestHeader("Authorization", "key=" + googleApiKey);
            post.setRequestHeader("Content-Type", "application/json");
            client.executeMethod(post);
        }
        catch (MalformedURLException e)
        {
            LOG.info(e.getCause(), e);
        }
        catch (IOException e)
        {
            LOG.info(e.getCause(), e);
        }
    }

}
