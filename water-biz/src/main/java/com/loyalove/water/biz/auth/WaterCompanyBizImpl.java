package com.loyalove.water.biz.auth;

import com.loyalove.water.biz.BaseBiz;
import com.loyalove.water.common.model.Pager;
import com.loyalove.water.common.util.CollectionUtils;
import com.loyalove.water.dao.auth.WaterCompanyDAO;
import com.loyalove.water.dao.base.WaterCompanyMapper;
import com.loyalove.water.pojo.WaterCompanyExample;
import com.loyalove.water.pojo.WaterCompanyPO;
import com.loyalove.water.query.auth.WaterCompanyQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Title: WaterCompanyServiceImpl.java
 * Description: WaterCompanyServiceImpl
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-30 8:56
 */
@Service
public class WaterCompanyBizImpl extends BaseBiz implements WaterCompanyBiz {

    @Autowired
    WaterCompanyMapper waterCompanyMapper;

    @Autowired
    WaterCompanyDAO waterCompanyDAO;

    /**
     * 根据水司名查询水司
     *
     * @param name
     * @return
     */
    @Override
    public WaterCompanyPO queryWaterCompanyByName(String name) {
        WaterCompanyExample example = new WaterCompanyExample();
        example.createCriteria().andNameEqualTo(name);
        List<WaterCompanyPO> waterCompanyPOS = waterCompanyMapper.selectByExample(example);
        return CollectionUtils.isEmpty(waterCompanyPOS) ? null : waterCompanyPOS.get(0);
    }

    /**
     * 查询水司列表
     *
     * @param pager
     * @return
     */
    @Override
    public List<WaterCompanyPO> queryWaterCompanys(WaterCompanyQuery query, Pager pager) {
        return waterCompanyDAO.queryWaterCompanys(query, pager);
    }

    /**
     * 查询水司数量
     *
     * @param query
     * @return
     */
    @Override
    public Integer queryCount(WaterCompanyQuery query) {
        return waterCompanyDAO.queryCount(query);
    }

    /**
     * 查询水司数量
     *
     * @return
     */
    @Override
    public Integer queryCount() {
        WaterCompanyExample example = new WaterCompanyExample();
        return (int) waterCompanyMapper.countByExample(example);
    }

    /**
     * 新增水司
     *
     * @param waterCompanyPO
     */
    @Override
    public void addWaterCompany(WaterCompanyPO waterCompanyPO) {
        waterCompanyMapper.insertSelective(waterCompanyPO);
    }

    /**
     * 修改水司
     *
     * @param waterCompanyPO
     */
    @Override
    public void update(WaterCompanyPO waterCompanyPO) {
        waterCompanyMapper.updateByPrimaryKeySelective(waterCompanyPO);
    }

    /**
     * 删除水司
     *
     * @param waterCompanyPO
     */
    @Override
    public void deleteWaterCompany(WaterCompanyPO waterCompanyPO) {
        waterCompanyMapper.deleteByPrimaryKey(waterCompanyPO.getWaterCompanyId());
    }

    /**
     * 查询水司
     *
     * @param waterCompanyPO
     */
    @Override
    public WaterCompanyPO queryWaterCompany(WaterCompanyPO waterCompanyPO) {
        return waterCompanyMapper.selectByPrimaryKey(waterCompanyPO.getWaterCompanyId());
    }
}
