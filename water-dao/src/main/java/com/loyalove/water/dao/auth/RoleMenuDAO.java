/*
 * www.yiji.com Inc.
 * Copyright (c) 2014 All Rights Reserved
 */

/*
 * 修订记录:
 * lingfeng@yiji.com 2017-01-05 10:47 创建
 *
 */
package com.loyalove.water.dao.auth;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Set;

/**
 * @author lingfeng@yiji.com
 */
@Mapper
@Repository
public interface RoleMenuDAO {
    /**
     * 根据角色Id查询该角色下的所有菜单
     * @param roleId
     * @return
     */
    Set<Integer> queryMenus(Integer roleId);

}
