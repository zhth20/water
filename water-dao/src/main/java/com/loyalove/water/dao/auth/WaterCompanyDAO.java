package com.loyalove.water.dao.auth;

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.pojo.WaterCompanyPO;
import com.loyalove.water.query.auth.WaterCompanyQuery;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Title: WaterCompanyDAO.java
 * Description: WaterCompanyDAO
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-29 13:03
 */
@Mapper
@Repository
public interface WaterCompanyDAO {

    /**
     * 查询水司列表
     *
     * @param query,pager
     * @return
     */
    List<WaterCompanyPO> queryWaterCompanys(@Param("query") WaterCompanyQuery query, @Param("pager") Pager pager);

    /**
     * 查询水司数量
     *
     * @param query
     * @return
     */
    Integer queryCount(@Param("query") WaterCompanyQuery query);
}
