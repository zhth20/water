
CREATE TABLE `customer`(
  `customer_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `customer_code` VARCHAR(11) NOT NULL COMMENT '客户编码',
  `user_id` VARCHAR(11) NOT NULL COMMENT '登录用户ID',
  `name` VARCHAR(100) NOT NULL COMMENT '客户名称',
  `address` VARCHAR(200) NOT NULL COMMENT '客户地址',
  `tel` VARCHAR(50) NOT NULL COMMENT '客户电话',
  `email` VARCHAR(50) NOT NULL COMMENT '客户邮箱',
  `cong` TEXT DEFAULT NULL COMMENT '客户配置文件',
  `head_name` VARCHAR(20) DEFAULT NULL COMMENT '负责人',
  `head_phone` VARCHAR(11) DEFAULT NULL COMMENT '负责人电话',
  `status` VARCHAR(20) NOT NULL DEFAULT 'INIT' COMMENT '客户状态',
  `create_user` INT(11) NOT NULL COMMENT '创建人',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`customer_id`),
  UNIQUE (`customer_code`),
  UNIQUE (`user_id`),
  INDEX (`create_user`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT '客户表';

CREATE TABLE `firm` (
  `firm_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `firm_code` varchar(20) NOT NULL COMMENT '厂商编码',
  `firm_name` varchar(20) NOT NULL COMMENT '厂商名称',
  `firm_address` varchar(100) NOT NULL COMMENT '厂商地址',
  `firm_tel` varchar(11) NOT NULL COMMENT '厂商电话',
  `create_user` INT(11) NOT NULL COMMENT '创建人',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`firm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='厂商表';

