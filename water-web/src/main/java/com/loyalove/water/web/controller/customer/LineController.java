package com.loyalove.water.web.controller.customer;

import com.alibaba.fastjson.JSONArray;
import com.loyalove.water.biz.customer.LineBiz;
import com.loyalove.water.common.model.Result;
import com.loyalove.water.vo.customer.Point;
import com.loyalove.water.web.controller.BaseController;
import com.loyalove.water.web.controller.customer.form.LineForm;
import com.loyalove.water.web.util.CadParseUtil;
import com.loyalove.water.web.util.UploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/**
 * Created by Loyal on 2017/2/12.
 */
@RestController
@RequestMapping("/customer/line")
public class LineController extends BaseController {

    @Autowired
    private LineBiz lineBiz;

    @RequestMapping("/parseLine")
    public Result parseLine(LineForm lineForm) {
        CadParseUtil cadParseUtil = new CadParseUtil(Point.toPoint(lineForm.getCadA()),
                Point.toPoint(lineForm.getMapA()),
                Point.toPoint(lineForm.getCadB()),
                Point.toPoint(lineForm.getMapB()));
        JSONArray results;
        try {
            results = cadParseUtil.initDataFromCad(UploadUtil.getFile(lineForm.getFileName()));
        } catch (IOException e) {
            logger.error("CAD解析失败");
            return Result.getResultFail("CAD解析失败");
        }
        return Result.getResultSuccess("CAD解析成功", results);
    }
}
