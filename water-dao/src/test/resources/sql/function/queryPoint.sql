CREATE DEFINER = `root`@`localhost` FUNCTION `queryPoint`(`id` VARCHAR(4000),`b` integer,`m` integer)
 RETURNS varchar(4000)
BEGIN
	#Routine body goes here...
	#查询连接点 b=0、阀门点b=1，连接点或阀门点关联的管段b=2
	#ID 当前管段编号或阀门、连接点编号
	#返回当前连接点、阀门点编号集合或管段集合
	DECLARE sTemp VARCHAR(4000);
	DECLARE sCurr VARCHAR(100);
	SET sTemp = '$';
	
	IF b = 0 THEN
		SET sCurr = cast(replace(replace(id,'<',''),'>','') as char);
		SELECT group_concat(c.id) INTO sTemp 
		FROM 
		(
			SELECT a.id FROM struct a 
			WHERE FIND_IN_SET(a.lineB,sCurr)>0 AND FIND_IN_SET(a.lineA,sCurr)=0 AND map=m AND flag=0
			UNION
			SELECT b.id FROM struct b 
			WHERE FIND_IN_SET(b.lineA,sCurr)>0 AND FIND_IN_SET(b.lineB,sCurr)=0 AND map=m AND flag=0
		) c;
	ELSE 
		IF b = 1 THEN
			SET sCurr = cast(replace(replace(id,'<',''),'>','') as char);
			SELECT group_concat(c.id) INTO sTemp 
			FROM 
			(
				SELECT a.id FROM struct a 
				WHERE FIND_IN_SET(a.lineB,sCurr)>0 AND FIND_IN_SET(a.lineA,sCurr)=0 AND map=m AND flag>0
				UNION
				SELECT b.id FROM struct b 
				WHERE FIND_IN_SET(b.lineA,sCurr)>0 AND FIND_IN_SET(b.lineB,sCurr)=0 AND map=m AND flag>0
			) c;
		ELSE
			#SELECT CONCAT(a.lineA,',',a.lineB) INTO sTemp FROM struct a WHERE FIND_IN_SET(a.id,id)>0 AND map=m;
			SELECT group_concat(c.line) INTO sTemp 
			FROM 
			(
				SELECT a.lineA AS line FROM struct a 
				WHERE FIND_IN_SET(a.id,replace(replace(replace(id,'><',','),'>',''),'<',''))>0 AND map=m
				UNION
				SELECT b.lineB FROM struct b 
				WHERE FIND_IN_SET(b.id,replace(replace(replace(id,'><',','),'>',''),'<',''))>0 AND map=m 
			) c;

		END IF;
	END IF;
	RETURN CONCAT('<',replace(sTemp,',','><'),'>');
END;

