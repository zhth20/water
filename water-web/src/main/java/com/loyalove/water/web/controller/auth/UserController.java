package com.loyalove.water.web.controller.auth;

import com.loyalove.water.biz.auth.UserBiz;
import com.loyalove.water.common.model.Pager;
import com.loyalove.water.common.model.Result;
import com.loyalove.water.pojo.UserPO;
import com.loyalove.water.web.controller.BaseController;
import com.loyalove.water.web.util.PasswordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Title: UserController.java
 * Description: UserController
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-30 19:30
 */
@RestController
@RequestMapping("/user")
public class UserController extends BaseController {
    @Autowired
    UserBiz userBiz;

    @RequestMapping("")
    public Object queryUsers(Pager pager) {
        List<UserPO> result = userBiz.queryUsers(pager);
        pager.setRecordTotal(userBiz.queryCount());
        return Result.getResultSuccess("查询成功", result, pager);
    }

    @RequestMapping("/queryBy")
    public Object queryBy(UserPO userPO) {
        userPO = userBiz.queryUser(userPO);
        return Result.getResultSuccess("查询用户成功", userPO);
    }

    @RequestMapping("/add")
    public Object addUser(UserPO userPO) {
        PasswordUtils.encryptPassword(userPO);
        userPO.setCreateUser(currUser().getUserId());
        userBiz.addUser(userPO);
        return Result.getResultSuccess("新增用户成功");
    }

    @RequestMapping("/update")
    public Object updateUser(UserPO userPO) {
        userBiz.update(userPO);
        return Result.getResultSuccess("修改用户成功");
    }

    @RequestMapping("/deleteBy")
    public Object deleteUser(Integer[] ids) {
        UserPO userPO = new UserPO();
        for (Integer id: ids) {
            userPO.setUserId(id);
            userBiz.deleteUser(userPO);
        }

        return Result.getResultSuccess("删除用户成功");
    }

}
