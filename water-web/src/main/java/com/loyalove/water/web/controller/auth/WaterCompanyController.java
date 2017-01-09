package com.loyalove.water.web.controller.auth;

import com.loyalove.water.biz.auth.WaterCompanyBiz;
import com.loyalove.water.common.enums.BaseStatusEnum;
import com.loyalove.water.common.model.Pager;
import com.loyalove.water.common.model.Result;
import com.loyalove.water.pojo.WaterCompanyPO;
import com.loyalove.water.query.auth.WaterCompanyQuery;
import com.loyalove.water.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Loyal on 2016/12/25.
 */
@RestController
@RequestMapping("/company")
public class WaterCompanyController extends BaseController {
    @Autowired
    WaterCompanyBiz waterCompanyBiz;

    @RequestMapping("")
    public Result queryWaterCompanys(WaterCompanyQuery query, Pager pager) {
        List<WaterCompanyPO> result = waterCompanyBiz.queryWaterCompanys(query, pager);
        pager.setRecordTotal(waterCompanyBiz.queryCount(query));
        return Result.getResultSuccess("查询成功", result, pager);
    }

    @RequestMapping("/queryBy")
    public Result queryBy(WaterCompanyPO waterCompanyPO) {
        waterCompanyPO = waterCompanyBiz.queryWaterCompany(waterCompanyPO);
        return Result.getResultSuccess("查询水司成功", waterCompanyPO);
    }

    @RequestMapping("/add")
    public Result addWaterCompany(WaterCompanyPO waterCompanyPO) {
        waterCompanyPO.setCreateUser(currUser().getUserId());
        waterCompanyBiz.addWaterCompany(waterCompanyPO);
        return Result.getResultSuccess("新增水司成功");
    }

    @RequestMapping("/update")
    public Result updateWaterCompany(WaterCompanyPO waterCompanyPO) {
        waterCompanyBiz.update(waterCompanyPO);
        return Result.getResultSuccess("修改水司成功");
    }

    @RequestMapping("/deleteBy")
    public Result deleteWaterCompany(Integer[] ids) {
        WaterCompanyPO waterCompanyPO = new WaterCompanyPO();
        for (Integer id: ids) {
            waterCompanyPO.setWaterCompanyId(id);
            waterCompanyBiz.deleteWaterCompany(waterCompanyPO);
        }

        return Result.getResultSuccess("删除水司成功");
    }

    @RequestMapping("/status")
    public Result status() {
        return Result.getResultSuccess("水司状态查询成功", BaseStatusEnum.getAllMapList());
    }

}
