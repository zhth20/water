package com.loyalove.water.web.util;

import com.loyalove.water.common.util.StringUtils;
import com.loyalove.water.pojo.UserPO;
import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Title: PasswordUtil.java
 * Description: PasswordUtil
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-10-19 18:00
 */
public class PasswordUtils {
    private PasswordUtils() {
    }

    private static final Logger logger = LoggerFactory.getLogger(PasswordUtils.class);

    private static RandomNumberGenerator randomNumberGenerator = new SecureRandomNumberGenerator();

    private static final String algorithmName = "md5";
    private static final int hashIterations = 7;
    private static final String defaultPassword = "123456";

    public static void encryptPassword(UserPO user) {
        if (StringUtils.isEmpty(user.getPassword())) user.setPassword(defaultPassword);
        user.setSalt(getSalt());
        user.setPassword(getPassword(user.getPassword(), user.getSalt()));
    }

    public static String getPassword(String password, String salt) {
        return new SimpleHash(
                algorithmName,
                password,
                ByteSource.Util.bytes(salt),
                hashIterations).toHex();
    }

    public static String getSalt() {
        return randomNumberGenerator.nextBytes().toHex();
    }

}
