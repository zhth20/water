CREATE DEFINER = `root`@`localhost` FUNCTION `queryCloseArea`(`str` VARCHAR(200))
 RETURNS varchar(4000)
BEGIN
	#Routine body goes here...
	DECLARE closLine int default 0;
  DECLARE i int default 0;

	DECLARE sTemp VARCHAR(4000);
	DECLARE sTempClose VARCHAR(4000);
	DECLARE sTempOpen VARCHAR(4000);
	DECLARE sClose VARCHAR(4000);

	DECLARE sCurr VARCHAR(50);
	DECLARE sList VARCHAR(4000);

	SET sTempOpen = queryLineList(0,str);
	SET sTempClose = '$';
	SET sClose = '$';
	SELECT group_concat(c.line) INTO sTemp 
	FROM 
	(
		SELECT a.lineA as line FROM struct a 
		WHERE  (flag=1 OR (flag=0 AND FIND_IN_SET(a.id,str)=0)) AND FIND_IN_SET(a.lineA,sTempOpen)=0
		UNION
		SELECT b.lineB FROM struct b 
		WHERE (flag=1 OR (flag=0 AND FIND_IN_SET(b.id,str)=0)) AND FIND_IN_SET(b.lineB,sTempOpen)=0
	) c;

	SET closLine = 1+(length(sTemp) - length(replace(sTemp,',','')));
	WHILE i<closLine DO
		SET i = i + 1;
		SET sCurr = reverse(substring_index(reverse(substring_index(sTemp,',',i)),',',1));
	
		IF FIND_IN_SET(sCurr,sClose)=0 THEN
			SET sList = queryLineList(sCurr,str);
			SET sTempClose = CONCAT(sTempClose,';',sList);
			SET sClose = CONCAT(sClose,',',sList);
		END IF;
		#SET sTempChd = CONCAT(sTempChd,';',reverse(substring_index(reverse(substring_index(sTemp,',',i)),',',1)));
	END WHILE;
	RETURN replace(sTempClose,'$;','');
END;

CREATE DEFINER = `root`@`localhost` FUNCTION `queryCloseLine`(`str` VARCHAR(200))
 RETURNS varchar(200)
BEGIN
	#Routine body goes here...
	DECLARE sTemp VARCHAR(4000);
	DECLARE sOpen VARCHAR(4000);
	DECLARE sClose VARCHAR(4000);

	SET sOpen = queryLineList(0,'2,3,5,7');
	SET sClose = queryCloseArea('2,3,5,7');

	SET sClose = replace(sClose,';',',');

	SELECT group_concat(c.id) INTO sTemp 
	FROM 
	(
		SELECT a.id as id FROM struct a 
		WHERE FIND_IN_SET(a.lineA,sOpen)>0 AND FIND_IN_SET(a.lineB,sClose)>0
		UNION
		SELECT b.id FROM struct b 
		WHERE FIND_IN_SET(b.lineA,sClose)>0 AND FIND_IN_SET(b.lineB,sOpen)>0
	) c;
	RETURN sTemp;
END;

