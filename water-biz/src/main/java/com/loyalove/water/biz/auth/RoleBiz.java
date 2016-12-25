package com.loyalove.water.biz.auth;

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.pojo.RolePO;
import com.loyalove.water.query.auth.RoleQuery;

import java.util.List;

/**
 * Title: RoleBiz.java
 * Description: RoleBiz
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-12-06 10:52
 */
public interface RoleBiz {
    /**
     * 根据用户名查询用户
     * @param roleName
     * @return
     */
    RolePO queryRoleByName(String roleName);

    /**
     * 查询用户列表
     * @return
     */
    List<RolePO> queryRoles(RoleQuery query, Pager pager);

    /**
     * 查询用户数量
     *
     * @return
     */
    Integer queryCount(RoleQuery query);

    /**
     * 查询用户数量
     *
     * @return
     */
    Integer queryCount();

    /**
     * 新增用户
     * @param rolePO
     */
    void addRole(RolePO rolePO);

    /**
     * 修改用户
     * @param rolePO
     */
    void update(RolePO rolePO);

    /**
     * 删除用户
     * @param rolePO
     */
    void deleteRole(RolePO rolePO);

    /**
     * 查询用户
     * @param rolePO
     */
    RolePO queryRole(RolePO rolePO);

}
