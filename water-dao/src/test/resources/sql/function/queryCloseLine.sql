CREATE DEFINER = `root`@`localhost` FUNCTION `queryCloseLine`(`str` varchar(200),`m` integer)
 RETURNS varchar(200)
BEGIN
	#Routine body goes here...
	#查询关闭的管段
	#str，关闭的阀门，格式如（x，x，x）
	#m,地图编号
	#返回类型为管段集合，不同分区以；分开，如(x,x,x;x,x,x)
	DECLARE closLine int default 0;
    DECLARE i int default 0;

	DECLARE sTemp VARCHAR(4000);
	DECLARE sTempClose VARCHAR(4000);
	DECLARE sTempOpen VARCHAR(4000);
	DECLARE sClose VARCHAR(4000);

	DECLARE sCurr VARCHAR(50);
	DECLARE sList VARCHAR(4000);

	SET sTempOpen = queryLine(0,str,m);
	SET sTempClose = '$';
	SET sClose = '$';
	SELECT group_concat(c.line) INTO sTemp 
	FROM 
	(
		SELECT a.lineA as line FROM struct a 
		WHERE  FIND_IN_SET(a.id,str)>0 AND FIND_IN_SET(a.lineA,sTempOpen)=0 AND map=m
		UNION
		SELECT b.lineB FROM struct b 
		WHERE FIND_IN_SET(b.id,str)>0 AND FIND_IN_SET(b.lineB,sTempOpen)=0 AND map=m
	) c;

	SET closLine = 1+(length(sTemp) - length(replace(sTemp,',','')));
	WHILE i<closLine DO
		SET i = i + 1;
		SET sCurr = reverse(substring_index(reverse(substring_index(sTemp,',',i)),',',1));
	
		IF FIND_IN_SET(sCurr,sClose)=0 THEN
			SET sList = queryLine(sCurr,str,m);
			SET sTempClose = CONCAT(sTempClose,';',sList);
			SET sClose = CONCAT(sClose,',',sList);
		END IF;
		#SET sTempChd = CONCAT(sTempChd,';',reverse(substring_index(reverse(substring_index(sTemp,',',i)),',',1)));
	END WHILE;
	RETURN replace(replace(sTempClose,'$;',''),'$','');
END;

