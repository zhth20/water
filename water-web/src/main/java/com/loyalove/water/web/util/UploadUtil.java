package com.loyalove.water.web.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;

/**
 * Created by Loyal on 2017/2/12.
 */
public class UploadUtil {

    //日志
    private static final Logger logger = LoggerFactory.getLogger(UploadUtil.class);

    //常量定义
    public static final String FILE_PATH = "upload";
    public static final String WIN_PATH = "D://";
    public static final String LINUX_PATH = "/";

    public static File upload(String fileName) {
        File tempFile = null;
        //文件名获取
        try {
            //文件创建
            tempFile = new File(getFilePath(fileName));
            if (!tempFile.getParentFile().exists()) {
                //文件夹创建
                tempFile.getParentFile().mkdirs();
            }
            if (tempFile.exists()) {
                //文件删除
                tempFile.delete();
                //新文件创建
                tempFile.createNewFile();
            }
        } catch (IOException e) {
            logger.error("文件初始化失败，{}", e);
        }

        return tempFile;
    }

    public static File getFile(String fileName) {
        //文件创建
        File tempFile = new File(getFilePath(fileName));

        if (!tempFile.exists()) {
            logger.info("文件不存在");
            return null;
        }
        return tempFile;
    }

    public static String getFilePath(String fileName) {
        String path;
        if (File.separator.equals(LINUX_PATH)) {
            path = File.separator + FILE_PATH;
        } else {
            path = WIN_PATH + FILE_PATH;
        }
        return path + File.separator + fileName;
    }
}
