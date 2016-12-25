package com.loyalove.water.web.controller.auth;

import com.loyalove.water.biz.auth.RoleBiz;
import com.loyalove.water.common.enums.BaseStatusEnum;
import com.loyalove.water.common.model.Pager;
import com.loyalove.water.common.model.Result;
import com.loyalove.water.pojo.RolePO;
import com.loyalove.water.query.auth.RoleQuery;
import com.loyalove.water.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Loyal on 2016/12/25.
 */
@RestController
@RequestMapping("/role")
public class RoleController extends BaseController {
    @Autowired
    RoleBiz roleBiz;

    @RequestMapping("")
    public Result queryRoles(RoleQuery query, Pager pager) {
        List<RolePO> result = roleBiz.queryRoles(query, pager);
        pager.setRecordTotal(roleBiz.queryCount(query));
        return Result.getResultSuccess("查询成功", result, pager);
    }

    @RequestMapping("/queryBy")
    public Result queryBy(RolePO rolePO) {
        rolePO = roleBiz.queryRole(rolePO);
        return Result.getResultSuccess("查询角色成功", rolePO);
    }

    @RequestMapping("/add")
    public Result addRole(RolePO rolePO) {
        rolePO.setCreateUser(currUser().getUserId());
        roleBiz.addRole(rolePO);
        return Result.getResultSuccess("新增角色成功");
    }

    @RequestMapping("/update")
    public Result updateRole(RolePO rolePO) {
        roleBiz.update(rolePO);
        return Result.getResultSuccess("修改角色成功");
    }

    @RequestMapping("/deleteBy")
    public Result deleteRole(Integer[] ids) {
        RolePO rolePO = new RolePO();
        for (Integer id: ids) {
            rolePO.setRoleId(id);
            roleBiz.deleteRole(rolePO);
        }

        return Result.getResultSuccess("删除角色成功");
    }

    @RequestMapping("/status")
    public Result status() {
        return Result.getResultSuccess("角色状态查询成功", BaseStatusEnum.getAllMapList());
    }

}
