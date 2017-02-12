package com.loyalove.water.web.controller.upload;

/**
 * Created by Loyal on 2017/2/12.
 */

import com.loyalove.water.common.model.Result;
import com.loyalove.water.web.controller.BaseController;
import com.loyalove.water.web.util.UploadUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
public class UploadController extends BaseController {

    @RequestMapping("/upload")
    public Object upload(MultipartFile file) {

        //文件名获取
        String fileName = file.getOriginalFilename();
        try {
            //文件初始化
            File tempFile = UploadUtil.upload(fileName);
            //文件转换保存
            file.transferTo(tempFile);
        } catch (IOException e) {
            logger.error("文件上传失败，{}", e);
            return Result.getResultFail("文件上传失败，" + fileName);
        }
        return Result.getResultSuccess("文件上传成功，" + fileName, fileName);
    }

}
