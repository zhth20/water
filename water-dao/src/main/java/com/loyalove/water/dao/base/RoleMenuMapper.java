package com.loyalove.water.dao.base;

import com.loyalove.water.pojo.RoleMenuExample;
import com.loyalove.water.pojo.RoleMenuPO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 该接口（类）由系统生成，请勿修改
 *
 生成时间 2017/01/05
 */
@Mapper
@Repository
public interface RoleMenuMapper {
    long countByExample(RoleMenuExample example);

    int deleteByExample(RoleMenuExample example);

    int deleteByPrimaryKey(Integer roleMenuId);

    int insert(RoleMenuPO record);

    int insertSelective(RoleMenuPO record);

    List<RoleMenuPO> selectByExampleWithRowbounds(RoleMenuExample example, RowBounds rowBounds);

    List<RoleMenuPO> selectByExample(RoleMenuExample example);

    RoleMenuPO selectByPrimaryKey(Integer roleMenuId);

    int updateByExampleSelective(@Param("record") RoleMenuPO record, @Param("example") RoleMenuExample example);

    int updateByExample(@Param("record") RoleMenuPO record, @Param("example") RoleMenuExample example);

    int updateByPrimaryKeySelective(RoleMenuPO record);

    int updateByPrimaryKey(RoleMenuPO record);
}