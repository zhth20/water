package com.loyalove.water.biz.firm;

import com.loyalove.water.biz.BaseBiz;
import com.loyalove.water.common.model.Pager;
import com.loyalove.water.common.util.CollectionUtils;
import com.loyalove.water.dao.firm.FirmDAO;
import com.loyalove.water.dao.base.FirmMapper;
import com.loyalove.water.pojo.FirmExample;
import com.loyalove.water.pojo.FirmPO;
import com.loyalove.water.query.firm.FirmQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Title: FirmServiceImpl.java
 * Description: FirmServiceImpl
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-30 8:56
 */
@Service
public class FirmBizImpl extends BaseBiz implements FirmBiz {

    @Autowired
    FirmMapper firmMapper;

    @Autowired
    FirmDAO firmDAO;

    /**
     * 根据厂商名查询厂商
     *
     * @param firmName
     * @return
     */
    @Override
    public FirmPO queryFirmByName(String firmName) {
        FirmExample example = new FirmExample();
        example.createCriteria().andNameEqualTo(firmName);
        List<FirmPO> firmPOS = firmMapper.selectByExample(example);
        return CollectionUtils.isEmpty(firmPOS) ? null : firmPOS.get(0);
    }

    /**
     * 查询厂商列表
     *
     * @param pager
     * @return
     */
    @Override
    public List<FirmPO> queryFirms(FirmQuery query, Pager pager) {
        return firmDAO.queryFirms(query, pager);
    }

    /**
     * 查询厂商数量
     *
     * @param query
     * @return
     */
    @Override
    public Integer queryCount(FirmQuery query) {
        return firmDAO.queryCount(query);
    }

    /**
     * 查询厂商数量
     *
     * @return
     */
    @Override
    public Integer queryCount() {
        FirmExample example = new FirmExample();
        return (int) firmMapper.countByExample(example);
    }

    /**
     * 新增厂商
     *
     * @param firmPO
     */
    @Override
    public void addFirm(FirmPO firmPO) {
        firmMapper.insertSelective(firmPO);
    }

    /**
     * 修改厂商
     *
     * @param firmPO
     */
    @Override
    public void update(FirmPO firmPO) {
        firmMapper.updateByPrimaryKeySelective(firmPO);
    }

    /**
     * 删除厂商
     *
     * @param firmPO
     */
    @Override
    public void deleteFirm(FirmPO firmPO) {
        firmMapper.deleteByPrimaryKey(firmPO.getFirmId());
    }

    /**
     * 查询厂商
     *
     * @param firmPO
     */
    @Override
    public FirmPO queryFirm(FirmPO firmPO) {
        return firmMapper.selectByPrimaryKey(firmPO.getFirmId());
    }
}
