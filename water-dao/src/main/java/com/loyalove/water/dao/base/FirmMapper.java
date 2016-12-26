package com.loyalove.water.dao.base;

import com.loyalove.water.pojo.FirmExample;
import com.loyalove.water.pojo.FirmPO;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

/**
 * 该接口（类）由系统生成，请勿修改
 *
 生成时间 2016/12/26
 */
@Mapper
@Repository
public interface FirmMapper {
    long countByExample(FirmExample example);

    int deleteByExample(FirmExample example);

    int deleteByPrimaryKey(Integer firmId);

    int insert(FirmPO record);

    int insertSelective(FirmPO record);

    List<FirmPO> selectByExampleWithRowbounds(FirmExample example, RowBounds rowBounds);

    List<FirmPO> selectByExample(FirmExample example);

    FirmPO selectByPrimaryKey(Integer firmId);

    int updateByExampleSelective(@Param("record") FirmPO record, @Param("example") FirmExample example);

    int updateByExample(@Param("record") FirmPO record, @Param("example") FirmExample example);

    int updateByPrimaryKeySelective(FirmPO record);

    int updateByPrimaryKey(FirmPO record);
}