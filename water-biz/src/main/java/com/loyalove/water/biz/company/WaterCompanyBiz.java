package com.loyalove.water.biz.company;

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.pojo.WaterCompanyPO;
import com.loyalove.water.query.company.WaterCompanyQuery;

import java.util.List;

/**
 * Title: WaterCompanyBiz.java
 * Description: WaterCompanyBiz
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-12-06 10:52
 */
public interface WaterCompanyBiz {
    /**
     * 根据水司名查询水司
     * @param name
     * @return
     */
    WaterCompanyPO queryWaterCompanyByName(String name);

    /**
     * 查询水司列表
     * @return
     */
    List<WaterCompanyPO> queryWaterCompanys(WaterCompanyQuery query, Pager pager);

    /**
     * 查询水司数量
     *
     * @return
     */
    Integer queryCount(WaterCompanyQuery query);

    /**
     * 查询水司数量
     *
     * @return
     */
    Integer queryCount();

    /**
     * 新增水司
     * @param waterCompanyPO
     */
    void addWaterCompany(WaterCompanyPO waterCompanyPO);

    /**
     * 修改水司
     * @param waterCompanyPO
     */
    void update(WaterCompanyPO waterCompanyPO);

    /**
     * 删除水司
     * @param waterCompanyPO
     */
    void deleteWaterCompany(WaterCompanyPO waterCompanyPO);

    /**
     * 查询水司
     * @param waterCompanyPO
     */
    WaterCompanyPO queryWaterCompany(WaterCompanyPO waterCompanyPO);

}
