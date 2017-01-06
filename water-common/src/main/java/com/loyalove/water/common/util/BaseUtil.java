package com.loyalove.water.common.util;

/**
 * Created by Loyal on 2017/1/5.
 */
public class BaseUtil {
    private BaseUtil() {
    }

    public static boolean isNull(Object obj) {
        return null == obj;
    }

    public static boolean isNotNull(Object obj) {
        return !isNull(obj);
    }
}
