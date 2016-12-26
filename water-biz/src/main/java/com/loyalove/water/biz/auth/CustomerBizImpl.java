package com.loyalove.water.biz.auth;

import com.loyalove.water.biz.BaseBiz;
import com.loyalove.water.common.model.Pager;
import com.loyalove.water.common.util.CollectionUtils;
import com.loyalove.water.dao.auth.CustomerDAO;
import com.loyalove.water.dao.base.CustomerMapper;
import com.loyalove.water.pojo.CustomerExample;
import com.loyalove.water.pojo.CustomerPO;
import com.loyalove.water.query.auth.CustomerQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Title: CustomerServiceImpl.java
 * Description: CustomerServiceImpl
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-30 8:56
 */
@Service
public class CustomerBizImpl extends BaseBiz implements CustomerBiz {

    @Autowired
    CustomerMapper customerMapper;

    @Autowired
    CustomerDAO customerDAO;

    /**
     * 根据客户名查询客户
     *
     * @param customerName
     * @return
     */
    @Override
    public CustomerPO queryCustomerByName(String customerName) {
        CustomerExample example = new CustomerExample();
        example.createCriteria().andNameEqualTo(customerName);
        List<CustomerPO> customerPOS = customerMapper.selectByExample(example);
        return CollectionUtils.isEmpty(customerPOS) ? null : customerPOS.get(0);
    }

    /**
     * 查询客户列表
     *
     * @param pager
     * @return
     */
    @Override
    public List<CustomerPO> queryCustomers(CustomerQuery query, Pager pager) {
        return customerDAO.queryCustomers(query, pager);
    }

    /**
     * 查询客户数量
     *
     * @param query
     * @return
     */
    @Override
    public Integer queryCount(CustomerQuery query) {
        return customerDAO.queryCount(query);
    }

    /**
     * 查询客户数量
     *
     * @return
     */
    @Override
    public Integer queryCount() {
        CustomerExample example = new CustomerExample();
        return (int) customerMapper.countByExample(example);
    }

    /**
     * 新增客户
     *
     * @param customerPO
     */
    @Override
    public void addCustomer(CustomerPO customerPO) {
        customerMapper.insertSelective(customerPO);
    }

    /**
     * 修改客户
     *
     * @param customerPO
     */
    @Override
    public void update(CustomerPO customerPO) {
        customerMapper.updateByPrimaryKeySelective(customerPO);
    }

    /**
     * 删除客户
     *
     * @param customerPO
     */
    @Override
    public void deleteCustomer(CustomerPO customerPO) {
        customerMapper.deleteByPrimaryKey(customerPO.getCustomerId());
    }

    /**
     * 查询客户
     *
     * @param customerPO
     */
    @Override
    public CustomerPO queryCustomer(CustomerPO customerPO) {
        return customerMapper.selectByPrimaryKey(customerPO.getCustomerId());
    }
}
