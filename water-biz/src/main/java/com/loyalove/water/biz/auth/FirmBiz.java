package com.loyalove.water.biz.auth;

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.pojo.FirmPO;
import com.loyalove.water.query.auth.FirmQuery;

import java.util.List;

/**
 * Title: FirmBiz.java
 * Description: FirmBiz
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-12-06 10:52
 */
public interface FirmBiz {
    /**
     * 根据厂商名查询厂商
     * @param firmName
     * @return
     */
    FirmPO queryFirmByName(String firmName);

    /**
     * 查询厂商列表
     * @return
     */
    List<FirmPO> queryFirms(FirmQuery query, Pager pager);

    /**
     * 查询厂商数量
     *
     * @return
     */
    Integer queryCount(FirmQuery query);

    /**
     * 查询厂商数量
     *
     * @return
     */
    Integer queryCount();

    /**
     * 新增厂商
     * @param firmPO
     */
    void addFirm(FirmPO firmPO);

    /**
     * 修改厂商
     * @param firmPO
     */
    void update(FirmPO firmPO);

    /**
     * 删除厂商
     * @param firmPO
     */
    void deleteFirm(FirmPO firmPO);

    /**
     * 查询厂商
     * @param firmPO
     */
    FirmPO queryFirm(FirmPO firmPO);

}
