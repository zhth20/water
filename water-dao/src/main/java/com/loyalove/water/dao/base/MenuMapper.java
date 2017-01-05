package com.loyalove.water.dao.base;

import com.loyalove.water.pojo.MenuExample;
import com.loyalove.water.pojo.MenuPO;
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
public interface MenuMapper {
    long countByExample(MenuExample example);

    int deleteByExample(MenuExample example);

    int deleteByPrimaryKey(Integer menuId);

    int insert(MenuPO record);

    int insertSelective(MenuPO record);

    List<MenuPO> selectByExampleWithRowbounds(MenuExample example, RowBounds rowBounds);

    List<MenuPO> selectByExample(MenuExample example);

    MenuPO selectByPrimaryKey(Integer menuId);

    int updateByExampleSelective(@Param("record") MenuPO record, @Param("example") MenuExample example);

    int updateByExample(@Param("record") MenuPO record, @Param("example") MenuExample example);

    int updateByPrimaryKeySelective(MenuPO record);

    int updateByPrimaryKey(MenuPO record);
}