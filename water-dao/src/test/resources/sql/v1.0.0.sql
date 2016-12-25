CREATE TABLE `line` (
	`id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键' ,
	`map`  int(11) NULL DEFAULT NULL COMMENT '地图ID' ,
	`material`  int(11) NULL DEFAULT 0 COMMENT '材质ID' ,
	`dn`  int(11) NULL DEFAULT 0 COMMENT '类型ID' ,
	`points`  text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '点集合' ,
	`meter`  int(11) NULL DEFAULT 0 COMMENT '长度' ,
	`flag`  int(11) NULL DEFAULT 0 COMMENT '类型ID' ,
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='管段表';

CREATE TABLE `customer` (
`id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '客户编号' ,
`name`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '客户名称' ,
`address`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '客户地址' ,
`tel`  varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '客户电话' ,
`cong`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '客户配置文件' ,
`person`  int(11) NULL DEFAULT NULL COMMENT '负责人编号' ,
PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT '客户表';

CREATE TABLE `struct` (
`id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键' ,
`map`  int(11) NULL DEFAULT 0 COMMENT '地图ID' ,
`lineA`  int(11) NULL DEFAULT NULL COMMENT '管段ID' ,
`lineB`  int(11) NULL DEFAULT NULL ,
`points`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '连接点位置' ,
`flag`  int(11) NULL DEFAULT 0 COMMENT '类型ID' ,
`point`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`b`  tinyint(4) NULL DEFAULT 0 ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='管段关联结构表';

CREATE TABLE `login` (
`id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键' ,
`username`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '登录名' ,
`pwd`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码' ,
`name`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称' ,
`tel`  int(11) NULL DEFAULT NULL COMMENT '电话' ,
`sup`  int(11) NULL DEFAULT NULL COMMENT '直接上司' ,
`job`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '部门、职位 JSON' ,
`c_id`  int(11) NOT NULL COMMENT '隶属客户' ,
`power`  int(20) NULL DEFAULT 0 COMMENT '权限' ,
PRIMARY KEY (`id`),
FOREIGN KEY (`c_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
INDEX `user_id` (`c_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='用户表'
AUTO_INCREMENT=1
ROW_FORMAT=DYNAMIC
;