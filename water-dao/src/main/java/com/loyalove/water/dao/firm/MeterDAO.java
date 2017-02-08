/*
 * www.yiji.com Inc.
 * Copyright (c) 2014 All Rights Reserved
 */

/*
 * 修订记录:
 * lingfeng@yiji.com 2017-01-13 11:11 创建
 *
 */
package com.loyalove.water.dao.firm;

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.pojo.MeterPO;
import com.loyalove.water.query.firm.MeterQuery;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author lingfeng@yiji.com
 */
@Mapper
@Repository
public interface MeterDAO {

    /**
     * 分页查询表具列表
     * @param query
     * @param pager
     * @return
     */
    List<MeterPO> queryMeters(@Param("query") MeterQuery query, @Param("pager") Pager pager);

    /**
     *查询表具总数
     * @param query
     * @return
     */
    Integer queryCount(@Param("query") MeterQuery query);

    /**
     * 查询表具列表
     * @param query
     * @return
     */
    List<MeterPO> queryMetersByConditions(@Param("query") MeterPO query);

}
