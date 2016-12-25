package com.loyalove.water.dao.base;

import com.loyalove.water.pojo.RoleExample;
import com.loyalove.water.pojo.RolePO;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

/**
 * 该接口（类）由系统生成，请勿修改
 *
 生成时间 2016/12/25
 */
@Mapper
@Repository
public interface RoleMapper {
    long countByExample(RoleExample example);

    int deleteByExample(RoleExample example);

    int deleteByPrimaryKey(Integer roleId);

    int insert(RolePO record);

    int insertSelective(RolePO record);

    List<RolePO> selectByExampleWithRowbounds(RoleExample example, RowBounds rowBounds);

    List<RolePO> selectByExample(RoleExample example);

    RolePO selectByPrimaryKey(Integer roleId);

    int updateByExampleSelective(@Param("record") RolePO record, @Param("example") RoleExample example);

    int updateByExample(@Param("record") RolePO record, @Param("example") RoleExample example);

    int updateByPrimaryKeySelective(RolePO record);

    int updateByPrimaryKey(RolePO record);
}