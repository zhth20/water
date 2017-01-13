/*
 * www.yiji.com Inc.
 * Copyright (c) 2014 All Rights Reserved
 */

/*
 * 修订记录:
 * lingfeng@yiji.com 2017-01-13 10:50 创建
 *
 */
package com.loyalove.water.biz.auth;

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.dao.auth.MeterDAO;
import com.loyalove.water.dao.base.MeterMapper;
import com.loyalove.water.pojo.MeterExample;
import com.loyalove.water.pojo.MeterPO;
import com.loyalove.water.query.auth.MeterQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author lingfeng@yiji.com
 */
@Service
public class MeterBizImpl implements MeterBiz {
    @Autowired
    MeterDAO meterDAO;
    @Autowired
    MeterMapper meterMapper;
    @Override
    public void addMeter(MeterPO meterPO) {
        meterMapper.insertSelective(meterPO);
    }

    @Override
    public void deleteMeter(MeterPO meterPO) {
        meterMapper.deleteByPrimaryKey(meterPO.getMeterId());
    }

    @Override
    public void updateMeter(MeterPO meterPO) {
        meterMapper.updateByPrimaryKeySelective(meterPO);
    }

    @Override
    public List<MeterPO> queryMeters(MeterQuery query, Pager pager) {
        return meterDAO.queryMeters(query, pager);
    }

    @Override
    public Integer queryCount(MeterQuery query) {
        return meterDAO.queryCount(query);
    }

    @Override
    public List<MeterPO> queryAllMeters() {
        return meterMapper.selectByExample(new MeterExample());
    }
}
