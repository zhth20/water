package com.loyalove.water.web.controller.customer;

import com.loyalove.water.biz.customer.CustomerBiz;
import com.loyalove.water.common.enums.BaseStatusEnum;
import com.loyalove.water.common.model.Pager;
import com.loyalove.water.common.model.Result;
import com.loyalove.water.pojo.CustomerPO;
import com.loyalove.water.query.customer.CustomerQuery;
import com.loyalove.water.vo.customer.CustomerVO;
import com.loyalove.water.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Loyal on 2016/12/25.
 */
@RestController
@RequestMapping("/customer")
public class CustomerController extends BaseController {
    @Autowired
    CustomerBiz customerBiz;

    @RequestMapping("")
    public Result queryCustomers(CustomerQuery query, Pager pager) {
        List<CustomerVO> result = customerBiz.queryCustomers(query, pager);
        pager.setRecordTotal(customerBiz.queryCount(query));
        return Result.getResultSuccess("查询成功", result, pager);
    }

    @RequestMapping("/queryBy")
    public Result queryBy(CustomerPO customerPO) {
        customerPO = customerBiz.queryCustomer(customerPO);
        return Result.getResultSuccess("查询客户成功", customerPO);
    }

    @RequestMapping("/add")
    public Result addCustomer(CustomerPO customerPO) {
        customerPO.setCreateUser(currUser().getUserId());
        customerBiz.addCustomer(customerPO);
        return Result.getResultSuccess("新增客户成功");
    }

    @RequestMapping("/update")
    public Result updateCustomer(CustomerPO customerPO) {
        customerBiz.update(customerPO);
        return Result.getResultSuccess("修改客户成功");
    }

    @RequestMapping("/deleteBy")
    public Result deleteCustomer(Integer[] ids) {
        CustomerPO customerPO = new CustomerPO();
        for (Integer id: ids) {
            customerPO.setCustomerId(id);
            customerBiz.deleteCustomer(customerPO);
        }

        return Result.getResultSuccess("删除客户成功");
    }

    @RequestMapping("/status")
    public Result status() {
        return Result.getResultSuccess("客户状态查询成功", BaseStatusEnum.getAllMapList());
    }

}
