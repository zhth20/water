package com.loyalove.water.web.controller.auth;

import com.loyalove.water.biz.auth.FirmBiz;
import com.loyalove.water.common.enums.BaseStatusEnum;
import com.loyalove.water.common.model.Pager;
import com.loyalove.water.common.model.Result;
import com.loyalove.water.pojo.FirmPO;
import com.loyalove.water.query.auth.FirmQuery;
import com.loyalove.water.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Loyal on 2016/12/25.
 */
@RestController
@RequestMapping("/firm")
public class FirmController extends BaseController {
    @Autowired
    FirmBiz firmBiz;

    @RequestMapping("")
    public Result queryFirms(FirmQuery query, Pager pager) {
        List<FirmPO> result = firmBiz.queryFirms(query, pager);
        pager.setRecordTotal(firmBiz.queryCount(query));
        return Result.getResultSuccess("查询成功", result, pager);
    }

    @RequestMapping("/queryBy")
    public Result queryBy(FirmPO firmPO) {
        firmPO = firmBiz.queryFirm(firmPO);
        return Result.getResultSuccess("查询厂商成功", firmPO);
    }

    @RequestMapping("/add")
    public Result addFirm(FirmPO firmPO) {
        firmPO.setCreateUser(currUser().getUserId());
        firmBiz.addFirm(firmPO);
        return Result.getResultSuccess("新增厂商成功");
    }

    @RequestMapping("/update")
    public Result updateFirm(FirmPO firmPO) {
        firmBiz.update(firmPO);
        return Result.getResultSuccess("修改厂商成功");
    }

    @RequestMapping("/deleteBy")
    public Result deleteFirm(Integer[] ids) {
        FirmPO firmPO = new FirmPO();
        for (Integer id: ids) {
            firmPO.setFirmId(id);
            firmBiz.deleteFirm(firmPO);
        }

        return Result.getResultSuccess("删除厂商成功");
    }

    @RequestMapping("/status")
    public Result status() {
        return Result.getResultSuccess("厂商状态查询成功", BaseStatusEnum.getAllMapList());
    }

}