CREATE DEFINER = `root`@`localhost` FUNCTION `queryClosePoint`(id int,`str` VARCHAR(200))
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

	#DECLARE sTemp VARCHAR(4000);

	DECLARE sTline VARCHAR(4000);#关闭后影响的管段
	DECLARE sTpoint VARCHAR(4000);
	DECLARE sCpoint VARCHAR(4000);

	SET sLine = cast(id as char);
	SET sOpen = str;
	SET sTline = '$';
	SET sClose = '$';
	#SET sTemp = '$';

	WHILE length(sLine) > 0 DO
		SET sCurr = substring_index(sLine,',',1);
		IF length(sCurr) = length(sLine) THEN
			SET sLine = replace(sLine,sCurr,'');
		ELSE 
			SET sLine = replace(sLine,CONCAT(sCurr,','),'');
		END IF;
		#SET sTemp = CONCAT(sTemp,',','a');

		IF FIND_IN_SET(sCurr,sTline)=0 THEN
			SET sTline = CONCAT(sTline,',',sCurr);
			SET sTpoint = queryPoint(sCurr,1);

			WHILE length(sTpoint) > 0 DO
				SET sCpoint = substring_index(sTpoint,',',1);
				IF length(sCpoint) <=> length(sTpoint) THEN
					SET sTpoint = replace(sTpoint,sCpoint,'');
				ELSE 
					SET sTpoint = replace(sTpoint,CONCAT(sCpoint,','),'');
				END IF;
				#SET sTemp = CONCAT(sTemp,'|',sTpoint);
				IF FIND_IN_SET(sCpoint,sOpen)=0 THEN
					IF FIND_IN_SET(sCpoint,sClose)=0 THEN
						SET sClose = CONCAT(sClose,',',sCpoint);
					END IF;
				ELSE 
					#SET sTemp = CONCAT(sTemp,',',sCpoint,'=',sClose);
					IF FIND_IN_SET(sCpoint,sClose)=0 THEN
						IF length(sLine)> 0 THEN
							SET sLine = CONCAT(sLine,',',queryPoint(sCpoint,0));
						ELSE
							SET sLine = queryPoint(sCpoint,0);
						END IF;
					END IF;
					#SET sTemp = CONCAT(sTemp,',',sLine);
				END IF;

			END WHILE;
		END IF;
	END WHILE;
	RETURN replace(sClose,'$,','');
END;

CREATE DEFINER = `root`@`localhost` FUNCTION `queryLineList`(id int,`str` VARCHAR(200))
 RETURNS varchar(200)
BEGIN
	#查询关联管段
	#id管段，str模拟关闭的阀门
	DECLARE sTemp VARCHAR(4000);
	DECLARE sTempChd VARCHAR(4000);
	SET sTemp = '$';
	SET sTempChd = cast(id as char);
	WHILE sTempChd is not NULL DO
	SET sTemp = CONCAT(sTemp,',',sTempChd);
	SELECT group_concat(c.line) INTO sTempChd 
	FROM 
	(
		SELECT a.lineA as line FROM struct a 
		WHERE FIND_IN_SET(a.lineB,sTemp)>0 AND FIND_IN_SET(a.lineA,sTemp)=0 AND flag=0 AND FIND_IN_SET(a.id,str)=0
		UNION
		SELECT b.lineB FROM struct b 
		WHERE FIND_IN_SET(b.lineA,sTemp)>0 AND FIND_IN_SET(b.lineB,sTemp)=0 AND flag=0 AND FIND_IN_SET(b.id,str)=0
	) c;
	END WHILE;
	RETURN replace(sTemp,'$,','');
END;

CREATE DEFINER = `root`@`localhost` FUNCTION `queryPoint`(`id` VARCHAR(200),b int)
 RETURNS varchar(200)
BEGIN
	#Routine body goes here...
	DECLARE sTemp VARCHAR(4000);
	DECLARE sCurr VARCHAR(100);
	SET sTemp = '$';

	IF b < 1 THEN
		SELECT CONCAT(a.lineA,',',a.lineB) INTO sTemp FROM struct a WHERE a.id=id;
	ELSE
		SET sCurr = cast(id as char);
		SELECT group_concat(c.id) INTO sTemp 
		FROM 
		(
			SELECT a.id FROM struct a 
			WHERE FIND_IN_SET(a.lineB,sCurr)>0 AND FIND_IN_SET(a.lineA,sCurr)=0 AND flag=0
			UNION
			SELECT b.id FROM struct b 
			WHERE FIND_IN_SET(b.lineA,sCurr)>0 AND FIND_IN_SET(b.lineB,sCurr)=0 AND flag=0
		) c;
	END IF;
	RETURN sTemp;
END;

CREATE DEFINER = `root`@`localhost` FUNCTION `inserStruct`(`p` varchar(50),`m` integer)
 RETURNS int(11)
