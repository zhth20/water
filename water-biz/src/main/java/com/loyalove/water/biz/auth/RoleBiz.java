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
     * 根据角色名查询角色
     * @param roleName
     * @return
     */
    RolePO queryRoleByName(String roleName);

    /**
     * 查询角色列表
     * @return
     */
    List<RolePO> queryRoles(RoleQuery query, Pager pager);

    /**
     * 查询角色数量
     *
     * @return
     */
    Integer queryCount(RoleQuery query);

    /**
     * 查询角色数量
     *
     * @return
     */
    Integer queryCount();

    /**
     * 新增角色
     * @param rolePO
     */
    void addRole(RolePO rolePO);

    /**
     * 修改角色
     * @param rolePO
     */
    void update(RolePO rolePO);

    /**
     * 删除角色
     * @param rolePO
     */
    void deleteRole(RolePO rolePO);

    /**
     * 查询角色
     * @param rolePO
     */
    RolePO queryRole(RolePO rolePO);

    /**
     * 查询所有角色
     */
    List<RolePO> queryAllRoles();
}
