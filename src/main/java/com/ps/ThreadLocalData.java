package com.ps;

import com.ps.hibernate.models.UserInfo;

public class ThreadLocalData
{
    private static ThreadLocal<UserInfo> currentUser = new ThreadLocal<UserInfo>();

    private ThreadLocalData()
    {

    }
    public static UserInfo get()
    {
        return currentUser.get();
    }

    public static void set(UserInfo userData)
    {
        currentUser.set(userData);
    }
}
