package com.ps.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class DBUtil
{
    private static final Log LOG = LogFactory.getLog(DBUtil.class);
    private static String JDBC_DRIVER;
    private static String DB_URL;
    private static String USER;
    private static String PASS;
    static Connection connection = null;
    static
    {
        Properties properties = new Properties();
        try
        {
            properties.load(DBUtil.class.getClassLoader().getResourceAsStream("envSettings.properties"));
            JDBC_DRIVER = properties.getProperty("parivar.driverClassName");
            DB_URL = properties.getProperty("parivar.url");
            USER = properties.getProperty("parivar.username");
            PASS = properties.getProperty("parivar.password");

            // LOG.info("JDBC_DRIVER " + JDBC_DRIVER);
        }
        catch (Exception e)
        {
            LOG.info(e.getCause(), e);
        }
    }

    public static Connection getConnection()
    {
        try
        {
            Class.forName(JDBC_DRIVER);
            connection = DriverManager.getConnection(DB_URL, USER, PASS);
            return connection;
        }
        catch (Exception e)
        {
            LOG.info(e.getCause(), e);
            return null;
        }
    }
}
