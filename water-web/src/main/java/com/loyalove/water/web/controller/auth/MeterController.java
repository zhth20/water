/*
 * www.yiji.com Inc.
 * Copyright (c) 2014 All Rights Reserved
 */

/*
 * 修订记录:
 * lingfeng@yiji.com 2017-01-13 13:58 创建
 *
 */
package com.loyalove.water.web.controller.auth;

import com.loyalove.water.biz.auth.MeterBiz;
import com.loyalove.water.common.model.Pager;
import com.loyalove.water.common.model.Result;
import com.loyalove.water.pojo.MeterPO;
import com.loyalove.water.query.auth.MeterQuery;
import com.loyalove.water.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author lingfeng@yiji.com
 */
@RestController
@RequestMapping("/meter")
public class MeterController  extends BaseController {
    @Autowired
    private MeterBiz meterBiz;

    @RequestMapping("")
    public Result queryRoles(MeterQuery query, Pager pager) {
        List<MeterPO> result = meterBiz.queryMeters(query, pager);
        pager.setRecordTotal(meterBiz.queryCount(query));
        return Result.getResultSuccess("查询成功", result, pager);
    }

    @RequestMapping("/add")
    public Result addRole(MeterPO meterPO) {
        meterPO.setCreatUser(currUser().getUserId());
        meterBiz.addMeter(meterPO);
        return Result.getResultSuccess("新增表具成功");
    }

    @RequestMapping("/update")
    public Result updateRole(MeterPO meterPO) {
        meterBiz.updateMeter(meterPO);
        return Result.getResultSuccess("修改表具信息成功");
    }

    @RequestMapping("/deleteBy")
    public Result deleteRole(Integer[] ids) {
        MeterPO meterPO = new MeterPO();
        for (Integer id: ids) {
            meterPO.setMeterId(id);
            meterBiz.deleteMeter(meterPO);
        }
        return Result.getResultSuccess("删除表具成功");
    }

    @RequestMapping("/queryAll")
    public Result queryAllMenus(MeterPO meterPO ) {
        List<MeterPO> result = meterBiz.queryAllMeters();
        return Result.getResultSuccess("查询成功", result);
    }


    @RequestMapping("/queryBy")
    public Result queryBy(MeterPO meterPO) {
        meterPO = meterBiz.queryMeter(meterPO);
        return Result.getResultSuccess("查询表具成功", meterPO);
    }
}
