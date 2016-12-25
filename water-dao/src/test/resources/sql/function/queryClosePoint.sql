CREATE DEFINER = `root`@`localhost` FUNCTION `queryClosePoint`(`id` integer,`str` VARCHAR(4000),`m` integer)
 RETURNS varchar(4000)
    SQL SECURITY INVOKER
BEGIN
	#管段维修应关闭阀门
	#id当前管段编号，str不能关闭的阀门id，返回参数为关闭阀门集合
	DECLARE closLine int default 0;
  	DECLARE i int default 0;

	DECLARE sLine VARCHAR(4000);#管段
	DECLARE sOpen VARCHAR(4000);#不能关闭的阀门
	DECLARE sClose VARCHAR(4000);#需要关闭的阀门
	DECLARE sCurr VARCHAR(4000);
	DECLARE sCurrPoint VARCHAR(4000);

	#DECLARE sTemp VARCHAR(4000);

	DECLARE sTline VARCHAR(4000);#关闭后影响的管段
	DECLARE sTpoint VARCHAR(4000);#已经遍历的点位
	DECLARE sCpoint VARCHAR(4000);#临时点位
	DECLARE sLpoint VARCHAR(4000);#当前需要遍历的点位

	SET sLine = CONCAT('<',id,'>') ;
	SET sOpen = CONCAT('<',replace(str,',','><'),'>');
	SET sTline = '$';
	SET sTpoint = '$';
	SET sClose = '$';
	SET sLpoint = '$';

	#SET sTemp = '$';

	WHILE length(sLine) > 0 DO
		SET sCurr = substring_index(sLine,'>',1);
		SET sCurr = CONCAT(sCurr,'>');
		SET sLine = replace(sLine,sCurr,'');

		#SET sTemp = CONCAT(sTemp,',','a');
		IF FIND_IN_SET(sCurr,replace(sTline,'><','>,<'))=0 THEN
			SET sTline = CONCAT(sTline,sCurr);
			SET sCpoint = queryPoint(sCurr,1,m);
			
			SET closLine = (length(sCpoint) - length(replace(sCpoint,'>','')));
			SET i=0;
			WHILE i < closLine DO
				SET i = i + 1;
				#SET sClose = CONCAT(sClose,';',i);
				SET sCurrPoint = reverse(substring_index(reverse(substring_index(sCpoint,'>',i)),'<',1));
				SET sCurrPoint = CONCAT('<',sCurrPoint,'>');
				IF FIND_IN_SET(sCurrPoint,replace(sTpoint,'><','>,<'))=0 THEN
					SET sTpoint = CONCAT(sTpoint,sCurr);
					IF FIND_IN_SET(sCurrPoint,replace(sOpen,'><','>,<'))=0 THEN
						SET sClose = CONCAT(sClose,sCurrPoint);
					ELSE
						SET sLpoint = CONCAT(sLpoint,sCurrPoint);
					END IF;
				END IF;
				#SET sTempChd = CONCAT(sTempChd,';',reverse(substring_index(reverse(substring_index(sTemp,',',i)),',',1)));
			END WHILE;
			
			SET sCpoint = queryPoint(sCurr,0,m);
			IF LENGTH(sCpoint) > 0 THEN
				SET sLpoint = CONCAT(sLpoint,sCpoint);
			END IF;
			SET sCpoint = queryPoint(replace(sLpoint,'$',''),2,m);
			IF LENGTH(sLine) > 0 THEN
				SET sLine = CONCAT(sLine,sCpoint);
			ELSE
				SET sLine = sCpoint;
			END IF;
		END IF;
		
	END WHILE;
	RETURN replace(replace(replace(CONCAT(replace(sClose,'$',''),';',replace(sTline,'$','')),'><',','),'>',''),'<','');
END;

