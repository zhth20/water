/*
 * www.yiji.com Inc.
 * Copyright (c) 2014 All Rights Reserved
 */

/*
 * 修订记录:
 * lingfeng@yiji.com 2017-01-13 10:50 创建
 *
 */
package com.loyalove.water.biz.firm;

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.pojo.MeterPO;
import com.loyalove.water.query.firm.MeterQuery;

import java.util.List;

/**
 * @author lingfeng@yiji.com
 */
public interface MeterBiz {
    /**
     * 新增表具
     * @param meterPO
     */
    void addMeter(MeterPO meterPO);

    /**
     * 删除表具
     * @param meterPO
     */
    void  deleteMeter(MeterPO meterPO);

    /**
     * 更新表具
     * @param meterPO
     */
    void  updateMeter(MeterPO meterPO);

    /**
     * 查询表具列表
     * @return
     */
    public List<MeterPO> queryMeters(MeterQuery query, Pager pager);

    /**
     * 查询总数
     * @param query
     * @return
     */
    Integer queryCount(MeterQuery query);


    /**
     * 查询所有表具
     * @return
     */
    List<MeterPO> queryAllMeters();

    /**
     * 查询表具详情
     * @param meterPO
     * @return
     */
    MeterPO queryMeter(MeterPO meterPO);

    List<MeterPO> queryMetersByConditions(MeterPO meterPO );
}
