package com.loyalove.water.biz.auth;

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.pojo.CustomerPO;
import com.loyalove.water.query.auth.CustomerQuery;

import java.util.List;

/**
 * Title: CustomerBiz.java
 * Description: CustomerBiz
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-12-06 10:52
 */
public interface CustomerBiz {
    /**
     * 根据客户名查询客户
     * @param customerName
     * @return
     */
    CustomerPO queryCustomerByName(String customerName);

    /**
     * 查询客户列表
     * @return
     */
    List<CustomerPO> queryCustomers(CustomerQuery query, Pager pager);

    /**
     * 查询客户数量
     *
     * @return
     */
    Integer queryCount(CustomerQuery query);

    /**
     * 查询客户数量
     *
     * @return
     */
    Integer queryCount();

    /**
     * 新增客户
     * @param customerPO
     */
    void addCustomer(CustomerPO customerPO);

    /**
     * 修改客户
     * @param customerPO
     */
    void update(CustomerPO customerPO);

    /**
     * 删除客户
     * @param customerPO
     */
    void deleteCustomer(CustomerPO customerPO);

    /**
     * 查询客户
     * @param customerPO
     */
    CustomerPO queryCustomer(CustomerPO customerPO);

}
