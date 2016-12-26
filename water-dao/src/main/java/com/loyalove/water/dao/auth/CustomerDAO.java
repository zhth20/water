package com.loyalove.water.dao.auth;

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.pojo.CustomerPO;
import com.loyalove.water.query.auth.CustomerQuery;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Title: CustomerDAO.java
 * Description: CustomerDAO
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-29 13:03
 */
@Mapper
@Repository
public interface CustomerDAO {

    /**
     * 查询客户列表
     *
     * @param query,pager
     * @return
     */
    List<CustomerPO> queryCustomers(@Param("query") CustomerQuery query, @Param("pager") Pager pager);

    /**
     * 查询客户数量
     *
     * @param query
     * @return
     */
    Integer queryCount(@Param("query") CustomerQuery query);
}
