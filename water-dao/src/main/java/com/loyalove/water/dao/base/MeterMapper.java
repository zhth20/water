package com.loyalove.water.dao.base;

import com.loyalove.water.pojo.MeterExample;
import com.loyalove.water.pojo.MeterPO;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

/**
 * 该接口（类）由系统生成，请勿修改
 *
 生成时间 2017/01/22
 */
@Mapper
@Repository
public interface MeterMapper {
    long countByExample(MeterExample example);

    int deleteByExample(MeterExample example);

    int deleteByPrimaryKey(Integer meterId);

    int insert(MeterPO record);

    int insertSelective(MeterPO record);

    List<MeterPO> selectByExampleWithRowbounds(MeterExample example, RowBounds rowBounds);

    List<MeterPO> selectByExample(MeterExample example);

    MeterPO selectByPrimaryKey(Integer meterId);

    int updateByExampleSelective(@Param("record") MeterPO record, @Param("example") MeterExample example);

    int updateByExample(@Param("record") MeterPO record, @Param("example") MeterExample example);

    int updateByPrimaryKeySelective(MeterPO record);

    int updateByPrimaryKey(MeterPO record);
}