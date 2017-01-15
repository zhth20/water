package com.loyalove.water.dao.firm;

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.pojo.FirmPO;
import com.loyalove.water.query.firm.FirmQuery;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Title: FirmDAO.java
 * Description: FirmDAO
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-29 13:03
 */
@Mapper
@Repository
public interface FirmDAO {

    /**
     * 查询厂商列表
     *
     * @param query,pager
     * @return
     */
    List<FirmPO> queryFirms(@Param("query") FirmQuery query, @Param("pager") Pager pager);

    /**
     * 查询厂商数量
     *
     * @param query
     * @return
     */
    Integer queryCount(@Param("query") FirmQuery query);
}