BEGIN
	#Routine body goes here...
	DECLARE sTemp VARCHAR(20);
	DECLARE sBegin VARCHAR(20);
	DECLARE sCurr VARCHAR(50);
	DECLARE num int default 0;
	DECLARE i int default 0;

	SET sBegin = reverse(substring_index(reverse(substring_index(p,',',1)),',',1));
	SELECT group_concat(c.line) INTO sTemp 
	FROM 
	(
		SELECT a.lineA as line FROM struct a 
		WHERE lineB=sBegin and map=m
		UNION
		SELECT b.lineB FROM struct b 
		WHERE lineA=sBegin and map=m
	) c;
	
	SET num = 1+(length(sTemp) - length(replace(sTemp,',','')));
	WHILE i<num DO
		SET i = i + 1;
		SET sCurr = reverse(substring_index(reverse(substring_index(sTemp,',',i)),',',1));
	
		IF FIND_IN_SET(sCurr,p)=0 THEN
			DELETE FROM struct WHERE (lineA=sCurr AND lineB=sBegin) OR (lineB = sCurr AND lineA=sBegin);
		END IF;
		#SET sTempChd = CONCAT(sTempChd,';',reverse(substring_index(reverse(substring_index(sTemp,',',i)),',',1)));
	END WHILE;

	SET num = 1+(length(p) - length(replace(p,',','')));
	SET i = 1;
	WHILE i<num DO
		SET i = i + 1;
		SET sCurr = reverse(substring_index(reverse(substring_index(p,',',i)),',',1));
	
		IF FIND_IN_SET(sCurr,sTemp)=0 THEN
			IF sCurr < sBegin THEN
				INSERT INTO struct(map, lineA, lineB) VALUES(m,sCurr,sBegin);
			ELSE
				INSERT INTO struct(map, lineA, lineB) VALUES(m,sBegin,sCurr);
			END IF;
		END IF;
		#SET sTempChd = CONCAT(sTempChd,';',reverse(substring_index(reverse(substring_index(sTemp,',',i)),',',1)));
	END WHILE;
	#SET sTemp ='533,495,536,570';
	
	RETURN 0;
END;

CREATE DEFINER = `root`@`localhost` FUNCTION `queryCloseLine`(`str` varchar(200),`m` integer)
 RETURNS varchar(200)
BEGIN
	#Routine body goes here...
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

CREATE DEFINER = `root`@`localhost` FUNCTION `queryLine`(`id` integer,`str` varchar(4000),`m` integer)
 RETURNS varchar(4000)
BEGIN
	#Routine body goes here...
	DECLARE sTemp VARCHAR(4000);
	DECLARE sTempChd VARCHAR(4000);
	SET sTemp = '$';
	SET sTempChd = cast(id as char);
	WHILE sTempChd is not NULL DO
	SET sTemp = CONCAT(sTemp,',',sTempChd);
	SELECT group_concat(c.line) INTO sTempChd 
	FROM 
	(
		SELECT a.lineA as line FROM struct a 
		WHERE FIND_IN_SET(a.lineB,sTemp)>0 AND FIND_IN_SET(a.lineA,sTemp)=0 AND FIND_IN_SET(a.id,str)=0 AND map=m
		UNION
		SELECT b.lineB FROM struct b 
		WHERE FIND_IN_SET(b.lineA,sTemp)>0 AND FIND_IN_SET(b.lineB,sTemp)=0 AND FIND_IN_SET(b.id,str)=0 AND map=m
	) c;
	END WHILE;
	RETURN replace(sTemp,'$,','');
END;

CREATE DEFINER = `root`@`localhost` FUNCTION `updateStruct`(`a` integer,`b` integer,`m` integer,`p` varchar(50),`f` integer)
 RETURNS int(11)
BEGIN
	#Routine body goes here...
	DECLARE sTemp VARCHAR(20);
	DECLARE res int default 0;
SET res = 10;
	SELECT group_concat(id) INTO sTemp FROM struct WHERE lineA=a AND lineB=b and map=m;
	IF sTemp <=> NULL THEN
		SET res = 20;
	ELSE
		IF f = 0 THEN
			UPDATE struct SET points = p,flag = 1 WHERE id = CONVERT(sTemp,SIGNED);
		ELSE
			UPDATE struct SET point = p,b = 1 WHERE id = CONVERT(sTemp,SIGNED);
		END IF;
		SET res = 1;
	END IF;
	RETURN res;
END;





