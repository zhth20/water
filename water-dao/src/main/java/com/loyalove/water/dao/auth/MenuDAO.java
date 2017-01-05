/*
 * www.yiji.com Inc.
 * Copyright (c) 2014 All Rights Reserved
 */

/*
 * 修订记录:
 * lingfeng@yiji.com 2017-01-05 10:58 创建
 *
 */
package com.loyalove.water.dao.auth;

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.pojo.MenuPO;
import com.loyalove.water.query.auth.MenuQuery;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author lingfeng@yiji.com
 */
@Mapper
@Repository
public interface MenuDAO {
    /**
     * 查询菜单列表
     * @param query
     * @param pager
     * @return
     */
    List<MenuPO> queryMenus(@Param("query") MenuQuery query, @Param("pager") Pager pager);

    /**
     *查询菜单个数
     * @param query
     * @return
     */
    Integer queryCount(@Param("query") MenuQuery query);
}
